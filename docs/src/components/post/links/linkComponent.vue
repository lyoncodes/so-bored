<template lang="pug">
b-row.comments-container.text-left

  b-col.col-11.p-0
    p.caption.pl-2.pt-2.mb-1 {{ link.userName }} linked:
    p.comment-text.link-style-main.pl-3.pt-1(@click="linkTo(link)") {{link.linkText}}

  b-col.col-1.p-0
    button#delete-link.neu-c-button(
      @click="remove(link)"
      v-if="userProfile.username===post.userName") delete
</template>
<script>
import { mapActions } from 'vuex'
import { linksCollection } from '../../../../firebase'
export default {
  name: 'linkComponent',
  props: ['post', 'links', 'link', 'userProfile'],
  methods: {
    ...mapActions([
      'deleteLink'
    ]),
    linkTo (link) {
      window.location.href = `https://${link.linkURL}`
    },
    async remove (link) {
      await linksCollection.doc(`${link.id}`).delete()
      const foundAt = this.links.findIndex(l => l === link)
      this.links.splice(foundAt, 1)
    }
  }
}
</script>
<style scoped lang="scss">
</style>
