<template lang="pug">
  div
    //- Navbar
    navBar(
      v-on:toggleCreatePost="toggleCreatePost()")

    b-col.col-12.p-0

      //- Posts
      postsHome(
        :formValidation="formValidation"
        :showCreatePost="showCreatePost"
        @hideForm="toggleCreatePost"
      )
</template>

<script>
export default {
  data () {
    return {
      showCreatePost: false,

      formValidation: {
        titleLimit: 140,
        charLimit: 300,
        commentLimit: 160
      }

    }
  },
  created: function () {
    this.$store.dispatch('readPosts') // fetch posts when Home is created - ML
  },
  components: {
    navBar: () => import('../components/navBar'),
    postsHome: () => import('../components/postsHome')
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
