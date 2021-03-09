<template lang="pug">
b-col.col-12.p-0
  b-form(
    inline
    @submit.prevent="append()"
  )
    b-form-textarea.mb-2(
      autofocus
      id="link-textarea"
      v-model="link.linkText"
      placeholder="link title"
    )

    b-form-textarea(
      @keydown.enter.prevent="append()"
      id="link-textarea"
      v-model="link.linkURL"
      placeholder="https://"
    )
    button#create-link.post-navigation-button(
      type="submit"
      :disabled="this.link.linkText.length > this.validation.commentLimit"
    )
      IconBase(
        icon-name="link"
        height="19"
        width="19"
      )
        IconLink

  b-row.justify-content-between.mb-2
    a.validation-char.mt-2.mb-0.ml-3(
      :class="errorObject"
    ) {{this.link.linkText.length}} / {{ validation.commentLimit}}

</template>
<script>
import { linksCollection } from '../../../../firebase'
import { mapActions } from 'vuex'
export default {
  name: 'link-box',
  props: ['post', 'postList', 'validation'],
  components: {
    IconBase: () => import('../../IconBase'),
    IconLink: () => import('../../icons/IconLink'),
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
