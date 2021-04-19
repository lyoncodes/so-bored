<template lang="pug">
  div

    b-col.col-12.p-0

      //- Posts
      postsHome(
        :formValidation="formValidation"
      )
</template>

<script>
export default {
  data () {
    return {

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
    TheNavbar: () => import('../components/TheNavbar'),
    postsHome: () => import('../components/postsHome')
  }
}
</script>
<style scoped lang="scss">
</style>
