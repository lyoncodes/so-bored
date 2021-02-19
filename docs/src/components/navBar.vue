<template lang="pug">
#nav.col-12
  b-row.justify-content-between
    b-col.col-2.mt-2.pt-2

      a.link-style-main(@click="logout()") logout

    b-col.col-4.mt-2.p-0

      button#toggle-post-button.neu-b-button(@click="toggleCreatePost") New Post
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'navigation',
  data () {
    return {
      showCreatePost: false
    }
  },
  methods: {
    ...mapActions([
      'logout'
    ]),
    toggleCreatePost () {
      this.showCreatePost = !this.showCreatePost
      this.$emit('toggleCreatePost', this.showCreatePost)
    }
  }
}
</script>
<style scoped lang="scss">
  #nav {
    @extend %nav;
    @extend %body-fonts;
    @extend %forms;
    @extend %posts
  }
</style>
