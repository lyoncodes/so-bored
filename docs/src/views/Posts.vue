<template lang="pug">
  #rules
    postForm
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
