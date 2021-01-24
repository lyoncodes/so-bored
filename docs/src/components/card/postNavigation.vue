<template lang="pug">
  b-row.mb-2
    //- handle update post data & cancel form update
    button.icon-button.pr-2(@click="toggleUpdateForm(post)")
      img.inline-card-icon(v-bind:src="imgFolder[1]")
    //- sets post.active & displays comment component
    button.icon-button(@click="toggleCommentComponent(post)"
    :disabled="post.updating")
      img#post-nav-icon(v-bind:src="imgFolder[4]")
      span.caption.pl-1 {{post.comments.length}}
    //- sets post.showLinks & displays link component
    button.icon-button(@click="toggleLinkForm(post)"
    :disabled="post.updating")
      img#post-nav-icon(v-bind:src="imgFolder[2]")
      span.caption.pl-1 {{post.links.length}}
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'postNav',
  props: ['post', 'updateData'],
  methods: {
    ...mapActions([
      'readPost',
      'togglePostComponents'
    ]),
    // Display / Hide post comments
    toggleCommentComponent (post) {
      post.active = !post.active
      post.displayLinks = false
      post.payload = 'toggleActive'
      this.readPost(post)
    },
    // Display / Hide Editing Fields
    toggleUpdateForm (post) {
      this.updateData.title = post.title
      this.updateData.text = post.text
      this.updateData.updating = !this.updateData.updating
      post.payload = 'togglePostEdit'
      this.togglePostComponents(post)
    },
    // Display / Hide Link Section
    toggleLinkForm (post) {
      post.active = false
      post.payload = 'toggleLinkForm'
      this.togglePostComponents(post)
    }
  },
  computed: {
    ...mapState([
      'imgFolder'
    ])
  }
}
</script>
<style scoped lang="scss">

</style>
