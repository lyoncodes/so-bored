<template lang="pug">
  #menu
    ruleBook
</template>

<script>
import ruleBook from '../components/ruleBook'
export default {
  data () {
    return {
      menu: {},
      card: {}
    }
  },
  components: {
    ruleBook
  }
}
</script>
<style scoped lang="scss">

</style>
