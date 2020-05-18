<template lang="pug">
  h1 {{card.title}}
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
  },
  mounted () {
    const card = this.Cards
    this.card = card
  }
}
</script>
<style scoped>

</style>
