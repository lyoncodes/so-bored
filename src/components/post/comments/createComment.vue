<template lang="pug">
b-col.col-12.mt-1.p-0

  b-form(
    inline
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
    button#create-comment.post-navigation-button.m-0(
      type="submit"
      :disabled="this.isError"
    )
      IconBase(
        icon-name="comment"
        height="15"
        width="15"
      )
        IconComment
  b-row.mb-2
    a.validation-char.mt-1(
      v-bind:class="errorObject"
    ) {{comment.text.length}} / {{ validation.commentLimit}}

</template>
<script>
export default {
  name: 'createComment',
  props: ['post', 'postList', 'validation'],
  components: {
    IconBase: () => import('../../IconBase'),
    IconComment: () => import('../../icons/IconComment')
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
