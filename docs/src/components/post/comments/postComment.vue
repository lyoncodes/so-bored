<template lang="pug">
  b-row
    button#show-comment-form.post-navigation-button(
      @click="toggleCommentForm"
    )
      img#post-nav-icon(
        v-bind:src="imgStore[5]"
        width="640"
        height="360"
        :class="flipThis"
      )
    b-col.col-12.p-0
        createComment(
          :post="post"
          :validation="validation"
          :postComments="postComments"
          :postList="postList"
          v-if="postList.displayCommentForm"
        )

        //- Array Iteration (comment in postComments prop, passed from postsHome parent component)
        b-col.col-12.mb-2.mt-2(v-for="comment in postComments" :key="comment.id").comments-section

          //- post comment
          b-row.comment-container.text-left
            b-col.col-12.p-0
              p.caption.pl-2.pt-2.mb-0 {{ comment.userName }} says:
              p.post-text.pl-3.pt-1 {{ comment.text }}
              button#delete-comment.post-navigation-button(
                @click="deleteComment(comment)"
                v-if="user===comment.userName"
              )
                IconBase(
                  icon-name="caret"
                  iconColor="rgba(221, 62, 230, 0.5)"
                )
                  IconDelete

</template>
<script>
import { commentsCollection } from '../../../../firebase'
import createComment from './createComment'
import { mapState } from 'vuex'
export default {
  name: 'comments-container',
  props: ['post', 'postList', 'postComments', 'validation', 'user'],
  computed: {
    ...mapState([
      'imgStore'
    ]),
    flipThis: function () {
      return {
        flip: !this.postList.displayCommentForm
      }
    }
  },
  methods: {
    toggleCommentForm () {
      this.postList.displayCommentForm = !this.postList.displayCommentForm
    },
    async deleteComment (comment) {
      await commentsCollection.doc(`${comment.id}`).delete()
      const foundAt = this.postComments.findIndex(c => c === comment)
      this.postComments.splice(foundAt, 1)
    }
  },
  components: {
    createComment,
    IconBase: () => import('../../IconBase'),
    IconDelete: () => import('../../icons/IconDelete')
  },
  async mounted () {
    const user = this.user
    this.user = user
  }
}
</script>
<style scoped lang="scss">
</style>
