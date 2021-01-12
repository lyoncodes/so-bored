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
          v-on:hideForm="resetButton()"
          :validation="formValidation")
      //- POST COLLECTION COMPONENT
      b-col.col-12.mt-5.p-0
        #posts.pb-5
          posts(
            v-bind:class="{ hide: togglePostForm }"
            :validation="formValidation"
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
      card: {},
      formValidation: {
        titleLimit: 140,
        charLimit: 300,
        commentLimit: 160,
        errorMsg: String
      },
      togglePostForm: false
    }
  },
  methods: {
    showPostForm (val) {
      this.togglePostForm = !this.togglePostForm
    },
    resetButton () {
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
