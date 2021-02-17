<template lang="pug">
  b-row
    button#show-link-form.post-navigation-button(
    @click="toggleLinkForm"
    )
      img#post-nav-icon(v-bind:src="imgStore[5]" width="640" height="360")
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

        b-row.justify-content-end.mb-2
          button#submit-link.neu-b-button.m-0.mt-2.mr-3(
            type="submit"
            variant="primary"
          ) Add Link

    b-col.col-12.comments-section.mt-2.mb-4(v-for="link in postList.linkStore" :key="link.id")
      linkContent(
        :link="link"
        :post="post"
        :userProfile="userProfile"
        :links="postList.linkStore"
      )
</template>
<script>
import { linksCollection } from '../../../../firebase'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'link-box',
  props: ['post', 'show', 'postList'],
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
      'userProfile',
      'imgStore'
    ])
  },
  methods: {
    ...mapActions([
      'createLink',
      'deleteLink'
    ]),
    toggleLinkForm () {
      this.show = !this.show
    },

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

    async createLink (link) {
      await linksCollection.add({
        linkText: link.linkText,
        linkURL: link.linkURL,
        userName: link.userName,
        reference: link.reference
      })
      this.postList.linkStore.push(link)
    },

    redirect (link) {
      window.location.href = `https://${link.linkURL}`
    },

    remove (link) {
      this.deleteLink(link)
    }
  },
  components: {
    linkContent: () => import('./linkComponent')
  }
}
</script>
<style scoped lang="scss">
</style>
