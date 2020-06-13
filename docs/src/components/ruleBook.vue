<template lang="pug">
  b-container
    ruleIDX
    //- ruleFilter
    ruleCard(
      :validation="formChar"
    )
</template>

<script>
import ruleCard from '../components/ruleCard'
import ruleIDX from '../components/ruleIDX'
import ruleFilter from '../components/ruleFilter'

export default {
  name: 'rule-book',
  data () {
    return {
      formChar: {
        titleCount: 0,
        titleLimit: 20,
        charCount: 0,
        charLimit: 300,
        errorMsg: String
      }
    }
  },
  components: {
    ruleCard,
    ruleIDX,
    ruleFilter
  }
}
</script>
<style scoped>

</style>
