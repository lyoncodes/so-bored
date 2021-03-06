<template lang="pug">
b-row
  //- List iteration (comment in postComments)
  b-col.col-12.mt-2(v-for="comment in postComments" :key="comment.id").comments-section

    //- post comment
    b-row.comment-container.text-left
      b-col.col-12.p-0

        span.caption.pl-2.pt-2.mb-0 {{ comment.userName }} says:
        p.post-text.pl-3.pt-1 {{ comment.text }}

        button#delete-comment.post-navigation-button(
          @click="remove(comment)"
          v-if="user===comment.userName"
        )
          IconBase(
            icon-name="delete"
            iconColor="rgba(252, 56, 172)"
          )
            IconDelete
  //- button#show-comment-form.post-navigation-button(
  //-   @click="toggleCommentForm"
  //- )
  //-   IconBase(
  //-     icon-name="caret"
  //-     :class="flipThis"
  //-   )
  //-     IconCaret
  createComment(
    :post="post"
    :postList="postList"
    :postComments="postComments"
    :validation="validation"
    v-if="postList.displayCommentForm"
    @append="appendComment"
  )

</template>
<script>
import { mapActions } from 'vuex'
import { commentsCollection } from '../../../../firebase'

export default {
  name: 'post-comments',
  props: ['post', 'postList', 'postComments', 'user', 'validation'],
  components: {
    createComment: () => import('../comments/createComment'),
    IconBase: () => import('../../IconBase'),
    IconDelete: () => import('../../icons/IconDelete'),
    IconCaret: () => import('../../icons/IconCaret')
  },
  async mounted () {
    const user = this.user
    this.user = user
  },
  computed: {
    flipThis: function () {
      return {
        flip: !this.postList.displayCommentForm
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
        reference: this.$props.post.id,
        userName: this.$props.user
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

    async remove (comment) {
      await commentsCollection.doc(`${comment.id}`).delete()
      const foundAt = this.postComments.findIndex(c => c === comment)
      this.postComments.splice(foundAt, 1)
    }
  }
}
</script>
<style scoped lang="scss">
</style>
