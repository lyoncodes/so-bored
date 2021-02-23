<template lang="pug">
  b-col.text-center.col-lg-6.mt-5

    b-row.pb-2.justify-content-center
      h5 hello {{userProfile.username}}!

    b-row.justify-content-center
      span.caption Click
      span
      span.caption to get started
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'landing-msg',
  data () {
    return {
      card: {},
      togglePostForm: false
    }
  },
  computed: {
    ...mapState([
      'userProfile',
      'imgStore'
    ])
  }
}
</script>
<style scoped lang="scss">
</style>
