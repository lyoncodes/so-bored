<template lang="pug">
  b-row
    b-col.col-12.p-0(v-if="show")
      b-form(
        @submit.prevent="append(linkData)"
        v-if="show")
        b-form-textarea.mb-2(
          autofocus
          id="link-text-area"
          v-model="linkData.linkText"
          placeholder="link text"
        )
        b-form-textarea(
          id="link-text-area"
          v-model="linkData.linkURL"
          placeholder="https://"
          @keydown.enter.prevent="append(linkData)"
        )
        b-row.justify-content-end.mt-2
          button#submit-annotation.m-0.mr-3(
            type="submit" variant="primary")
            img#add-link-icon.inline-card-icon(v-bind:src="imgStore[5]" width="640" height="360")
    b-col.col-12.comments-section.mt-2.mb-4(v-for="link in post.links")
      linkEl(
        :link="link"
        :post="post"
        :userProfile="userProfile"
      )
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'link-box',
  props: ['post', 'show'],
  data () {
    return {
      linkData: {
        linkText: '',
        linkURL: ''
      }
    }
  },
  computed: {
    ...mapState([
      'posts',
      'userProfile',
      'imgStore'
    ])
  },
  methods: {
    ...mapActions([
      'createLink',
      'deleteLink'
    ]),
    append (linkData) {
      const reference = this.$props.post.id
      const userName = this.userProfile.username
      const { linkText, linkURL } = this.linkData
      const linkPayload = {
        linkText,
        linkURL,
        userName,
        reference
      }
      if (this.linkData.linkText.length && this.linkData.linkURL.length) {
        this.createLink(linkPayload)
      }
      this.linkData = {
        linkText: '',
        linkURL: ''
      }
    },
    redirect (link) {
      window.location.href = `https://${link.linkURL}`
    },
    remove (link) {
      this.deleteLink(link)
    }
  },
  components: {
    linkEl: () => import('../post/linkComponent')
  }
}
</script>
<style scoped lang="scss">
</style>
