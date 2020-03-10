<template>
  <b-container>
    <b-container class="menu-row">
      <b-row>
        <template v-for="menu in Menu">
          <b-col md="3" :key="menu">
            <a href="#">{{ menu.text }}</a>
          </b-col>
        </template>
      </b-row>
    </b-container>
    <cardGrid />
  </b-container>
</template>

<script>
import { mapState } from 'vuex'
import cardGrid from './cardGrid.vue'
export default {
  data () {
    return {
      menu: {},
      card: {}
    }
  },
  components: {
    cardGrid
  },
  computed: {
    ...mapState([
      'Menu',
      'Cards'
    ])
  },
  mounted () {
    const menu = this.Menu
    this.menu = menu
    const card = this.Card
    this.card = card
  }
}
</script>
<style scoped>

</style>
