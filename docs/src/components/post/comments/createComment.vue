<template lang="pug">
b-col.col-12.p-0

  b-form.mb-3(
    @submit.prevent="append(comment)"
    v-bind:class="errorObject"
  )

    b-form-textarea(
      autofocus
      id="comment-text-field"
      v-model="comment.text"
      @keyup="validateCharCount()"
      @keydown.enter.prevent="append(comment)"
      placeholder="add a comment..."
    )

    b-row.justify-content-between

      a.validation-char.mt-2.mb-0.ml-3(
        v-bind:class="errorObject"
      ) {{comment.text.length}} / {{ validation.commentLimit}}

      button#submit-comment.neu-b-button.m-0.mt-2.mr-3(
        type="submit"
        :disabled="this.isError"
      ) Comment
</template>
<script>
import { commentsCollection } from '../../../../firebase'
import { mapState } from 'vuex'
export default {
  name: 'createComment',
  props: ['post', 'validation', 'postList', 'postComments'],

  data () {
    return {
      comment: {
        text: ''
      },
      isError: null
    }
  },

  computed: {
    ...mapState([
      'userProfile',
      'imgStore'
    ]),
    errorObject: function () {
      return {
        error: this.comment.text.length > this.validation.commentLimit ? true : null
      }
    }
  },

  methods: {

    append (comment) {
      const createdOn = new Date()
      const text = this.comment.text
      const userName = this.userProfile.username
      const reference = this.$props.post.id
      const commentPayload = {
        createdOn,
        text,
        userName,
        reference
      }
      if (!this.isError) {
        this.createComment(commentPayload)
        this.clearComment()
      }
    },

    async createComment (comment) {
      await commentsCollection.add({
        createdOn: comment.createdOn,
        text: comment.text,
        userName: comment.userName,
        reference: comment.reference
      })
      this.getCommentId(comment)
    },

    async getCommentId (comment) {
      const commentRef = await commentsCollection.where('createdOn', '==', comment.createdOn).get()
      commentRef.forEach((c) => {
        comment.id = c.id
      })
      this.postComments.push(comment)
    },

    clearComment () {
      this.comment = {
        text: ''
      }
      this.isError = false
    },

    validateCharCount () {
      this.validation.charCount = this.comment.text.length
      this.isError = this.validation.charCount > this.validation.commentLimit ? true : null
    }
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
