<template lang="pug">
  .home
    img(src="../assets/unearth-slate.svg")
    h1.heading Documents
    ruleForm
    adobeAPI
</template>

<script>
import ruleForm from '../components/ruleForm'
import adobeAPI from '../components/fetches/adobeCC'

export default {
  name: 'Home',
  components: {
    ruleForm,
    adobeAPI
  }
}
</script>
<style scoped lang="scss">

</style>
