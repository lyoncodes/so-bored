<template lang="pug">
  b-col.col-12.mt-4.p-0.form-container
    b-badge.post-form-error-badge(v-if="isError" variant="danger") This post's title or text is too long!
    b-form(@submit.prevent="handleSubmit" v-bind:class="errorObject")
      b-col.form-content
        b-form-group.mt-3(id="input-title")
          b-form-input#title-input(
            v-model="formData.title"
            @keyup="validateCharCount()"
            autofocus
            required
            contenteditable
            placeholder="Title"
          )
          a.validation-char.ml-1 {{formChar.titleCount}} / {{validation.titleLimit}}
        b-form-group(id="input-card-text")
          b-form-textarea#post-form-textarea(
            @keyup="validateCharCount()"
            @keydown.enter.prevent="handleSubmit"
            v-model="formData.text"
            placeholder="Input text here"
          )
          a.validation-char.ml-1 {{formChar.charCount}} / {{validation.charLimit}}
        b-row.justify-content-center
          button.neu-c-button(type="reset" @click="toggleCardForm") Nvm
          button.neu-c-button(type="submit") Post
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'postForm',
  props: ['validation', 'formData', 'formChar'],
  data () {
    return {
      isError: false
    }
  },
  computed: {
    ...mapState([
      'userProfile',
      'posts'
    ]),
    errorObject: function () {
      return {
        error: this.formData.title.length > this.validation.titleLimit || this.formData.text.length > this.validation.charLimit ? true : null
      }
    }
  },
  methods: {
    ...mapActions([
      'mother'
    ]),
    toggleCardForm () {
      this.$emit('resetForm', this.formData.active)
    },
    validateCharCount () {
      this.formChar.charCount = this.formData.text.length
      this.formChar.titleCount = this.formData.title.length
      this.validation.errorMsg = this.formData.title.length > this.validation.titleLimit || this.formData.text.length > this.validation.charLimit ? 'Too Many Characters' : null
    },
    handleSubmit () {
      const { title, text, active, updating, comments, links, displayComments, displayLinks } = this.formData
      const author = this.userProfile.username
      const idx = this.posts.length + 1
      const post = {
        author,
        title,
        text,
        idx,
        active,
        updating,
        comments,
        links,
        displayComments,
        displayLinks
      }
      if (post.text.length > this.validation.charLimit || post.title.length > this.validation.titleLimit) {
        this.isError = true
      } else {
        post.payload = 'addRule'
        this.mother(post)
        this.resetForm()
      }
    },
    resetForm () {
      this.$emit('resetForm', this.formData)
    }
  }
}
</script>
<style scoped lang="scss">
.error .validation-char {
  color: $candy-red!important;
}
</style>
