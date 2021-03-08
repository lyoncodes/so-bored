<template lang="pug">
b-col.col-12.p-0
  b-form(
    @submit.prevent="append()"
  )
    b-form-textarea.mb-2(
      autofocus
      id="link-text-area"
      v-model="link.linkText"
      placeholder="link title"
    )

    b-form-textarea(
      id="link-text-area"
      v-model="link.linkURL"
      placeholder="https://"
      @keydown.enter.prevent="append()"
    )

  b-row.justify-content-between.mb-2
    a.validation-char.mt-2.mb-0.ml-3(
      :class="errorObject"
    ) {{this.link.linkText.length}} / {{ validation.commentLimit}}

    button#submit-link.neu-b-button.m-0.mt-2.mr-3(
      type="submit"
      :disabled="this.link.linkText.length > this.validation.commentLimit"
    ) Add Link
</template>
<script>
import { linksCollection } from '../../../../firebase'
import { mapActions } from 'vuex'
export default {
  name: 'link-box',
  props: ['post', 'postList', 'validation'],
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
