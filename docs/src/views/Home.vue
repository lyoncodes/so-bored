<template lang="pug">
  .home.mt-5
    h5.headline
    postForm
    //- adobeAPI
</template>

<script>
import postForm from '../components/postForm'
import navBar from '../components/navBar'
// import adobeAPI from '../components/fetches/adobeCC'

export default {
  name: 'Home',
  components: {
    navBar,
    postForm
    // adobeAPI
  }
}
</script>
<style scoped lang="scss">

</style>
