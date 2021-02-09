<template lang="pug">
  b-row.mb-2
    //- handle update post data & cancel form update
    button.icon-button.pr-1.pl-1.pb-3(@click="toggleUpdateForm(post)")
      img#post-nav-icon(v-bind:src="imgStore[2]" width="640" height="360")
    //- sets postList.displayComments & displays comment component
    button.icon-button.pr-0(@click="toggleCommentComponent(post)"
    :disabled="postList.updating")
      img#post-nav-icon(v-bind:src="imgStore[1]" width="640" height="360")
      span.caption.pl-1 {{postList.commentStore.length}}
    //- sets postList.showLinks & displays link component
    button.icon-button(@click="toggleLinkForm(post)"
    :disabled="postList.updating")
      img#post-nav-icon(v-bind:src="imgStore[3]" width="640" height="360")
      span.caption.pl-1 {{postList.linkStore.length}}
</template>
<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'postNav',
  props: ['post', 'postList'],
  computed: {
    ...mapState([
      'imgStore'
    ])
  },
  methods: {
    ...mapMutations([
      'selectPost',
      'deselectPost'
    ]),
    select (post) {
      if (this.postList.updating || this.postList.displayComments) {
        this.selectPost(post)
      } else this.deselectPost()
    },
    // Display / hide post editing form fields
    toggleUpdateForm (post) {
      this.postList.postUpdateData.title = post.title
      this.postList.postUpdateData.text = post.text
      this.postList.updating = !this.postList.updating
      this.select(post)
    },
    // Display / Hide post comments
    toggleCommentComponent (post) {
      this.postList.displayComments = !this.postList.displayComments
      this.postList.displayLinks = false
      this.select(post)
    },
    // Display / Hide Link Section
    toggleLinkForm (post) {
      this.postList.displayComments = false
      this.postList.displayLinks = !this.postList.displayLinks
    }
  }
}
</script>
<style scoped lang="scss">

</style>
