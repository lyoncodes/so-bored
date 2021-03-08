<template lang="pug">
#nav
  b-row.justify-content-between
    b-col.col-4.mt-1.pt-4.pl-0

      a.link-style-main(@click="logout()") logout
    b-col.col-4
      IconBase#main-logo(
        icon-name="Comment"
        height="60"
        width="60"
      )
        IconLogo
    b-col.col-4.mt-2.pr-0

      button#toggle-post.neu-c-button(@click="toggleCreatePost")
        IconBase(
          icon-name="comment"
          height="20"
          width="20"
        )
          IconComment
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'navigation',
  components: {
    IconBase: () => import('./IconBase'),
    IconLogo: () => import('./icons/IconLogo'),
    IconComment: () => import('./icons/IconComment')
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
