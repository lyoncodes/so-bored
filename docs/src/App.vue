<template lang="pug">
  #app
    #nav
      router-link(to="/")  Home |
      router-link(to="/Menu")  Menu |
    <router-view/>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Playfair+Display|Raleway&display=swap');
body::-webkit-scrollbar {
  display: none;
}
#app {
  @extend %body-fonts;
  @extend %text-areas;
  @extend %cards;
  .selected {
    background: $border-g !important;
    color: white!important;
    -webkit-box-shadow:  23px 7px 26px -12px rgba(0,0,0,0.75);
    -moz-box-shadow:  23px 7px 26px -12px rgba(0,0,0,0.75);
    box-shadow:  23px 7px 26px -12px rgba(0,0,0,0.75);
  }
  .toggled {
    color: $indigo
  }
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: $primary;
    }
  }
}
</style>
