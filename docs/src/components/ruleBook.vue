<template lang="pug">
  b-container
    //- ruleFilter
    ruleCard(
      :validation="formChar"
    )
</template>

<script>
import ruleCard from '../components/ruleCard'
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
    ruleFilter
  }
}
</script>
<style scoped lang="scss">
.card-grid{
  margin-top: 2em;
}
</style>
