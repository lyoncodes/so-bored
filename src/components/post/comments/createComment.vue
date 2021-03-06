<template lang="pug">
b-col.col-12.p-0

  b-form.mb-3(
    @submit.prevent="append()"
    v-bind:class="errorObject"
  )

    b-form-textarea(
      autofocus
      id="comment-text-field"
      v-model="comment.text"
      @keyup="validateCharCount()"
      @keydown.enter.prevent="append()"
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
export default {
  name: 'createComment',
  props: ['post', 'postList', 'validation'],

  data () {
    return {
      comment: {
        text: ''
      },
      isError: null
    }
  },

  computed: {
    errorObject: function () {
      return {
        error: this.comment.text.length > this.validation.commentLimit ? true : null
      }
    }
  },

  methods: {
    append () {
      const createdOn = new Date()
      const text = this.comment.text
      const comment = {
        createdOn,
        text
      }
      if (!this.isError) {
        this.$emit('append', { comment })
        this.clearComment()
      }
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
  }
}
</script>
<style scoped lang="scss">
</style>
