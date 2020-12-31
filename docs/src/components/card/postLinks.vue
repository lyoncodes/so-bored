<template lang="pug">
  b-row.justify-content-center
    b-col.col-12.p-0
      b-col.col-12.mt-2.comments-section(v-for="link in rule.links")
        b-row.links-container
          b-col.col-10.col-lg-11.p-0
            p.caption.pl-2.pt-2.mb-1 {{ link.author }} linked:
            a.comment-text.pl-4.pt-1(@click="redirect(link)") {{link.ref}}
          b-col.col-1.p-0.mb-1
            button.mb-1.link-button(
              @click="handleDelete(link)")
              img.card-icon-sm(src="../../assets/delete.svg")
    b-col.col-12.mt-4.p-0(v-if="show")
      b-form(
        @submit.prevent="submitLink(linkData)"
        v-if="show")
        b-form-textarea.mb-2(
          id="link-text-area"
          v-model="linkData.ref"
          placeholder="link text"
        )
        b-form-textarea(
          id="link-text-area"
          v-model="linkData.url"
          placeholder="url"
        )
        b-row.justify-content-end.mt-2
          button#submit-annotation.neu-c-button.m-0.mr-3(type="submit" variant="primary") Add Link
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'link-box',
  props: ['rule', 'show'],
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
      'rules',
      'userProfile'
    ])
  },
  methods: {
    ...mapActions([
      'attachLink',
      'mother'
    ]),
    submitLink (linkData) {
      const id = this.$props.rule.id
      const author = this.userProfile.username
      const { ref, url } = this.linkData
      const payload = 'addLink'
      const linkPayload = {
        ref,
        url,
        author,
        id,
        payload
      }
      if (this.linkData.ref.length && this.linkData.url.length) {
        this.attachLink(linkPayload)
      }
      this.linkData = {
        ref: '',
        url: ''
      }
    },
    redirect (link) {
      window.location.href = `https://${link.url}`
    },
    handleDelete (link) {
      this.mother(link)
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
