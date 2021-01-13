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
@import url('https://fonts.googleapis.com/css?family=Playfair+Display|Raleway&display=swap');
body {
  background-color: $sky-pink;
  margin-left: auto;
  margin-right: auto;
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
