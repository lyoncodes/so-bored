<template lang="pug">
  b-container
    switchRow
    cardGrid
</template>

<script>
import cardGrid from '../components/cardGrid'
import switchRow from '../components/switchRow'
export default {
  name: 'switch-box',
  components: {
    cardGrid,
    switchRow
  },
  mounted () {
    const card = this.Cards
    this.card = card
  }
}
</script>
<style scoped>

</style>
