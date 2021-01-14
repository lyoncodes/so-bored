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
          b-button.icon-button.p-0.pr-3(@click="handleDelete(post)"
          :disabled="updateData.updating"
          )
            img#delete-post-icon(src='../assets/delete.svg')
        b-badge.post-form-error-badge#edit-post-error(v-if="isError" variant="danger") This title or comment is too long!
        //- POST TTILE -----------
        b-row
          //- Post Title
          h3.card-title(v-if="!post.updating") {{post.title}}
          //- Update Title Form Fields (v-if="updateData.updating")
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
                a.validation-char(v-bind:class="titleErrorObject") {{updateData.title.length}} / {{validation.titleLimit}}
        //- POST TEXT -----------
        b-row(v-if="!post.updating")
          //- Post Text
          b-card-text.post-text.pl-0.pr-0 {{post.text}}
        //- Update Text Form Fields (v-if="updateData.updating")
        b-row
          b-col.p-0(v-if="post.updating")
            b-form.mt-3(@submit.prevent="submitUpdateData(post, updateData)" v-if="post.updating")
              //- Error Message
              b-row(v-if="validation.charCount > validation.charLimit")
                b-badge(variant="danger") {{validation.errorMsg}}
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
                a.validation-char(v-bind:class="textErrorObject") {{updateData.text.length}} / {{validation.charLimit}}
                button.mb-1#edit-post-button.neu-c-button.mt-2(type="submit" variant="primary" :disabled="!updateData.text.length && !updateData.title.length") edit
        //- POST NAVIGATION ROW -----------
        b-row.mb-2
          //- handle update post data & cancel form update
          b-button.icon-button(@click="toggleUpdateForm(post)")
            img.inline-card-icon(src='../assets/editPencil.svg')
          //- sets post.active & displays comment component
          b-button.icon-button(@click="toggleCommentComponent(post)"
          :disabled="updateData.updating")
            img#show-more(src='../assets/comment.svg')
            span.caption.pl-1 {{post.comments.length}}
          //- sets post.showLinks & displays link component
          b-button.icon-button(@click="toggleLinkForm(post)"
          :disabled="updateData.updating")
            img#show-more(src='../assets/link.svg')
            span.caption.pl-1 {{post.links.length}}
        //- COMMENTS COMPONENT -----------
        b-col.p-0.mb-2(v-if="post.active && !post.displayLinks")
          b-col.col-12.p-0
            postComments(
              :post="post"
              :user="userProfile.username"
              :validation="validation"
              :show="post.active"
              :formChar="formChar"
            )
        //- LINKS COMPONENT -----------
        b-col.col-12.p-0.mb-2(v-if="post.displayLinks")
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
export default {
  name: 'posts',
  props: ['validation', 'formChar'],
  data () {
    return {
      updateData: {
        title: '',
        text: '',
        updating: false
      },
      displayLinks: false,
      isError: null
    }
  },
  components: {
    postComments,
    postLinks
  },
  computed: {
    ...mapState([
      'posts',
      'userProfile'
    ]),
    // Handles Form Entry Errors
    textErrorObject: function () {
      return {
        textError: this.updateData.text.length > this.validation.charLimit
      }
    },
    titleErrorObject: function () {
      return {
        titleError: this.updateData.title.length > this.validation.titleLimit
      }
    }
  },
  methods: {
    ...mapActions([
      'mother'
    ]),
    // Display / Hide Editing Fields
    toggleUpdateForm (post) {
      this.updateData.title = post.title
      this.updateData.text = post.text
      this.updateData.updating = !this.updateData.updating
      post.payload = 'toggleUpdateFields'
      this.mother(post)
    },
    // Display / Hide Comment Section
    toggleCommentComponent (post) {
      post.active = !post.active
      post.payload = 'toggleActive'
      this.mother(post)
    },
    // Display / Hide Link Section
    toggleLinkForm (post) {
      post.active = false
      post.payload = 'toggleLinkForm'
      this.mother(post)
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
      // error handling block
      if (!this.isError) {
        // attach update payload & call mother()
        postUpdateData.payload = 'updatePost'
        this.mother(postUpdateData)
        // set card.updating to false and clear update form
        post.updating = false
        this.clearForm()
      }
    },
    // Delete Post
    handleDelete (post) {
      post.payload = 'deletePost'
      this.mother(post)
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
    // Formats Post as Object
    formatPost (post) {
      const { title, text, id, active, updating, comments } = post
      const cardPayload = {
        title,
        text,
        id,
        active,
        updating,
        comments
      }
      return cardPayload
    },
    // Assigns updateData to validation prop
    validateCharCount () {
      this.formChar.charCount = this.updateData.text.length
      this.formChar.titleCount = this.updateData.title.length
      this.isError = this.updateData.text.length > this.validation.charLimit || this.updateData.title.length > this.validation.titleLimit ? true : null
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
