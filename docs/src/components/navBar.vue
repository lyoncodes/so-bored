<template lang="pug">
#nav
  b-col.col-12
    b-row
      b-col.col-2.mt-4.pt-2
        a.link-style-main(@click="logout()") logout
      b-col.mb-1.mt-3
        img.nav-logo(v-bind:src="imgFolder[3]")
      b-col.col-2.mt-3.p-0
        button.nav-icon-button.p-0(
        @click="toggleForm")
          img#add-post-icon(v-bind:src="imgFolder[5]")
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'navigation',
  data () {
    return {
      showCardForm: false
    }
  },
  methods: {
    ...mapActions([
      'logout'
    ]),
    toggleForm () {
      this.showCardForm = !this.showCardForm
      this.$emit('togglePostForm', this.showCardForm)
    }
  },
  computed: {
    ...mapState([
      'imgFolder'
    ])
  }
}
</script>
<style scoped lang="scss">
  #nav {
    @extend %nav;
    @extend %body-fonts;
    @extend %forms;
    @extend %posts;
    .selected {
      background: $border-g !important;
      color: white!important;
      -webkit-box-shadow:  $box-shadow-dark;
      -moz-box-shadow:  $box-shadow-dark;
      box-shadow:  $box-shadow-dark;
    }
  }
</style>
