<template lang="pug">
#nav
  b-col.col-12
    b-row
      b-col.col-4.mt-4
        a.login-menu-link(@click="logout()") logout
      b-col.col-4.mb-1.mt-2
        img.main-icon(src='../assets/main-logo.svg')
      b-col.col-4.mt-1
        button.neu-c-button(
        @click="toggleCardForm")
          span {{ buttonText.toggleMsg }}
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'navBar',
  data () {
    return {
      buttonText: {
        toggleMsg: 'New Post'
      },
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
