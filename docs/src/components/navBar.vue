<template lang="pug">
#nav
  b-col.col-12
    b-row
      b-col.col-4.mt-4
        a(@click="logout()") logout
      b-col.col-4.mb-1.mt-2
        img.main-icon(src='../assets/main-logo.svg')
      b-col.col-4.mt-1
        img.post-icon(src='../assets/post-flag.svg')
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'navBar',
  methods: {
    ...mapActions([
      'logout'
    ]),
    ...mapState([
      'userProfile'
    ])
  },
  mounted () {
    // const user = this.userProfile
    // this.user = user
  }
}
</script>
<style scoped lang="scss">
  #nav {
    @extend %nav;
    @extend %body-fonts;
    @extend %forms;
    @extend %cards;
    .selected {
      background: $border-g !important;
      color: white!important;
      -webkit-box-shadow:  $box-shadow-dark;
      -moz-box-shadow:  $box-shadow-dark;
      box-shadow:  $box-shadow-dark;
    }
  }
</style>
