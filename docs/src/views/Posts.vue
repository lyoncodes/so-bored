<template lang="pug">
  b-row
    img.bg-img(v-bind:src="imgFolder[0]")
    b-col.col-4
      #post-form.pb-5
        postForm
    b-col.mt-5
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
  position: absolute;
  height: 110vh;
  z-index: 0;
}
</style>
