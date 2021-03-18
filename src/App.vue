<template lang="pug">
  #app
    <router-view />
</template>

<script>
export default {
}
</script>
<style lang="scss">
body {
  background-color: $lavender-cloud;
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
  overflow-x: hidden;
}
html::-webkit-scrollbar, body::-webkit-scrollbar {
  display: none;
}
#app {
  @extend %nav;
  @extend %body-fonts;
  @extend %forms;
  @extend %posts;
}
</style>
