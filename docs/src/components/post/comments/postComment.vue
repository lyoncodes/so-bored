<template lang="pug">
  b-row

    b-col.col-12.p-0
        createComment(
          :post="post"
          :validation="validation"
          :postComments="postComments"
          :postList="postList"
        )

        //- Array Iteration (comment in postComments prop, passed from postsHome parent component)
        b-col.col-12.mb-4(v-for="comment in postComments" :key="comment.id").comments-section

          //- post comment
          b-row.comment-container.text-left
            b-col.col-9.p-0
              p.caption.pl-2.pt-2.mb-0 {{ comment.userName }} says:
              p.post-text.pl-3.pt-1 {{ comment.text }}
            b-col.col-3.p-0
              button#delete-comment.neu-c-button(
                @click="deleteComment(comment)"
                v-if="user===comment.userName"
              ) delete
</template>
<script>
import { commentsCollection } from '../../../../firebase'
import createComment from './createComment'
export default {
  name: 'comments-container',
  props: ['post', 'postList', 'postComments', 'validation', 'user'],
  methods: {
    async deleteComment (comment) {
      await commentsCollection.doc(`${comment.id}`).delete()
      const foundAt = this.postComments.findIndex(c => c === comment)
      this.postComments.splice(foundAt, 1)
    }
  },
  components: {
    createComment
  },
  async mounted () {
    const user = this.user
    this.user = user
  }
}
</script>
<style scoped lang="scss">
</style>
