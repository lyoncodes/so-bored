<template lang="pug">
b-container
  b-col.post.col-12.ml-0
    .pt-3.pl-2.pr-2.pt-lg-3.pr-lg-4.pb-lg-2.pl-lg-4
      //- Post Heading -----------
      b-row.justify-content-between.mb-3

        b-col.p-0.text-left
          //- Post author
          span.caption {{ userProfile.username }}'s new post:
        //- Reset new post form
        button#reset-post-form.neu-c-button(
          type="reset"
          @click="resetForm"
        ) Back
      //- error badge
      .error-badge(v-if="isError" variant="danger") This post's title or text is too long!

      //- New Post title form
      b-row
        b-col.p-0.mb-0
          //- create post form
          b-form(@submit.prevent="submitPost" v-bind:class="errorObject")
            b-form-textarea#new-post-title(
              v-model="newPostData.title"
              @keyup="validateCharCount()"
              autofocus
              required
              contenteditable
              placeholder="Title"
            )
            b-row.justify-content-start
              a.validation-char.ml-3 {{newPostData.title.length}} / {{formValidation.titleLimit}}

      //- New Post text field
      b-row
        b-col.col-12.p-0
          b-form.mt-3(
            @submit.prevent="submitPost" v-bind:class="errorObject"
          )

            b-form-textarea#post-form-textarea(
              @keyup="validateCharCount()"
              @keydown.enter.prevent="submitPost"
              v-model="newPostData.text"
              placeholder="Post text (optional)"
            )

            b-row.justify-content-between
              a.validation-char.ml-3 {{newPostData.text.length}} / {{formValidation.charLimit}}

              button#create-post.neu-b-button.mr-3(type="submit") Post
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
