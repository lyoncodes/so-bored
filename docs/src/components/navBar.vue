<template lang="pug">
#nav
  b-row
    b-col.col-3
      img.nav-img(src='../assets/unearth-slate.svg')
    b-col.col-6
      router-link(to="/")  Home
      router-link(to="/Menu")  Menu
    b-col.col-3
      a(
        @click="logout()"
      ) logout
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
    .toggled {
      color: $indigo
    }
  }
</style>
