<template lang="pug">
  b-col.col-12.mt-4.p-0.form-container

    //- error badge
    div.error-badge(v-if="isError" variant="danger") This post's title or text is too long!

    //- create post form
    b-form(@submit.prevent="submitPost" v-bind:class="errorObject")

      b-col.pb-4

        b-form-group.mt-3
          b-form-input#new-post-title(
            v-model="newPostData.title"
            @keyup="validateCharCount()"
            autofocus
            required
            contenteditable
            placeholder="Title"
          )
          a.validation-char.ml-1 {{newPostData.title.length}} / {{formValidation.titleLimit}}

        b-form-group
          b-form-textarea#new-post-textarea(
            @keyup="validateCharCount()"
            @keydown.enter.prevent="submitPost"
            v-model="newPostData.text"
            placeholder="Input text here"
          )
          a.validation-char.ml-1 {{newPostData.text.length}} / {{formValidation.charLimit}}

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
      newPostData: {
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
        error: this.newPostData.title.length > this.formValidation.titleLimit || this.newPostData.text.length > this.formValidation.charLimit ? true : null
      }
    }
  },
  methods: {
    ...mapActions([
      'createPost'
    ]),

    validateCharCount () {
      this.formValidation.formCounter.charCount = this.newPostData.text.length
      this.formValidation.formCounter.titleCount = this.newPostData.title.length

      this.isError = this.newPostData.title.length > this.formValidation.titleLimit || this.newPostData.text.length > this.formValidation.charLimit ? true : null
    },

    submitPost () {
      const { title, text } = this.newPostData
      const createdOn = new Date()
      const userName = this.userProfile.username
      const post = {
        title,
        text,
        createdOn,
        userName
      }
      if (!this.isError) {
        this.createPost(post)
        this.resetForm()
      }
    },

    resetForm () {
      this.newPostData = {
        title: '',
        text: ''
      }
      this.$emit('hideCreatePost')
    }
  }
}
</script>
<style scoped lang="scss">
.error .validation-char {
  color: $candy-red!important;
}
</style>
