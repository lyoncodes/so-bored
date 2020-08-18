<template lang="pug">
  #rules
    ruleForm
    ruleBook
</template>

<script>
import ruleForm from '../components/ruleForm'
import ruleBook from '../components/ruleBook'
export default {
  data () {
    return {
      glyphs: {},
      card: {}
    }
  },
  components: {
    ruleForm,
    ruleBook
  }
}
</script>
<style scoped lang="scss">

</style>
