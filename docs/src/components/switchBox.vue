<template lang="pug">
  b-container
    switchRow
    cardUI
</template>

<script>
import cardUI from '../components/cardUI'
import switchRow from '../components/switchRow'
export default {
  name: 'switch-box',
  components: {
    cardUI,
    switchRow
  }
}
</script>
<style scoped>

</style>
