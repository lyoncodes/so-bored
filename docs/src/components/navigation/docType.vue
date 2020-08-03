<template lang="pug">
b-container
  b-col
    b-form-group
      b-button.type-links(
        v-for="(select, idx) in Menu"
        v-model="formData.type"
        :key="idx"
        :class="{ selected: formData.type === select.type }"
        @click="submitType(select.type)"
      ) {{select.type}}
</template>
<script>
export default {
  computed: {
    ...mapState([
      'Menu'
    ])
  },
  methods: {
    submitType (type) {
      
    }
  }
}
</script>
<style scoped lang="scss">

</style>