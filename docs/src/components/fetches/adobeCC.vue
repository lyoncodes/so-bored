<template lang="pug">
  b-container
    h1 API Test
    b-row
      b-col(md="4" v-for="data in adobeData" :key="data")
        p {{ data.name }}, {{ data.email }}
</template>
<script>
export default {
  data () {
    return {
      adobeData: []
    }
  },
  mounted () {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then((data) => {
        console.log(data)
        this.adobeData = data
      })
  }
}
</script>
<style scoped>

</style>
