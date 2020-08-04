<template lang="pug">
  b-row.justify-content-center
    b-form-group#input-type
      b-button.type-links(
        v-for="(select, idx) in Glyphs"
        :key="idx"
        @click="submitType(select.type)") {{select.type}}
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'glyphs',
  data () {
    return {
    }
  },
  computed: {
    ...mapState([
      'Glyphs'
    ])
  },
  methods: {
    submitType (type) {
      this.$emit('addtype', type)
    }
  }
}
</script>
<style scoped lang="scss">

</style>
