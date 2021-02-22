<template lang="pug">
//- Post content padding
.pt-3.pl-2.pr-2
  //- Post Heading -----------
  b-row.justify-content-between.mb-3

    b-col.p-0.text-left
      //- Post author
      span.caption {{ post.userName }}
      //- Post date
      span.caption.ml-2 {{ post.createdOn.toDate().toLocaleDateString() }}

    //- Delete post button
    button#delete-post.neu-c-button(
      v-if="userProfile.username === post.userName"
      :disabled="postList.updating"
      @click="destroy(post)"
    ) Delete

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

        //- Error message
        b-row(v-if="formValidation.charCount > formValidation.charLimit")
          span {{formValidation.errorMsg}}

        //- text area
        b-form-textarea.mt-3(
          id="post-form-textarea"
          v-model="postList.postUpdateData.text"
          @keyup="validateForm()"
          @keydown.enter.prevent="updatePostHeader(post, postList.postUpdateData)"
          :placeholder="postList.postUpdateData.text"
        )

        //- character counter and edit button
        b-row.justify-content-between
          a.validation-char#update-validation-char(
          ) {{postList.postUpdateData.text.length}} / {{formValidation.charLimit}}

          button#update-post.neu-b-button(
            type="submit"
            variant="primary"
            :disabled="!postList.postUpdateData.text.length && !postList.postUpdateData.title.length"
          ) edit

  //- Post navigation -----------
  postNavigation(
    :post="post"
    :postList="postList"
  )

  //- Comments section -----------
  b-col.p-0.mb-2(v-if="postList.displayComments && !postList.displayLinks")
    postComments(
      :post="post"
      :postList="postList"
      :postComments="postList.commentStore"
      :selectedPost="postList.selectedPost"
      :user="userProfile.username"
      :validation="formValidation"
    )

  //- Links section -----------
  b-col.col-12.p-0.mb-2(v-if="postList.displayLinks && !postList.displayComments")
    postLinks(
      :post="post"
      :postList="postList"
      :show="postList.displayLinks"
      :validation="formValidation"
    )
</template>
<script>
import { commentsCollection, linksCollection } from '../../../firebase'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'post',
  props: ['post', 'formValidation'],

  data () {
    return {
      postList: {
        displayComments: false,
        displayCommentForm: true,
        displayLinks: false,
        displayLinkForm: true,
        updating: false,
        isError: false,
        commentStore: [],
        linkStore: [],
        postUpdateData: {
          title: String,
          text: String
        }
      }
    }
  },

  components: {
    postNavigation: () => import('./postNavigation'),
    postLinks: () => import('./links/postLink'),
    postComments: () => import('./comments/postComment')
  },

  computed: {
    ...mapState([
      'userProfile',
      'posts'
    ]),

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
      this.postList.updating = false
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

    // Assigns post comments
    const comments = await commentsCollection.where('reference', '==', this.post.id).limit(50).get()
    console.log('called on mount:' + comments)
    comments.forEach((c) => {
      const comment = c.data()
      comment.id = c.id
      this.postList.commentStore.push(comment)
    })
    this.postList.commentStore.sort((a, b) => a.createdOn - b.createdOn)

    // Assigns post links
    const links = await linksCollection.where('reference', '==', this.post.id).limit(50).get()
    links.forEach((l) => {
      const link = l.data()
      link.id = l.id
      this.postList.linkStore.push(link)
    })
  }
}
</script>
<style scoped lang="scss">
.textError .validation-char, .titleError .validation-char{
  color: $candy-red!important;
}
</style>
