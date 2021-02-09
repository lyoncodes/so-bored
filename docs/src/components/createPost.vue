<template lang="pug">
  b-col.col-12.mt-4.p-0.form-container
    .post-form-error-badge(v-if="isError" variant="danger") This post's title or text is too long!
    b-form(@submit.prevent="submitPost" v-bind:class="errorObject")
      b-col.form-content
        b-form-group.mt-3(id="input-title")
          b-form-input#title-input(
            v-model="newPostInstance.title"
            @keyup="validateCharCount()"
            autofocus
            required
            contenteditable
            placeholder="Title"
          )
          a.validation-char.ml-1 {{newPostInstance.title.length}} / {{formValidation.titleLimit}}
        b-form-group(id="input-card-text")
          b-form-textarea#post-form-textarea(
            @keyup="validateCharCount()"
            @keydown.enter.prevent="submitPost"
            v-model="newPostInstance.text"
            placeholder="Input text here"
          )
          a.validation-char.ml-1 {{newPostInstance.text.length}} / {{formValidation.charLimit}}
        b-row.justify-content-center
          button.neu-c-button(type="reset" @click="resetForm") Nvm
          button.neu-c-button(type="submit") Post
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'createPost',
  props: ['formValidation'],
  data () {
    return {
      newPostInstance: {
        title: '',
        text: ''
      },
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
        error: this.newPostInstance.title.length > this.formValidation.titleLimit || this.newPostInstance.text.length > this.formValidation.charLimit ? true : null
      }
    }
  },
  methods: {
    ...mapActions([
      'createPost'
    ]),
    validateCharCount () {
      this.formValidation.formCounter.charCount = this.newPostInstance.text.length
      this.formValidation.formCounter.titleCount = this.newPostInstance.title.length
      this.isError = this.newPostInstance.title.length > this.formValidation.titleLimit || this.newPostInstance.text.length > this.formValidation.charLimit ? true : null
    },
    submitPost () {
      const { title, text } = this.newPostInstance
      const createdOn = new Date()
      const userName = this.userProfile.username
      const post = {
        title,
        text,
        createdOn,
        userName
      }
      if (!this.isError || this.isError === null) {
        this.createPost(post)
        this.resetForm()
      }
    },
    resetForm () {
      this.newPostInstance = {
        title: '',
        text: ''
      }
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
