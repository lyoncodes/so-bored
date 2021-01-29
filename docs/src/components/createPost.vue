<template lang="pug">
  b-col.col-12.mt-4.p-0.form-container
    .post-form-error-badge(v-if="isError" variant="danger") This post's title or text is too long!
    b-form(@submit.prevent="handleSubmit" v-bind:class="errorObject")
      b-col.form-content
        b-form-group.mt-3(id="input-title")
          b-form-input#title-input(
            v-model="postList.postData.title"
            @keyup="validateCharCount()"
            autofocus
            required
            contenteditable
            placeholder="Title"
          )
          a.validation-char.ml-1 {{postList.formCounter.titleCount}} / {{postList.formValidation.titleLimit}}
        b-form-group(id="input-card-text")
          b-form-textarea#post-form-textarea(
            @keyup="validateCharCount()"
            @keydown.enter.prevent="handleSubmit"
            v-model="postList.postData.text"
            placeholder="Input text here"
          )
          a.validation-char.ml-1 {{postList.formCounter.charCount}} / {{postList.formValidation.charLimit}}
        b-row.justify-content-center
          button.neu-c-button(type="reset" @click="resetForm") Nvm
          button.neu-c-button(type="submit") Post
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'createPost',
  props: ['postList'],
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
        error: this.postList.postData.title.length > this.postList.formValidation.titleLimit || this.postList.postData.text.length > this.postList.formValidation.charLimit ? true : null
      }
    }
  },
  methods: {
    ...mapActions([
      'createPost'
    ]),
    validateCharCount () {
      this.postList.formCounter.charCount = this.postList.postData.text.length
      this.postList.formCounter.titleCount = this.postList.postData.title.length
      this.isError = this.postList.postData.title.length > this.postList.formValidation.titleLimit || this.postList.postData.text.length > this.postList.formValidation.charLimit ? true : null
    },
    handleSubmit () {
      const { title, text } = this.postList.postData
      const userName = this.userProfile.username
      const post = {
        userName,
        title,
        text
      }
      if (!this.isError || this.isError === null) {
        this.createPost(post)
        this.resetForm()
      }
    },
    resetForm () {
      this.$emit('resetForm')
    }
  }
}
</script>
<style scoped lang="scss">
.error .validation-char {
  color: $candy-red!important;
}
</style>
