<template lang="pug">
  div.bg-image-container#app-content(v-bind:class="{ yellowBackground: togglePostForm }")

    //- background image
    img.bg-img(v-bind:src="imgStore[0]" width="640" height="360")

    //- Navbar
    navBar(
      v-on:togglePostForm="showCreatePost()")

    b-container(fluid="sm")
      //- Post creation component
      b-col.col-12.p-0
        #post-form
          createPost(
            :formValidation="formValidation"
            v-if="togglePostForm"
            v-on:resetForm="showCreatePost()"
          )

      //- Posts container
      b-col.col-12.mt-5.p-0
        #posts.pb-5
          posts(
            :formValidation="formValidation"
            v-bind:class="{ hide: togglePostForm }"
          )

        //- Landing message when posts are empty
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
      togglePostForm: false,
      formValidation: {
        titleLimit: 140,
        charLimit: 300,
        commentLimit: 160,
        errorMsg: String,
        formCounter: {
          titleCount: 0,
          charCount: 0
        }
      }
    }
  },
  methods: {
    showCreatePost () {
      this.togglePostForm = !this.togglePostForm
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
      'posts',
      'imgStore'
    ])
  }
}
</script>
<style scoped lang="scss">
</style>
