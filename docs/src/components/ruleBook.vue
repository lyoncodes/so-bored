<template lang="pug">
  b-container
    ruleIDX
    ruleCard(
      :validation="formChar"
    )
</template>

<script>
import ruleCard from '../components/ruleCard'
import ruleIDX from '../components/ruleIDX'
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
    ruleIDX
  }
}
</script>
<style scoped>

</style>
