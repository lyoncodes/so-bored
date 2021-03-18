<template lang="pug">
//- Post content padding
.pt-1.pl-2.pr-2

  //- Post Heading -----------
  b-row.justify-content-between.mb-1

    b-col.p-0.text-left
      //- Post author
      span.caption {{ post.userName }}
      //- Post date
      span.caption.ml-2 {{ post.createdOn.toDate().toLocaleDateString() }}

    //- Delete post button
    button#delete-post.post-navigation-button(
      v-if="userProfile.displayName === post.userName"
      :disabled="postList.updating"
      @click="destroy(post)"
    )
      IconBase(
        icon-name="delete"
        iconColor="rgb(252, 56, 172)"
      )
        IconDelete

  //- Post Title -----------
  b-row

    //- Title
    h3#post-title.mb-0.text-left(v-if="!postList.updating") {{post.title}}

    //- Update form fields (title)
    b-col.p-0.mb-0
      //- title form field
      b-form#title-update-form(
        @submit.prevent="updatePostHeader(post, postList.postUpdateData)"
        v-if="postList.updating"
        v-bind:class="titleErrorObject"
      )
        //- title text area
        b-form-textarea(
        id="title-update-text"
        autofocus
        v-model="postList.postUpdateData.title"
        :placeholder="postList.postUpdateData.title"
        @keyup="validateForm()"
        @keydown.enter.prevent="updatePostHeader(post, postList.postUpdateData)"
        )

        //- input validation
        b-row.justify-content-start
          a.validation-char#update-validation-char(v-bind:class="titleErrorObject") {{postList.postUpdateData.title.length}} / {{formValidation.titleLimit}}

  //- Post Text -----------
  b-row(v-if="!postList.updating")

    //- Text content
    p.post-text {{post.text}}

  //- Update text form fields
  b-row

    b-col.p-0(v-if="postList.updating")
      //- Form
      b-form.mt-3(
        @submit.prevent="updatePostHeader(post, postList.postUpdateData)"
        v-bind:class="textErrorObject"
      )

        //- text area
        b-form-textarea.mt-3(
          id="post-update-textarea"
          v-model="postList.postUpdateData.text"
          @keyup="validateForm()"
          @keydown.enter.prevent="updatePostHeader(post, postList.postUpdateData)"
          :placeholder="postList.postUpdateData.text"
        )

        //- character counter and edit button
        b-row.justify-content-between
          a.validation-char#update-validation-char {{postList.postUpdateData.text.length}} / {{formValidation.charLimit}}

          button#update-post.neu-b-button(
            type="submit"
            variant="primary"
            :disabled="!postList.postUpdateData.text.length && !postList.postUpdateData.title.length"
          ) edit

  //- Post navigation -----------
  postNavigation(
    :post="post"
    :postList="postList"
    :postComments="getPostComments"
    :postLinks="getPostLinks"
    :user="userProfile.displayName"
  )

  //- Comments section -----------
  div(v-if="postList.displayComments && !postList.displayLinks")
    postComments(
      :post="post"
      :postList="postList"
      :postComments="getPostComments"
      :user="userProfile.displayName"
      :validation="formValidation"
    )

  //- Links section -----------
  div(v-if="postList.displayLinks && !postList.displayComments")
    postLinks(
      :post="post"
      :postList="postList"
      :postLinks="getPostLinks"
      :user="userProfile.displayName"
      :validation="formValidation"
    )
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'post',
  props: ['post', 'formValidation'],

  data () {
    return {
      postList: {
        displayComments: false,
        displayLinks: false,
        updating: false,
        isError: false,
        postUpdateData: {
          title: String,
          text: String
        }
      }
    }
  },

  components: {
    postNavigation: () => import('./postNavigation'),
    postLinks: () => import('./links/postLinks'),
    postComments: () => import('./comments/postComments'),
    IconBase: () => import('../IconBase'),
    IconDelete: () => import('../icons/IconDelete')
  },

  computed: {
    ...mapState([
      'userProfile',
      'posts',
      'comments',
      'links'
    ]),
    getPostComments: function () {
      const comments = this.comments.filter(c => c.reference === this.post.id)
      comments.sort((a, b) => a.createdOn - b.createdOn)
      return comments
    },
    getPostLinks: function () {
      const links = this.links.filter(c => c.reference === this.post.id)
      links.sort((a, b) => a.createdOn - b.createdOn)
      return links
    },
    // Handle form entry errors
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
    updatePostHeader () {
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
      this.postList.updating = false
      this.postList.postUpdateData = {
        title: '',
        text: ''
      }
    },

    // Assigns postList.postUpdateData to validation prop
    validateForm () {
      this.postList.isError = this.postList.postUpdateData.text.length > this.formValidation.charLimit || this.postList.postUpdateData.title.length > this.formValidation.titleLimit ? true : null
    }
  }
}
</script>
<style scoped lang="scss">
</style>
