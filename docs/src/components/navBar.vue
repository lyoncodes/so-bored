<template lang="pug">
#nav
  b-col.col-12
    b-row
      b-col.col-2.mt-4
        a.login-menu-link(@click="logout()") logout
      b-col.mb-1.mt-2
        img.main-icon(src='../assets/tellTales.svg')
      b-col.col-2.mt-3.p-0
        button.link-button-icon.p-0(
        @click="toggleCardForm")
          img#add-post-red(src='../assets/add-post-red.svg')
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'navBar',
  data () {
    return {
      showCardForm: false
    }
  },
  methods: {
    ...mapActions([
      'logout'
    ]),
    ...mapState([
      'userProfile'
    ]),
    toggleCardForm () {
      this.showCardForm = !this.showCardForm
      this.$emit('togglePostForm', this.showCardForm)
    }
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
