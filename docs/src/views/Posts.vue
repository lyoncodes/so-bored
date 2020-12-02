<template lang="pug">
  div
    img.bg-img(v-bind:src="imgFolder[0]")
    b-col.col-12.col-lg-4
      #post-form.pb-5
        postForm
    b-col.col-12.mt-5
      #posts.pb-5
        postCollection
</template>

<script>
import postForm from '../components/postForm'
import postCollection from '../components/postCollection'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      glyphs: {},
      card: {}
    }
  },
  components: {
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
  top: 120;
  width: 100vw;
  z-index: -1000;
}
</style>
