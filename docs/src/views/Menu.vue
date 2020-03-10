<template>
  <div id="menu">
    <menuGrid />
    <cardGrid />
  </div>
</template>

<script>
import menuGrid from '../components/menuGrid'
import cardGrid from '../components/cardGrid'
export default {
  data () {
    return {
      menu: {},
      card: {}
    }
  },
  components: {
    menuGrid,
    cardGrid
  }
}
</script>
<style scoped>

</style>
