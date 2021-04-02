<template lang="pug">
b-col.col-12.p-0.mt-2
  b-form(
    @submit.prevent="append"
  )
    b-form-textarea.inline-input(
      autofocus
      v-model="link.linkText"
      placeholder="link title"
    )

    b-form-textarea.inline-input.mt-1(
      @keydown.enter.prevent="append()"
      v-model="link.linkURL"
      placeholder="https://"
    )

    b-row.justify-content-between
      a.validation-char.mt-1(
        :class="errorObject"
      ) {{this.link.linkText.length}} / {{ validation.commentLimit}}
      button.pill-button.mr-3(
        type="submit"
        :disabled="this.link.linkText.length > this.validation.commentLimit"
      ) Link

</template>
<script>
import { linksCollection } from '../../../../firebase'
import { mapActions } from 'vuex'
export default {
  name: 'link-box',
  props: ['validation'],
  components: {
    postLinks: () => import('./postLinks')
  },
  data () {
    return {
      link: {
        linkText: '',
        linkURL: ''
      }
    }
  },
  computed: {
    errorObject: function () {
      return {
        error: this.link.linkText.length > this.validation.commentLimit ? true : null
      }
    }
  },
  methods: {
    ...mapActions([
      'createLink'
    ]),

    append () {
      const createdOn = new Date()
      const { linkText, linkURL } = this.link
      const linkData = {
        createdOn,
        linkText,
        linkURL
      }
      if (this.link.linkText.length && this.link.linkURL.length) {
        this.$emit('append', { linkData })
      }
      this.link = {
        linkText: '',
        linkURL: ''
      }
    },

    async getLinkId (link) {
      const linksRef = await linksCollection.where('createdOn', '==', link.createdOn).get()
      linksRef.forEach((l) => {
        link.id = l.id
      })
    },

    redirect (link) {
      window.location.href = `https://${link.linkURL}`
    }
  }
}
</script>
<style scoped lang="scss">
</style>
