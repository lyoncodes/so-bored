<template lang="pug">
  div(v-bind:class="{ bgHighlight: showCreatePost }")

    //- background image
    img.bg-img(v-bind:src="imgStore[0]" width="640" height="360")

    //- Navbar
    navBar(
      v-on:toggleCreatePost="toggleCreatePost()")

    //- new post form (CREATE)
    b-col.col-12.p-0
      createPost(
        :formValidation="formValidation"
        v-if="showCreatePost"
        v-on:hideCreatePost="toggleCreatePost()"
      )

      //- Posts
      postsHome(
        :formValidation="formValidation"
        v-bind:class="{ hide: showCreatePost }"
      )

      //- Landing message when posts are empty
      b-row.justify-content-center(v-if="!posts.length && !showCreatePost")
        landingMsg
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      showCreatePost: false,

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
  components: {
    navBar: () => import('../components/navBar'),
    postsHome: () => import('../components/postsHome'),
    createPost: () => import('../components/createPost'),
    landingMsg: () => import('../components/landingMsg')
  },
  computed: {
    ...mapState([
      'posts',
      'imgStore'
    ])
  },
  methods: {
    toggleCreatePost () {
      this.showCreatePost = !this.showCreatePost
    }
  }
}
</script>
<style scoped lang="scss">
</style>
