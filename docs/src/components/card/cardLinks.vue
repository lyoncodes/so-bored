<template lang="pug">
  b-container(v-if="show")
    b-row
      b-col
        b-form(@submit.prevent="submitLink(linkData)")
          b-form-textarea(
            id="link-title"
            v-model="linkData.ref"
            placeholder="Enter Link Title"
          )
          b-form-textarea(
            id="link-url"
            v-model="linkData.url"
            placeholder="Link URL"
          )
          b-button.type-links(type="submit" variant="primary") Add Link
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'link-box',
  props: ['rule', 'show'],
  data () {
    return {
      linkData: {
        ref: '',
        url: ''
      }
    }
  },
  computed: {
    ...mapState([
      'rules'
    ])
  },
  methods: {
    ...mapActions([
      'attachLink'
    ]),
    submitLink (linkData) {
      const id = this.$props.rule.id
      const { ref, url } = this.linkData
      const linkPayload = {
        ref,
        url,
        id
      }
      if (this.linkData.ref.length && this.linkData.url.length) {
        this.attachLink(linkPayload)
      }
      this.linkData = {
        ref: '',
        url: ''
      }
    },
    redirect (link) {
      window.location.href = `https://${link.url}`
    }
  }
}
</script>
<style scoped lang="scss">

</style>
