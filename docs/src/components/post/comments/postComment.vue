<template lang="pug">
  b-row.justify-content-center
    b-col.col-12.p-0
        createComment(
          :post="post"
          :validation="validation"
          :postComments="postComments"
          :postList="postList"
        )
        //- COMMENT
        b-col.col-12.mb-4(v-for="comment in postComments").comments-section
          b-row.comments-container.text-left
            b-col.col-11.p-0
              p.caption.pl-2.pt-2.mb-1 {{ comment.userName }} says:
              p.comment-text.pl-3.pt-1 {{ comment.text }}
            b-col.col-1.p-0
              button.link-button(
                @click="deleteComment(comment)"
                v-if="user===comment.userName"
                ) delete
</template>
<script>
import { commentsCollection } from '../../../../firebase'
import createComment from './createComment'
import { mapState } from 'vuex'
export default {
  name: 'comments-container',
  props: ['post', 'postList', 'postComments', 'validation', 'user'],
  data () {
    return {
    }
  },
  computed: {
    ...mapState([
      'posts'
    ])
  },
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
