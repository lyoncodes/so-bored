<template lang="pug">
  div.bg-image-container#app-content(v-bind:class="{ yellowBackground: togglePostForm }")
    //- NAVBAR
    navBar(v-on:togglePostForm="showPostForm($event)")
    //-
    //- CONTENT CONTAINER
    b-container(fluid="sm")
      //- background image
      //- img.bg-img(v-bind:src="imgFolder[0]")
      //- CREATE POST COMPONENT
      b-col.col-12.p-0
        #post-form
          postForm(v-if="togglePostForm"
          v-on:resetForm="resetButton()"
          :validation="formValidation"
          :formData="formData"
          :formChar="formChar")
      //- POST COLLECTION COMPONENT
      b-col.col-12.mt-5.p-0
        #posts.pb-5
          posts(
            v-on:resetForm="resetButton($event, formData)"
            v-bind:class="{ hide: togglePostForm }"
            :validation="formValidation"
            :formChar="formChar"
          )
        //- LANDING MESSAGE COMPONENT
        b-row.justify-content-center(v-if="!posts.length && !togglePostForm")
          landingMsg
</template>

<script>
import navBar from '../components/navBar'
import postForm from '../components/postForm'
import posts from '../components/posts'
import landingMsg from '../components/landingMsg'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      formValidation: {
        titleLimit: 140,
        charLimit: 300,
        commentLimit: 160,
        errorMsg: String
      },
      formData: {
        title: '',
        text: '',
        active: false,
        updating: false,
        comments: [],
        links: [],
        displayComments: false,
        displayLinks: false
      },
      formChar: {
        titleCount: 0,
        charCount: 0
      },
      togglePostForm: false
    }
  },
  methods: {
    showPostForm (val) {
      this.togglePostForm = !this.togglePostForm
    },
    resetButton (data) {
      console.log(data)
      this.formData = {
        title: '',
        text: '',
        active: false,
        updating: false,
        comments: [],
        links: [],
        commentType: false,
        displayComments: false,
        displayLinks: false
      }
      this.formChar = {
        titleCount: 0,
        charCount: 0
      }
      this.togglePostForm = false
    }
  },
  components: {
    navBar,
    postForm,
    posts,
    landingMsg
  },
  computed: {
    ...mapState([
      'userProfile',
      'posts',
      'imgFolder'
    ])
  }
}
</script>
<style scoped lang="scss">
</style>
