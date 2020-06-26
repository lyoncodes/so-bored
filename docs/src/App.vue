<template lang="pug">
  #app
    #nav
      b-row
        b-col.col-3.col-md-3
          img.nav-img(src="./assets/unearth-slate.svg")
        b-col.col-6.col-md-6
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
