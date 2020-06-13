<template lang="pug">
  #app
    #nav
      router-link(to="/")  Home |
      router-link(to="/Menu")  Menu |
    <router-view/>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Playfair+Display|Raleway&display=swap');
#app {
  @extend %body-fonts;
  h3,h4,h5,h6 {
  color: $neon;
  }
  .heading {
    background: $border-g;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  button{
    background: none;
    border: 5px solid;
    border-image-slice: 1;
    border-width: 5px;
    border-image-source: $border-g;
    box-shadow: none;
    color: $indigo;
    font-size: .75em;
    margin: .25em;
    outline: none;
    padding: .75em 1em;
    transition: color 0.3s ease;
    &:active, :focus{
      box-shadow: none;
      outline: none;
    }
    &:focus{
      box-shadow: none;
    }
  }
  .selected {
    background: $border-g !important;
    color: white!important;
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
