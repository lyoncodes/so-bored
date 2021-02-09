<template lang="pug">
//- Post Content Padding
.pt-3.pl-2.pr-2.pt-lg-3.pr-lg-4.pb-lg-2.pl-lg-4
  //- POST HEADING -----------
  b-row.justify-content-between.mb-3
    b-col.p-0.text-left
      //- Username
      span.caption.mb-1 {{post.userName}}
      //- Time Stamp
      span.caption.ml-2 {{ post.createdOn.toDate().toLocaleDateString() }}
    //- Delete Post Button
    button#delete-button.pr-3(
      v-if="userProfile.username === post.userName"
      @click="destroy(post)"
      :disabled="postList.updating"
    ) Delete
  .post-form-error-badge#edit-post-error(v-if="postList.isError" variant="danger") This title or comment is too long!
  //- POST TTILE -----------
  b-row
    //- Post Title
    h3.card-title(v-if="!postList.updating") {{post.title}}
    //- Update Title Form Fields (v-if="postList.updating")
    b-col.p-0.mb-0
      b-form#title-update-form(@submit.prevent="updatePostHeader(post, postList.postUpdateData)" v-if="postList.updating")
        b-form-textarea(
        id="title-update-text"
        v-model="postList.postUpdateData.title"
        @keyup="validateForm()"
        @keydown.enter.prevent="updatePostHeader(post, postList.postUpdateData)"
        :placeholder="postList.postUpdateData.title"
        autofocus
        )
        //- Input Validation
        b-row.justify-content-start
          a.validation-char(v-bind:class="titleErrorObject") {{postList.postUpdateData.title.length}} / {{formValidation.titleLimit}}
  //- POST TEXT -----------
  b-row(v-if="!postList.updating")
    //- Post Text
    p.post-text.pl-0.pr-0 {{post.text}}
  //- Update Text Form Fields (v-if="postList.updating")
  b-row
    b-col.p-0(v-if="postList.updating")
      b-form.mt-3(@submit.prevent="updatePostHeader(post, postList.postUpdateData)" v-if="postList.updating")
        //- Error Message
        b-row(v-if="formValidation.charCount > formValidation.charLimit")
          span {{formValidation.errorMsg}}
        //- text area
        b-form-textarea.mt-3(
          id="card-text"
          v-model="postList.postUpdateData.text"
          @keyup="validateForm()"
          @keydown.enter.prevent="updatePostHeader(post, postList.postUpdateData)"
          :placeholder="postList.postUpdateData.text"
        )
        //- character counter and edit button
        b-row.justify-content-between.mr-1
          a.validation-char(v-bind:class="textErrorObject") {{postList.postUpdateData.text.length}} / {{formValidation.charLimit}}
          button.mb-1#edit-post-button.neu-c-button.mt-2(type="submit" variant="primary" :disabled="!postList.postUpdateData.text.length && !postList.postUpdateData.title.length") edit
  //- POST NAVIGATION ROW -----------
  postNavigation(
    :post="post"
    :postList="postList"
  )
  //- COMMENTS COMPONENT -----------
  b-col.p-0.mb-2(v-if="postList.displayComments && !postList.displayLinks")
    b-col.col-12.p-0
      commentSection(
        :post="post"
        :postList="postList"
        :postComments="postList.commentStore"
        :selectedPost="postList.selectedPost"
        :user="userProfile.username"
        :validation="formValidation"
        :formCounter="formValidation.formCounter"
      )
  //- LINKS COMPONENT -----------
  b-col.col-12.p-0.mb-2(v-if="postList.displayLinks && !postList.displayComments")
    postLinks(
      :post="post"
      :show="postList.displayLinks"
    )
</template>
<script>
import { commentsCollection } from '../../../firebase'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'post',
  props: ['post', 'userProfile', 'formValidation'],

  data () {
    return {
      postList: {
        displayComments: false,
        displayLinks: false,
        updating: false,
        isError: null,
        pos: 0,
        commentStore: [],
        postUpdateData: {
          title: String,
          text: String
        }
      }
    }
  },

  components: {
    postNavigation: () => import('./postNavigation'),
    postLinks: () => import('./postLinks'),
    commentSection: () => import('./comments/commentSection')
  },

  computed: {
    ...mapState([
      'posts'
    ]),
    // Handles Form Entry Errors
    textErrorObject: function () {
      return {
        textError: this.postList.postUpdateData.text.length > this.formValidation.charLimit
      }
    },
    titleErrorObject: function () {
      return {
        titleError: this.postList.postUpdateData.title.length > this.formValidation.titleLimit
      }
    }
  },

  methods: {
    ...mapActions([
      'updatePost',
      'deletePost'
    ]),
    // Updates Post Title & Text in dB and Front End
    updatePostHeader (post) {
      const { title, text } = this.postList.postUpdateData
      const id = this.post.id

      const postUpdateData = {
        title,
        text,
        id
      }

      if (!this.postList.isError) {
        this.updatePost(postUpdateData)
        this.resetUpdateData()
      }
    },

    // Delete Post
    destroy (post) {
      this.deletePost(post)
    },

    // Resets postList.postUpdateData
    resetUpdateData () {
      this.postList.postUpdateData = {
        title: '',
        text: ''
      }
    },

    // Assigns postList.postUpdateData to validation prop
    validateForm () {
      this.formValidation.formCounter.charCount = this.postList.postUpdateData.text.length
      this.formValidation.formCounter.titleCount = this.postList.postUpdateData.title.length
      this.postList.isError = this.postList.postUpdateData.text.length > this.formValidation.charLimit || this.postList.postUpdateData.title.length > this.formValidation.titleLimit ? true : null
    }

  },
  async mounted () {
    const user = this.user
    this.user = user

    const comments = await commentsCollection.where('reference', '==', this.post.id).get()
    comments.forEach((c) => {
      const comment = c.data()
      comment.id = c.id
      this.postList.commentStore.push(comment)
    })
  }
}
</script>
<style scoped lang="scss">

</style>
