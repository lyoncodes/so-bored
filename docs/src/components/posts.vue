<template lang="pug">
  //- Post Container
  b-container.card-container.p-0
    //- Array Iteration (post in posts, mounted() from 'posts' in state object)
    b-col.post.col-12.ml-0(v-for="post in posts" :key="post.title")
      //- Post Content Padding
      .pt-3.pl-2.pr-2.pt-lg-3.pr-lg-4.pb-lg-2.pl-lg-4
        //- POST HEADING -----------
        b-row.justify-content-between.mb-3
          b-col.p-0.text-left
            //- Username
            span.caption.mb-1 {{post.userName}}
            //- Time Stamp
            span.caption.ml-2 {{ post.dateToFormat.toLocaleDateString() }}
          //- Delete Post Button
          button#delete-button.pr-3(
            v-if="userProfile.username === post.userName"
            @click="handleDelete(post)"
            :disabled="updateData.updating"
          ) Delete
        b-badge.post-form-error-badge#edit-post-error(v-if="isError" variant="danger") This title or comment is too long!
        //- POST TTILE -----------
        b-row
          //- Post Title
          h3.card-title(v-if="!post.updating") {{post.title}}
          //- Update Title Form Fields (v-if="post.updating")
          b-col.p-0.mb-0
            b-form#title-update-form(@submit.prevent="submitUpdateData(post, updateData)" v-if="post.updating")
              b-form-textarea(
              id="title-update-text"
              v-model="updateData.title"
              @keyup="validateCharCount()"
              @keydown.enter.prevent="submitUpdateData(post, updateData)"
              :placeholder="updateData.title"
              autofocus
              )
              //- Input Validation
              b-row.justify-content-start
                a.validation-char(v-bind:class="titleErrorObject") {{updateData.title.length}} / {{postList.formValidation.titleLimit}}
        //- POST TEXT -----------
        b-row(v-if="!post.updating")
          //- Post Text
          b-card-text.post-text.pl-0.pr-0 {{post.text}}
        //- Update Text Form Fields (v-if="post.updating")
        b-row
          b-col.p-0(v-if="post.updating")
            b-form.mt-3(@submit.prevent="submitUpdateData(post, updateData)" v-if="post.updating")
              //- Error Message
              b-row(v-if="postList.formValidation.charCount > postList.formValidation.charLimit")
                b-badge(variant="danger") {{postList.formValidation.errorMsg}}
              //- text area
              b-form-textarea.mt-3(
                id="card-text"
                v-model="updateData.text"
                @keyup="validateCharCount()"
                @keydown.enter.prevent="submitUpdateData(post, updateData)"
                :placeholder="updateData.text"
              )
              //- character counter and edit button
              b-row.justify-content-between.mr-1
                a.validation-char(v-bind:class="textErrorObject") {{updateData.text.length}} / {{postList.formValidation.charLimit}}
                button.mb-1#edit-post-button.neu-c-button.mt-2(type="submit" variant="primary" :disabled="!updateData.text.length && !updateData.title.length") edit
        //- POST NAVIGATION ROW -----------
        postNavigation(
          :post="post"
          :updateData="updateData"
          v-on:toggleForms
        )
        //- COMMENTS COMPONENT -----------
        b-col.p-0.mb-2(v-if="post.active && !post.displayLinks")
          b-col.col-12.p-0
            postComments(
              :post="post"
              :user="userProfile.username"
              :validation="postList.formValidation"
              :show="post.active"
              :formCounter="postList.formCounter"
            )
        //- LINKS COMPONENT -----------
        b-col.col-12.p-0.mb-2(v-if="post.displayLinks && !post.active")
          postLinks(
            :post="post"
            :show="post.displayLinks"
            v-on:toggleLinkForm="toggleLinkForm(post)"
          )
</template>
<script>
import { mapActions, mapState } from 'vuex'
import postComments from '../components/card/postComments'
import postLinks from '../components/card/postLinks'
import postNavigation from '../components/card/postNavigation'
export default {
  name: 'posts',
  props: ['postList'],
  data () {
    return {
      updateData: {
        title: '',
        text: '',
        updating: false
      },
      isError: null
    }
  },
  components: {
    postComments,
    postLinks,
    postNavigation
  },
  computed: {
    ...mapState([
      'posts',
      'userProfile'
    ]),
    // Handles Form Entry Errors
    textErrorObject: function () {
      return {
        textError: this.updateData.text.length > this.postList.formValidation.charLimit
      }
    },
    titleErrorObject: function () {
      return {
        titleError: this.updateData.title.length > this.postList.formValidation.titleLimit
      }
    }
  },
  methods: {
    ...mapActions([
      'updatePost',
      'deletePost'
    ]),
    // Formats Post as Object
    formatPost (post) {
      const { title, text, id, active, updating, comments } = post
      const postPayload = {
        title,
        text,
        id,
        active,
        updating,
        comments
      }
      return postPayload
    },
    // Updates Post Title & Text in dB and Front End
    submitUpdateData (post) {
      // decalre variables for update payload
      const payload = this.formatPost(post)
      const { id, updating, comments } = payload
      const { title, text } = this.updateData
      // format update payload
      const postUpdateData = {
        title,
        text,
        id,
        updating,
        comments
      }
      // error catch
      if (!this.isError) {
        postUpdateData.payload = 'updatePost'
        this.updatePost(postUpdateData)
        post.updating = false
        this.clearForm()
      }
    },
    // Delete Post
    handleDelete (post) {
      post.payload = 'deletePost'
      this.deletePost(post)
    },
    // Resets updateData
    clearForm (post) {
      this.updateData = {
        title: '',
        text: '',
        updating: false
      }
      this.$emit('resetForm')
    },
    // Assigns updateData to validation prop
    validateCharCount () {
      this.postList.formCounter.charCount = this.updateData.text.length
      this.postList.formCounter.titleCount = this.updateData.title.length
      this.isError = this.updateData.text.length > this.postList.formValidation.charLimit || this.updateData.title.length > this.postList.formValidation.titleLimit ? true : null
    },
    // Redirects links to URL
    redirect (link) {
      window.location.href = `${link.url}`
    }
  },
  mounted () {
    const post = this.posts
    this.post = post
  }

}
</script>
<style scoped lang="scss">
.titleError, .textError {
  color: $candy-red;
}
</style>
