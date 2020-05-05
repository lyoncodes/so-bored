<template lang="pug">
  #menu
    switchBox
</template>

<script>
import switchBox from '../components/switchBox'
export default {
  data () {
    return {
      menu: {},
      card: {}
    }
  },
  components: {
    switchBox
  }
}
</script>
<style scoped lang="scss">

</style>
