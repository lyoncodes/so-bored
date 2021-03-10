<template lang="pug">
  div
    //- Navbar
    navBar(
      v-on:toggleCreatePost="toggleCreatePost()")

    b-col.col-12.p-0

      //- Posts
      postsHome(
        :formValidation="formValidation"
        :showForm="showForm"
        @hideForm="toggleCreatePost()"
      )
</template>

<script>

export default {
  data () {
    return {
      showForm: false,

      formValidation: {
        titleLimit: 140,
        charLimit: 300,
        commentLimit: 160,
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
    createPost: () => import('../components/createPost')
  },
  methods: {
    toggleCreatePost () {
      this.showForm = !this.showForm
    }
  }
}
</script>
<style scoped lang="scss">
</style>
