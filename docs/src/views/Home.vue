<template lang="pug">
  div.bg-image-container#app-content(v-bind:class="{ yellowBackground: togglePostForm }")
    //- background image
    img.bg-img(v-bind:src="imgFolder[0]" width="640" height="360")
    //- NAVBAR
    navBar(
      v-on:togglePostForm="showCreatePost()")
    //-
    //- CONTENT CONTAINER
    b-container(fluid="sm")
      //- CREATE POST COMPONENT
      b-col.col-12.p-0
        #post-form
          createPost(v-if="togglePostForm"
          v-on:resetForm="resetPostForm()"
          :postList="postList")
      //- POST COLLECTION COMPONENT
      b-col.col-12.mt-5.p-0
        #posts.pb-5
          posts(
            v-on:resetForm="resetPostForm($event)"
            v-bind:class="{ hide: togglePostForm }"
            :postList="postList"
          )
        //- LANDING MESSAGE COMPONENT
        b-row.justify-content-center(v-if="!posts.length && !togglePostForm")
          landingMsg
</template>

<script>
import navBar from '../components/navBar'
import posts from '../components/posts'
import { mapState } from 'vuex'

export default {
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
          active: false,
          updating: false,
          displayComments: false,
          displayLinks: false
        }
      },
      togglePostForm: false
    }
  },
  methods: {
    showCreatePost () {
      this.togglePostForm = !this.togglePostForm
    },
    resetPostForm (data) {
      this.postList.postData = {
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
      this.postList.formCounter = {
        titleCount: 0,
        charCount: 0
      }
      this.togglePostForm = false
    }
  },
  components: {
    navBar,
    posts,
    createPost: () => import('../components/createPost'),
    landingMsg: () => import('../components/landingMsg')
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
