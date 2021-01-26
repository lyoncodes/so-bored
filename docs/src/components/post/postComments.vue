<template lang="pug">
  b-row.justify-content-center
    b-col.col-12.p-0
        postCommentForm(
          :post="post"
          :validation="validation"
          :show="show"
          :formCounter="formCounter"
        )
        //- COMMENT
        b-col.col-12.mb-4(v-for="comment in post.comments").comments-section
          b-row.comments-container.text-left
            b-col.col-11.p-0
              p.caption.pl-2.pt-2.mb-1 {{ comment.author }} says:
              p.comment-text.pl-3.pt-1 {{ comment.text }}
            b-col.col-1.p-0
              button.link-button(
                @click="handleDelete(comment)"
                v-if="user===comment.author"
                ) delete
</template>
<script>
import postCommentForm from '../post/postCommentForm'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'annotation',
  props: ['post', 'validation', 'user', 'show', 'formCounter'],
  data () {
    return {
      comment: {
        text: '',
        commentSerial: null,
        commentType: null
      }
    }
  },
  computed: {
    ...mapState([
      'posts',
      'userProfile'
    ])
  },
  methods: {
    ...mapActions([
      'deleteComment'
    ]),
    handleDelete (comment) {
      comment.commentType = false
      this.deleteComment(comment)
    },
    clearComment () {
      this.comment = {
        text: '',
        author: '',
        commentSerial: null,
        commentType: false
      }
    },
    serialMaker () {
      const rando = Math.floor(Math.random() * 1000)
      return Math.floor(Math.random() * rando)
    }
  },
  components: {
    postCommentForm
  },
  mounted () {
    const ruleData = this.comment
    this.ruleData = ruleData
    const user = this.user
    this.user = user
  }
}
</script>
<style scoped lang="scss">
</style>
