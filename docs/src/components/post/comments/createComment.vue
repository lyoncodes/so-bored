<template lang="pug">
b-col.col-12.p-0

  .error-badge(v-if="isError") This comment is too long!

  b-form.mb-3(
    @submit.prevent="addComment(comment)"
    v-bind:class="errorObject"
  )

    b-form-textarea(
      autofocus
      id="comment-text-field"
      v-model="comment.text"
      @keyup="validateCharCount()"
      @keydown.enter.prevent="addComment(comment)"
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
    addComment (comment) {
      const text = this.comment.text
      const userName = this.userProfile.username
      const reference = this.$props.post.id
      const commentPayload = {
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
        createdOn: new Date(),
        text: comment.text,
        userName: comment.userName,
        reference: comment.reference
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
.error .validation-char {
  color: $candy-red!important;
}
</style>
