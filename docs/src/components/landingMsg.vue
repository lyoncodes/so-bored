<template lang="pug">
  b-col.text-center.col-lg-6.mt-5
    b-row.pb-2.justify-content-center
      h5 hello {{userProfile.username}}!
    b-row.justify-content-center
      span.caption Click
      span
        img.inline-card-icon.pl-1.pr-1.pb-2(v-bind:src="imgStore[5]" width="640" height="360")
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
