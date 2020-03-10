<template>
  <b-container class="menu-row">
    <b-row>
      <template v-for="menu in Menu">
        <b-col :key="menu">
          <a href="#">{{ menu.text }}</a>
        </b-col>
      </template>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      menu: {}
    }
  },
  computed: {
    ...mapState([
      'Menu'
    ])
  },
  mounted () {
    const menu = this.Menu
    this.menu = menu
  }
}
</script>
<style scoped>

</style>
