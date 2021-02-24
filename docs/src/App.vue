<template lang="pug">
  #app
    <router-view />
</template>

<script>
import navBar from '../src/components/navBar.vue'
import { mapState } from 'vuex'
export default {
  components: {
    navBar
  },
  computed: {
    ...mapState([
      'userProfile'
    ]),
    showNav () {
      return Object.keys(this.userProfile).length > 1
    }
  }
}
</script>
<style lang="scss">
body {
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
}
body::-webkit-scrollbar {
  display: none;
}
#app {
  @extend %nav;
  @extend %body-fonts;
  @extend %forms;
  @extend %posts;
}
</style>
