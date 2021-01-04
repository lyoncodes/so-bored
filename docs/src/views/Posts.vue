<template lang="pug">
  div(v-bind:class="{ blackout: togglePostForm }")
    navBar(v-on:togglePostForm="showPostForm($event)")
    b-container(fluid="sm")
      img.bg-img(v-bind:src="imgFolder[0]")
      b-col.col-12.p-0
        #post-form
          postForm(v-if="togglePostForm"
          v-on:formSubmitted="resetButton()")
      b-col.col-12.mt-5.p-0
        #posts.pb-5
          postCollection(v-bind:class="{ hide: togglePostForm }")
</template>

<script>
import navBar from '../components/navBar'
import postForm from '../components/postForm'
import postCollection from '../components/postCollection'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      glyphs: {},
      card: {},
      togglePostForm: false
    }
  },
  methods: {
    showPostForm (val) {
      this.togglePostForm = !this.togglePostForm
    },
    resetButton () {
      this.togglePostForm = false
    }
  },
  components: {
    navBar,
    postForm,
    postCollection
  },
  computed: {
    ...mapState([
      'imgFolder'
    ])
  }
}
</script>
<style scoped lang="scss">
.bg-img{
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  z-index: -1000;
}
.blackout{
  height: 100vh;
}
.hide{
  display: none;
}
</style>
