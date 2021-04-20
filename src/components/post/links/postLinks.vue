<template lang="pug">
b-row
  b-col.col-12.comments-section.mt-0(v-for="link in postLinks" :key="link.id")
    b-row.comment-container
      b-col.col-12.p-0.text-left

        span.caption.pl-2.pt-2.mb-0 {{ link.userName }} linked:
        p.main-text.link-style-main.pl-3.pt-1(@click="redirect(link)") {{link.linkText}}

        button.tab-button.square-pad-button(
          @click="remove(link)"
          v-if="userProfile.displayName === link.userName")
          IconBase(
            icon-name="delete"
            iconColor="rgb(252, 56, 172)"
          )
            IconDelete
  createLink(
    :validation="validation"
    @append="appendLink"
  )
</template>
<script>
import { linksCollection } from '../../../../firebase'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'link-box',
  props: ['post', 'postList', 'postLinks', 'validation'],
  components: {
    createLink: () => import('./createLink'),
    IconBase: () => import('../../IconBase'),
    IconDelete: () => import('../../icons/IconDelete')
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
    ])
  },
  methods: {
    ...mapActions([
      'createLink'
    ]),

    appendLink (link) {
      link.reference = this.$props.post.id
      link.createdOn = new Date()
      if (link.linkText.length && link.linkURL.length) {
        this.postLinks.push(link)
        this.createLink(link)
        this.getLinkId(link)
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
