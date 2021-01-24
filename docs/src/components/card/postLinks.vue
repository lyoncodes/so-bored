<template lang="pug">
  b-row
    b-col.col-12.p-0(v-if="show")
      b-form(
        @submit.prevent="submitLink(linkData)"
        v-if="show")
        b-form-textarea.mb-2(
          autofocus
          id="link-text-area"
          v-model="linkData.ref"
          placeholder="link text"
        )
        b-form-textarea(
          id="link-text-area"
          v-model="linkData.url"
          placeholder="https://"
          @keydown.enter.prevent="submitLink(linkData)"
        )
        b-row.justify-content-end.mt-2
          button#submit-annotation.m-0.mr-3(
            type="submit" variant="primary")
            img#add-link-icon.inline-card-icon(v-bind:src="imgFolder[5]")
    b-col.col-12.comments-section.mt-2.mb-4(v-for="link in post.links")
      b-row.comments-container.text-left
        b-col.col-11.p-0
          p.caption.pl-2.pt-2.mb-1 {{ link.author }} linked:
          p.comment-text.link-style-main.pl-3.pt-1(@click="redirect(link)") {{link.ref}}
        b-col.col-1.p-0
          button.link-button(
            @click="handleDelete(link)"
            v-if="userProfile.username===link.author") delete
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'link-box',
  props: ['post', 'show'],
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
      'posts',
      'userProfile',
      'imgFolder'
    ])
  },
  methods: {
    ...mapActions([
      'createLink',
      'deleteLink'
    ]),
    submitLink (linkData) {
      const id = this.$props.post.id
      const linkSerial = this.serialMaker()
      const author = this.userProfile.username
      const { ref, url } = this.linkData
      const linkPayload = {
        ref,
        url,
        author,
        id,
        linkSerial
      }
      if (this.linkData.ref.length && this.linkData.url.length) {
        this.createLink(linkPayload)
      }
      this.linkData = {
        ref: '',
        url: ''
      }
      // this.$emit('toggleLinkForm')
    },
    redirect (link) {
      window.location.href = `https://${link.url}`
    },
    handleDelete (link) {
      this.deleteLink(link)
    },
    serialMaker () {
      const rando = Math.floor(Math.random() * 1000)
      return Math.floor(Math.random() * rando)
    }
  },
  mounted () {
    const user = this.userProfile
    this.user = user
  }
}
</script>
<style scoped lang="scss">
</style>
