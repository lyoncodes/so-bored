<template lang="pug">
b-col.post.col-12.ml-0
  .pt-1.pl-2.pr-2

    //- Post Heading -----------
    b-row.justify-content-between.mb-1
      b-col.p-0.text-left
        //- Post author
        span.caption {{ userProfile.username }}'s says:
    //- New Post title form
    b-row
      b-col.p-0.mb-0
        //- create post form
        b-form(
          @submit.prevent="newPost"
          v-bind:class="errorObject"
        )
          b-form-textarea#new-post-title(
            v-model="newPostData.title"
            @keyup="validateCharCount()"
            autofocus
            required
            contenteditable
            placeholder="Title"
            rows="1"
            max-rows="3"
          )
          b-row.justify-content-start
            a.validation-char#new-post-validation.ml-3.mt-1 {{newPostData.title.length}} / {{formValidation.titleLimit}}

    //- New Post text field
    b-row
      b-col.col-12.p-0
        b-form.mt-1(
          inline
          @submit.prevent="newPost"
          v-bind:class="errorObject"
        )

          b-form-textarea#new-post-textarea(
            @keyup="validateCharCount()"
            @keydown.enter.prevent="newPost"
            v-model="newPostData.text"
            placeholder="Post text (optional)"
            rows="1"
            max-rows="6"
          )
          button#create-post.post-navigation-button.m-0.mt-1(
            :disabled="isError"
            type="submit"
          )
            IconBase(
              icon-name="comment"
              height="15"
              width="15"
            )
              IconComment
      b-row.justify-content-between.mb-2
        a.validation-char#new-post-validation.ml-3.mt-1 {{newPostData.text.length}} / {{formValidation.charLimit}}

</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'createPost',
  props: ['formValidation'],
  components: {
    IconBase: () => import('./IconBase'),
    IconComment: () => import('./icons/IconComment')
  },
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

    newPost () {
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
      this.$emit('hideCreatePost', false)
    }
  }
}
</script>
<style scoped lang="scss">
</style>
