<template lang="pug">
  h1 {{rule.annotations[0]}}
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'card-label',
  props: ['rule'],
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
