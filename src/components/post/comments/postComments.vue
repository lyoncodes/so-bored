<template lang="pug">
  b-row
    button#hide-comment-form.post-navigation-button(
      @click="toggleCommentForm"
      :class="hideThis"
    )
      IconBase#hide-form-icon(
        icon-name="cancel"
        iconColor="rgba(252, 56, 172)"
      )
        IconDelete
    b-col.col-12.p-0
        //- List iteration (comment in postComments)
        b-col.col-12.mt-2(v-for="comment in postComments" :key="comment.id").comments-section

          //- post comment
          b-row.comment-container.text-left
            b-col.col-12.p-0

              span.caption.pl-2.pt-2.mb-0 {{ comment.userName }} says:
              p.post-text.pl-3.pt-1 {{ comment.text }}

              button#delete-comment.post-navigation-button(
                @click="deleteComment(comment)"
                v-if="user===comment.userName"
              )
                IconBase(
                  icon-name="delete"
                  iconColor="rgba(252, 56, 172)"
                )
                  IconDelete
        createComment(
          :post="post"
          :validation="validation"
          :postComments="postComments"
          :postList="postList"
          v-if="postList.displayCommentForm"
          @append="appendComment"
        )
        button#show-comment-form.post-navigation-button(
          v-if="!this.postList.displayCommentForm"
          @click="toggleCommentForm"
        )
          IconBase#show-form-icon(
            icon-name="loading"
            iconColor="rgba(130, 53, 242, 0.85)"
          )
            IconLoading

</template>
<script>
import { mapActions } from 'vuex'
import { commentsCollection } from '../../../../firebase'

export default {
  name: 'post-comments',
  props: ['post', 'postList', 'postComments', 'user', 'validation'],
  computed: {
    hideThis: function () {
      return {
        hide: !this.postList.displayCommentForm
      }
    }
  },
  methods: {
    ...mapActions([
      'createComment'
    ]),

    toggleCommentForm () {
      this.postList.displayCommentForm = !this.postList.displayCommentForm
    },

    async appendComment (commentData) {
      const comment = {
        ...commentData.comment,
        reference: this.$props.post.id
      }
      this.postComments.push(comment)

      this.createComment(comment)
      this.getCommentId(comment)
    },

    async getCommentId (comment) {
      const commentRef = await commentsCollection.where('createdOn', '==', comment.createdOn).get()
      commentRef.forEach((c) => {
        comment.id = c.id
      })
    },

    async deleteComment (comment) {
      await commentsCollection.doc(`${comment.id}`).delete()
      const foundAt = this.postComments.findIndex(c => c === comment)
      this.postComments.splice(foundAt, 1)
    }
  },

  components: {
    createComment: () => import('../comments/createComment'),
    IconBase: () => import('../../IconBase'),
    IconDelete: () => import('../../icons/IconDelete'),
    IconCaret: () => import('../../icons/IconCaret'),
    IconLoading: () => import('../../icons/IconLoading')
  },
  async mounted () {
    const user = this.user
    this.user = user
  }
}
</script>
<style scoped lang="scss">
</style>
