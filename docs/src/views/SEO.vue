<template>
  <div id="menu">
    <menuGrid />
  </div>
</template>

<script>
import menuGrid from '../components/menuGrid'
export default {
  data () {
    return {
      menu: {},
      card: {}
    }
  },
  components: {
    menuGrid
  }
}
</script>
<style scoped>

</style>
