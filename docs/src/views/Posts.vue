<template lang="pug">
  b-row
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
  }
}
</script>
<style scoped lang="scss">
</style>
