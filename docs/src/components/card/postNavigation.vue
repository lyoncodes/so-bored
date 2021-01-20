<template lang="pug">
  b-row.mb-2
    //- handle update post data & cancel form update
    b-button.icon-button(@click="toggleUpdateForm(post)")
      img.inline-card-icon(src='../../assets/editPencil.svg')
    //- sets post.active & displays comment component
    b-button.icon-button(@click="toggleCommentComponent(post)"
    :disabled="post.updating")
      img#show-more(src='../../assets/comment.svg')
      span.caption.pl-1 {{post.comments.length}}
    //- sets post.showLinks & displays link component
    b-button.icon-button(@click="toggleLinkForm(post)"
    :disabled="post.updating")
      img#show-more(src='../../assets/link.svg')
      span.caption.pl-1 {{post.links.length}}
</template>
<script>
import { mapActions } from 'vuex'
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
  }
}
</script>
<style scoped lang="scss">

</style>
