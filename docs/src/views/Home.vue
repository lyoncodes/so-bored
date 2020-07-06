<template lang="pug">
  .home.mt-5
    h5.headline Styles & Docs
    ruleForm
    //- adobeAPI
</template>

<script>
import ruleForm from '../components/ruleForm'
import navBar from '../components/navBar'
// import adobeAPI from '../components/fetches/adobeCC'

export default {
  name: 'Home',
  components: {
    navBar,
    ruleForm
    // adobeAPI
  }
}
</script>
<style scoped lang="scss">

</style>
