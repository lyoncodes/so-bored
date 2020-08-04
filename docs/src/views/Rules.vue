<template lang="pug">
  #rules
    ruleBook
</template>

<script>
import ruleBook from '../components/ruleBook'
export default {
  data () {
    return {
      glyphs: {},
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
