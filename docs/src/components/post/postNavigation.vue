<template lang="pug">
  b-row.mb-2
    //- handle update post data & cancel form update
    button.icon-button.pr-1.pl-1.pb-3(@click="toggleUpdateForm(post)")
      img#post-nav-icon(v-bind:src="imgFolder[2]" width="640" height="360")
    //- sets postList.displayComments & displays comment component
    button.icon-button.pr-0(@click="toggleCommentComponent(post)"
    :disabled="postList.updating")
      img#post-nav-icon(v-bind:src="imgFolder[1]" width="640" height="360")
      span.caption.pl-1 {{post.comments.length}}
    //- sets postList.showLinks & displays link component
    button.icon-button(@click="toggleLinkForm(post)"
    :disabled="postList.updating")
      img#post-nav-icon(v-bind:src="imgFolder[3]" width="640" height="360")
      span.caption.pl-1 {{post.links.length}}
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'postNav',
  props: ['post', 'postList'],
  methods: {
    // Display / hide post editing form fields
    toggleUpdateForm (post) {
      this.postList.postUpdateData.title = post.title
      this.postList.postUpdateData.text = post.text
      this.postList.updating = !this.postList.updating
    },
    // Display / Hide post comments
    toggleCommentComponent (post) {
      this.postList.postData.displayComments = !this.postList.postData.displayComments
      this.postList.postData.displayLinks = false
    },
    // Display / Hide Link Section
    toggleLinkForm (post) {
      this.postList.postData.displayComments = false
      this.postList.postData.displayLinks = !this.postList.postData.displayLinks
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
