<template lang="pug">
  b-container
    h1 API Test
    h1 {{ adobeData.title }}
    h1 {{ adobeData.userId }}
</template>
<script>
export default {
  data () {
    return {
      adobeData: []
    }
  },
  mounted () {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then((data) => {
        this.adobeData = data
      })
  }
}
</script>
<style scoped>

</style>
