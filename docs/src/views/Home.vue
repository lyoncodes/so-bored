<template lang="pug">
  .home.mt-5
    img.header-img(src="../assets/unearth-slate.svg")
    h5.headline Styles & Docs
    ruleForm
    //- adobeAPI
</template>

<script>
import ruleForm from '../components/ruleForm'
// import adobeAPI from '../components/fetches/adobeCC'

export default {
  name: 'Home',
  components: {
    ruleForm
    // adobeAPI
  }
}
</script>
<style scoped lang="scss">

</style>
