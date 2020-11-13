<template lang="pug">
  b-container
    b-row.justify-content-center
      b-col.col-4(v-for="link in rule.links")
        a.links(@click="redirect(link)") {{link.ref}}
        b-button(@click="handleDelete(link)") Delete
          img.card-icon(src="../../assets/cancel.svg")
    b-row
      b-col
        b-form(
          @submit.prevent="submitLink(linkData)"
          v-if="show")
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
      'attachLink',
      'mother'
    ]),
    submitLink (linkData) {
      const id = this.$props.rule.id
      const { ref, url } = this.linkData
      const payload = 'addLink'
      const linkPayload = {
        ref,
        url,
        id,
        payload
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
    },
    handleDelete (link) {
      this.mother(link)
    }
  }
}
</script>
<style scoped lang="scss">

</style>
