<template lang="pug">
  //- Post Container ============
  b-container

    //- Create Post Form ============
    b-col.post.col-12.ml-0(v-if="showCreatePost")
      .pt-1.pl-2.pr-2
        b-row.justify-content-between.mb-1
          b-col.p-0.text-left
            //- Post author
            span.caption {{ userProfile.displayName || userProfile.email }}  says:
        //- ------ New post title form ------
        b-row
          b-col.p-0.mb-0
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

        //- ------ New post text form ------
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
          //- ------ New post validation ------
          b-row.justify-content-between.mb-2
            a.validation-char#new-post-validation.ml-3.mt-1 {{newPostData.text.length}} / {{formValidation.charLimit}}

    //- Array Iteration (post in posts, mounted() from 'posts' in state object)
    b-col.post.col-12.ml-0(v-for="post in posts" :key="post.id")

      postComponent(
        :post="post"
        :formValidation="formValidation"
      )
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'posts',
  props: ['formValidation', 'showCreatePost'],
  components: {
    postComponent: () => import('../components/post/postComponent'),
    IconBase: () => import('./IconBase'),
    IconComment: () => import('./icons/IconComment')
  },
  data () {
    return {
      newPostData: {
        title: '',
        text: ''
      },
      updateProfileData: {
        displayName: null
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
    updateProfile () {
      this.userProfile.updateProfile({
        displayName: this.updateProfileData.displayName
      })
    },
    validateCharCount () {
      this.isError = this.newPostData.title.length > this.formValidation.titleLimit || this.newPostData.text.length > this.formValidation.charLimit ? true : null
    },

    newPost () {
      const { title, text } = this.newPostData
      const createdOn = new Date()
      const userName = this.userProfile.displayName
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
      this.$emit('hideForm')
    },

    toggleCreatePost () {
      this.showCreatePost = !this.showCreatePost
    }
  }
}
</script>
<style scoped lang="scss">
</style>
