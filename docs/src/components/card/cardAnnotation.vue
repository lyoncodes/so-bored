<template lang="pug">
  h1 test
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'card-label',
  computed: {
    ...mapState([
      'Cards',
      'pinnedCards'
    ])
  }
}
</script>
<style scoped>

</style>
