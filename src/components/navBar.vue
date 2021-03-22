<template lang="pug">
b-container#nav
  b-row
    b-col.col-4.mt-1.pt-4.pl-0

      a.link-style-main(@click="logout()") logout
    b-col.col-4.p-0
      IconBase#main-logo(
        icon-name="Comment"
        height="60"
        width="60"
      )
        IconLogo
    b-col.col-4.mt-2.pr-0

      button#toggle-post.neu-b-button(@click="toggleCreatePost")
        IconBase(
          icon-name="comment"
          height="20"
          width="20"
          iconColor="#fc38ac"
        )
          IconPost
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'navigation',
  components: {
    IconBase: () => import('./IconBase'),
    IconLogo: () => import('./icons/IconLogo'),
    IconPost: () => import('./icons/IconPost')
  },
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
</style>
