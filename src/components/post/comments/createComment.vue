<template lang="pug">
b-col.col-12.p-0
  b-row.justify-content-center.hr
  b-form(
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
      rows="1"
      max-rows="3"
    )
  b-row.justify-content-between.mb-2
    a.validation-char.mt-1(
      v-bind:class="errorObject"
    ) {{comment.text.length}} / {{ validation.commentLimit}}
    button#create-comment.neu-c-button.m-0.mr-3.mt-1.pt-1.pr-3.pb-2.pl-3(
      type="submit"
      :disabled="this.isError"
    )
      IconBase(
        icon-name="comment"
        height="15"
        width="15"
      )
        IconAddComment

</template>
<script>
export default {
  name: 'createComment',
  props: ['post', 'postList', 'validation'],
  components: {
    IconBase: () => import('../../IconBase'),
    IconAddComment: () => import('../../icons/IconAddComment')
  },
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
