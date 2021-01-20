<template lang="pug">
  input(type="file" @chanage="onFileSelected")
  button(@click="onUpload") upload
</template>
<script>
export default {
  data () {
    return {
      selectedFile: null
    }
  },
  methods: {
    onFileSelected (event) {
      this.selectedFile = event.target.files[0]
    },
    onUpload () {
    }
  }
}
</script>
<style scoped lang="scss">

</style>
