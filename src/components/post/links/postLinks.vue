<template lang="pug">
  b-row
    button#show-comment-form.post-navigation-button(
      @click="toggleLinkForm"
    )
      IconBase(
        icon-name="caret"
        iconColor="rgba(130, 53, 242, 0.85)"
        :class="flipThis"
      )
        IconCaret

    b-col.col-12.p-0(v-if="show")

      b-form(
        @submit.prevent="appendLink()"
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
          @keydown.enter.prevent="appendLink()"
        )

        b-row.justify-content-between.mb-2
          a.validation-char.mt-2.mb-0.ml-3(
            :class="errorObject"
          ) {{this.linkData.linkText.length}} / {{ validation.commentLimit}}

          button#submit-link.neu-b-button.m-0.mt-2.mr-3(
            type="submit"
            :disabled="this.linkData.linkText.length > this.validation.commentLimit"
          ) Add Link

    b-col.col-12.comments-section.mt-2.mb-4(v-for="link in postList.linkStore" :key="link.id")
      linkComponent(
        :link="link"
        :links="postList.linkStore"
        :post="post"
        :userProfile="userProfile"
      )
</template>
<script>
import { linksCollection } from '../../../../firebase'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'link-box',
  props: ['post', 'postList', 'show', 'validation'],
  components: {
    linkComponent: () => import('./linkComponent'),
    IconBase: () => import('../../IconBase'),
    IconCaret: () => import('../../icons/IconCaret')
  },
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
      'userProfile'
    ]),
    flipThis: function () {
      return {
        flip: !this.show
      }
    },
    errorObject: function () {
      return {
        error: this.linkData.linkText.length > this.validation.commentLimit ? true : null
      }
    }
  },
  methods: {
    ...mapActions([
      'createLink'
    ]),
    toggleLinkForm () {
      this.show = !this.show
    },

    appendLink () {
      const createdOn = new Date()
      const reference = this.$props.post.id
      const userName = this.userProfile.username
      const { linkText, linkURL } = this.linkData
      const linkPayload = {
        createdOn,
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
        createdOn: link.createdOn,
        linkText: link.linkText,
        linkURL: link.linkURL,
        userName: link.userName,
        reference: link.reference
      })
      this.getLinkId(link)
    },

    async getLinkId (link) {
      const linksRef = await linksCollection.where('createdOn', '==', link.createdOn).get()
      linksRef.forEach((l) => {
        link.id = l.id
      })
      this.postList.linkStore.push(link)
    },

    redirect (link) {
      window.location.href = `https://${link.linkURL}`
    }
  }
}
</script>
<style scoped lang="scss">
</style>
