<template lang="pug">
  //- Create Post Form ============
  b-col.card.col-12.ml-0(v-if="showPostForm")
    .pt-1.pl-2.pr-2
      b-row.justify-content-between.mb-1
        b-col.p-0.text-left
          //- Post author
          span.caption {{ userProfile.displayName || userProfile.email }}  says:
      //- ------ New post title form ------
      b-row
        b-col.p-0.mb-0
          b-form(
            @submit.prevent="submit"
            v-bind:class="errorObject"
          )
            b-form-textarea(
              id="new-post-title"
              autofocus
              required
              contenteditable
              placeholder="Title"
              rows="1"
              max-rows="3"
              v-model="newPostData.title"
              @keyup="validateCharCount()"
            )
            b-row.justify-content-start
              a.validation-char.ml-3.mt-1 {{newPostData.title.length}} / {{formValidation.titleLimit}}

      //- ------ New post text form ------
      b-row
        b-col.p-0.mt-1
          b-form(
            @submit.prevent="submit"
            v-bind:class="errorObject"
          )

            b-form-textarea.free-textarea(
              placeholder="Post text (optional)"
              rows="4"
              max-rows="6"
              v-model="newPostData.text"
              @keyup="validateCharCount()"
              @keydown.enter.prevent="submit"
            )
            //- ------ New post validation ------
            b-row.justify-content-between
              a.validation-char.ml-3.mt-1(v-bind:class="errorObject") {{newPostData.text.length}} / {{formValidation.charLimit}}
              button.pill-button.mr-3.mt-1.mb-2(
                :disabled="isError"
                type="submit"
              ) post
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'CreatePost',
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
      'posts',
      'showPostForm'
    ]),
    errorObject: function () {
      return {
        error: this.newPostData.title.length > this.formValidation.titleLimit ? true : null
      }
    }
  },
  methods: {
    validateCharCount () {
      this.isError = this.newPostData.title.length > this.formValidation.titleLimit || this.newPostData.text.length > this.formValidation.charLimit ? true : null
    },

    submit () {
      const post = { ...this.newPostData }
      if (!this.isError) {
        this.$store.dispatch('createPost', post)
        this.resetForm()
      }
    },

    resetForm () {
      this.newPostData = {
        title: '',
        text: ''
      }
    }
  }
}
</script>
<style scoped lang="scss">
</style>
