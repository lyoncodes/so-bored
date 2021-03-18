<template lang="pug">
b-row
  b-col.col-12.comments-section.mt-2(v-for="link in postLinks" :key="link.id")
    b-row.comment-container.text-left
      b-col.col-12.p-0
        span.caption.pl-2.pt-2.mb-0 {{ link.userName }} linked:
        p.post-text.link-style-main.pl-3.pt-1(@click="redirect(link)") {{link.linkText}}

        button#delete-comment.post-navigation-button(
          @click="remove(link)"
          v-if="user===link.userName")
          IconBase(
            icon-name="delete"
            iconColor="rgb(252, 56, 172)"
          )
            IconDelete
  createLink(
    :post="post"
    :postList="postList"
    :validation="validation"
    @append="appendLink"
  )
</template>
<script>
import { linksCollection } from '../../../../firebase'
import { mapActions } from 'vuex'
export default {
  name: 'link-box',
  props: ['post', 'postList', 'postLinks', 'user', 'validation'],
  components: {
    createLink: () => import('./createLink'),
    IconBase: () => import('../../IconBase'),
    IconDelete: () => import('../../icons/IconDelete'),
    IconCaret: () => import('../../icons/IconCaret')
  },
  async mounted () {
    const user = this.user
    this.user = user
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
    errorObject: function () {
      return {
        error: this.linkData.linkText.length > this.validation.commentLimit ? true : null
      }
    },
    flipThis: function () {
      return {
        flip: !this.postList.displayLinkForm
      }
    }
  },
  methods: {
    ...mapActions([
      'createLink'
    ]),

    appendLink (linkData) {
      const link = {
        ...linkData.linkData,
        reference: this.$props.post.id,
        userName: this.$props.user
      }
      if (link.linkText.length && link.linkURL.length) {
        this.postLinks.push(link)

        this.createLink(link)
        this.getLinkId(link)
      }
      this.linkData = {
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
    },

    async remove (link) {
      await linksCollection.doc(`${link.id}`).delete()
      const foundAt = this.postLinks.findIndex(l => l === link)
      this.postLinks.splice(foundAt, 1)
    }
  }
}
</script>
<style scoped lang="scss">
</style>
