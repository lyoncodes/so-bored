<template lang="pug">
  b-container
    ruleTabs
    ruleCard
</template>

<script>
import ruleCard from '../components/ruleCard'
import ruleTabs from '../components/ruleTabs'
export default {
  name: 'rule-book',
  components: {
    ruleCard,
    ruleTabs
  }
}
</script>
<style scoped>

</style>
