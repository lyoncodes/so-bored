<template lang="pug">
b-container#nav
  b-row
    b-col.col-4.mt-1.pt-3.pl-0

      a.link-style-main(@click="logout()") logout
    b-col.col-4.p-0
      IconBase#main-logo(
        icon-name="Comment"
        height="60"
        width="60"
      )
        IconLogo
    b-col.col-4.mt-3.pr-0

      button.action-button-sm.p-2(@click="toggleCreatePost") New Chat
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'navigation',
  components: {
    IconBase: () => import('./IconBase'),
    IconLogo: () => import('./icons/IconLogo')
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
      this.$store.commit('showPostForm')
    }
  }
}
</script>
<style scoped lang="scss">
</style>
