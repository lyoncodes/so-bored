<template lang="pug">
//- Post Content Padding
.pt-3.pl-2.pr-2.pt-lg-3.pr-lg-4.pb-lg-2.pl-lg-4
  //- POST HEADING -----------
  b-row.justify-content-between.mb-3
    b-col.p-0.text-left
      //- Username
      span.caption.mb-1 {{post.userName}}
      //- Time Stamp
      span.caption.ml-2 {{ post.createdOn.toLocaleDateString() }}
    //- Delete Post Button
    button#delete-button.pr-3(
      v-if="userProfile.username === post.userName"
      @click="handleDelete(post)"
      :disabled="postList.updating"
    ) Delete
  .post-form-error-badge#edit-post-error(v-if="postList.isError" variant="danger") This title or comment is too long!
  //- POST TTILE -----------
  b-row
    //- Post Title
    h3.card-title(v-if="!postList.updating") {{post.title}}
    //- Update Title Form Fields (v-if="postList.updating")
    b-col.p-0.mb-0
      b-form#title-update-form(@submit.prevent="submitUpdateData(post, postList.postUpdateData)" v-if="postList.updating")
        b-form-textarea(
        id="title-update-text"
        v-model="postList.postUpdateData.title"
        @keyup="validateCharCount()"
        @keydown.enter.prevent="submitUpdateData(post, postList.postUpdateData)"
        :placeholder="postList.postUpdateData.title"
        autofocus
        )
        //- Input Validation
        b-row.justify-content-start
          a.validation-char(v-bind:class="titleErrorObject") {{postList.postUpdateData.title.length}} / {{postList.formValidation.titleLimit}}
  //- POST TEXT -----------
  b-row(v-if="!postList.updating")
    //- Post Text
    p.post-text.pl-0.pr-0 {{post.text}}
  //- Update Text Form Fields (v-if="postList.postData.updating")
  b-row
    b-col.p-0(v-if="postList.updating")
      b-form.mt-3(@submit.prevent="submitUpdateData(post, postList.postUpdateData)" v-if="postList.updating")
        //- Error Message
        b-row(v-if="postList.formValidation.charCount > postList.formValidation.charLimit")
          span {{postList.formValidation.errorMsg}}
        //- text area
        b-form-textarea.mt-3(
          id="card-text"
          v-model="postList.postUpdateData.text"
          @keyup="validateCharCount()"
          @keydown.enter.prevent="submitUpdateData(post, postList.postUpdateData)"
          :placeholder="postList.postUpdateData.text"
        )
        //- character counter and edit button
        b-row.justify-content-between.mr-1
          a.validation-char(v-bind:class="textErrorObject") {{postList.postUpdateData.text.length}} / {{postList.formValidation.charLimit}}
          button.mb-1#edit-post-button.neu-c-button.mt-2(type="submit" variant="primary" :disabled="!postList.postUpdateData.text.length && !postList.postUpdateData.title.length") edit
  //- POST NAVIGATION ROW -----------
  postNavigation(
    :post="post"
    :postList="postList"
    v-on:toggleForms
  )
  //- COMMENTS COMPONENT -----------
  b-col.p-0.mb-2(v-if="postList.postData.displayComments && !postList.postData.displayLinks")
    b-col.col-12.p-0
      postComments(
        :post="post"
        :user="userProfile.username"
        :validation="postList.formValidation"
        :formCounter="postList.formCounter"
      )
  //- LINKS COMPONENT -----------
  b-col.col-12.p-0.mb-2(v-if="postList.postData.displayLinks && !postList.postData.displayComments")
    postLinks(
      :post="post"
      :show="postList.postData.displayLinks"
      v-on:toggleLinkForm="toggleLinkForm(post)"
    )
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'post',
  props: ['post', 'userProfile', 'formValidation'],
  data () {
    return {
      postList: {
        formValidation: {
          titleLimit: 140,
          charLimit: 300,
          commentLimit: 160,
          errorMsg: String
        },
        formCounter: {
          titleCount: 0,
          charCount: 0
        },
        postData: {
          title: '',
          text: '',
          comments: [],
          links: [],
          displayComments: false,
          displayLinks: false
        },
        postUpdateData: {
          title: String,
          text: String,
          updating: false
        },
        tokenString: String,
        isError: null,
        updating: false
      }
    }
  },
  components: {
    postNavigation: () => import('./postNavigation'),
    postLinks: () => import('./postLinks'),
    postComments: () => import('./postComments')
  },
  computed: {
    // Handles Form Entry Errors
    textErrorObject: function () {
      return {
        textError: this.postList.postUpdateData.text.length > this.postList.formValidation.charLimit
      }
    },
    titleErrorObject: function () {
      return {
        titleError: this.postList.postUpdateData.title.length > this.postList.formValidation.titleLimit
      }
    }
  },
  methods: {
    ...mapActions([
      'updatePost',
      'deletePost'
    ]),
    // Updates Post Title & Text in dB and Front End
    submitUpdateData (post) {
      // decalre variables for update payload
      const { title, text } = this.postList.postUpdateData
      const id = this.post.id
      // format update payload
      const postUpdateData = {
        title,
        text,
        id
      }
      // error catch
      if (!this.postList.isError) {
        this.updatePost(postUpdateData)
        this.clearForm()
      }
    },
    // Delete Post
    handleDelete (post) {
      this.deletePost(post)
    },
    // Resets postList.postUpdateData
    clearForm () {
      this.postList.postUpdateData = {
        title: '',
        text: '',
        updating: false
      }
    },
    // Assigns postList.postUpdateData to validation prop
    validateCharCount () {
      this.postList.formCounter.charCount = this.postList.postUpdateData.text.length
      this.postList.formCounter.titleCount = this.postList.postUpdateData.title.length
      this.postList.isError = this.postList.postUpdateData.text.length > this.postList.formValidation.charLimit || this.postList.postUpdateData.title.length > this.postList.formValidation.titleLimit ? true : null
    },
    // Redirects links to URL
    redirect (link) {
      window.location.href = `${link.url}`
    }

  }
}
</script>
<style scoped lang="scss">

</style>
