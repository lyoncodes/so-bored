<template lang="pug">
  #app
    #nav
      router-link(to="/")  Home
      router-link(to="/Menu")  Menu
    <router-view/>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Playfair+Display|Raleway&display=swap');
body::-webkit-scrollbar {
  display: none;
}
#app {
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
