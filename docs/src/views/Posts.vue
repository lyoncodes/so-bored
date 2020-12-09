<template lang="pug">
  div
    navBar(v-on:togglePostForm="showPostForm($event)")
    b-container(fluid="sm")
      img.bg-img(v-bind:src="imgFolder[0]")
      b-col.col-12.col-lg-4
        #post-form.pb-5
          postForm(v-if="togglePostForm")
      b-col.col-12.mt-5.p-0
        #posts.pb-5
          postCollection
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
      this.togglePostForm = val ? !this.togglePostForm : null
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
</style>
