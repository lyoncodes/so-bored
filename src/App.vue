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
