<template lang="pug">
  #app
    #nav
      router-link(to="/")  Home |
      router-link(to="/Menu")  Menu |
    <router-view/>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Playfair+Display|Raleway&display=swap');
body {
  // overflow: hidden;
}
#app {
  @extend %body-fonts;
  h3,h4,h5,h6 {
  color: $neon;
  }
  button {
    background: none;
    border: none;
    -webkit-box-shadow:  23px 7px 26px -12px rgba(0,0,0,0.75);
    -moz-box-shadow:  23px 7px 26px -12px rgba(0,0,0,0.75);
    box-shadow:  23px 7px 26px -12px rgba(0,0,0,0.75);
    color: $indigo;
    font-size: .85em;
    font-weight: 600;
    margin: .25em;
    outline: none;
    padding: .75em 1em;
    transition: color 0.3s ease;
    &:active, :focus{
      outline: none;
    }
  }
  textarea, input, .form-control {
    color: $indigo;
    font-size: 1.75em;
    border: 1px solid $neon;
    border-top: none;
    border-right: none;
    border-left: none;
    height: 2em;
    resize: none;
  }
  .card {
    border: 0;
    -webkit-box-shadow: 10px 10px 24px -10px rgba(0,0,0,0.75);
    -moz-box-shadow: 10px 10px 24px -10px rgba(0,0,0,0.75);
    box-shadow: 10px 10px 24px -10px rgba(0,0,0,0.75);
    margin: 1em 0 1em;
  }
    .card-icon {
      height: 2em;
    }

  .heading {
    background: $border-g;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
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
