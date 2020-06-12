<template lang="pug">
  b-container
    b-form-group(id="rule-filter")
      b-button(
        id="filter-button"
        v-for="(select, idx) in Menu"
        :key="idx"
        @click="handleFilter(select.type)"
        variant="light"
      ) {{ select.type }}
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState([
      'Cards',
      'Menu',
      'pinnedCards'
    ])
  },
  methods: {
    ...mapActions([
      'filterAction'
    ]),
    handleFilter (id) {
      console.log(id)
      this.filterAction(id)
    }
  },
  mounted () {
    const menu = this.Menu
    this.menu = menu
  }
}
</script>
<style scoped lang="scss">

</style>
