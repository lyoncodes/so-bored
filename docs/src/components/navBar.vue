<template lang="pug">
#nav.col-12
  b-row
    b-col.col-2.mt-2.pt-2

      a.link-style-main(@click="logout()") logout

    b-col.mb-1.mt-3

      img#nav-logo(v-bind:src="imgStore[4]" width="640" height="360")

    b-col.col-2.mt-3.p-0

      button#toggle-post-button(@click="toggleCreatePost")
        img(v-bind:src="imgStore[5]" width="640" height="360")
</template>
<script>
import { mapActions, mapState } from 'vuex'
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
  },
  computed: {
    ...mapState([
      'imgStore'
    ])
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
