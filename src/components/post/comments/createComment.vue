<template lang="pug">
b-col.col-12.p-0.mt-2
  b-form(
    @submit.prevent="append"
    v-bind:class="errorObject"
  )
    b-form-textarea.inline-input(
      autofocus
      v-model="comment.text"
      @keyup="validateCharCount()"
      @keydown.enter.prevent="append()"
      placeholder="write back..."
      rows="1"
      max-rows="3"
    )
    b-row.justify-content-between
      a.validation-char.mt-1(
        v-bind:class="errorObject"
      ) {{comment.text.length}} / {{ validation.commentLimit}}
      button.pill-button.mr-3(
        type="submit"
        :disabled="this.isError"
      ) chat

</template>
<script>
export default {
  name: 'createComment',
  props: ['validation'],
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
      this.isError = this.comment.text.length > this.validation.commentLimit ? true : null
    }
  }
}
</script>
<style scoped lang="scss">
</style>
