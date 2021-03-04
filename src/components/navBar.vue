<template lang="pug">
#nav
  b-row.justify-content-between
    b-col.col-4.mt-1.pt-3.pl-0

      a.link-style-main(@click="logout()") logout
    b-col.col-4
    b-col.col-4.mt-2.pr-0

      button#toggle-post.neu-b-button(@click="toggleCreatePost")
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
