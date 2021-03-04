<template lang="pug">
  b-row.mb-2.mt-3.pt-2.pb-2

    //- handle update post data & cancel form update
    button.post-navigation-button(
      v-if="this.userProfile.username === post.userName"
      @click="toggleUpdateForm(post)"
    )
      IconBase#update-post-icon(
        icon-name="edit"
      )
        IconEdit

    //- sets postList.displayComments & displays comment component
    button.post-navigation-button(
      @click="toggleCommentComponent(post)"
      :disabled="postList.updating"
    )
      IconBase(
        icon-name="comment"
        height="20"
        width="20"
      )
        IconChat
      span.caption.pl-1.pr-1 {{postList.commentStore.length}}

    //- sets postList.showLinks & displays link component
    button.post-navigation-button(@click="toggleLinkForm(post)"
    :disabled="postList.updating")
      IconBase(
        icon-name="link"
        height="20"
        width="20"
      )
        IconLink
      span.caption.pl-1.pr-1 {{postList.linkStore.length}}
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'postNav',
  props: ['post', 'postList'],
  components: {
    IconBase: () => import('../IconBase'),
    IconEdit: () => import('../icons/IconEdit'),
    IconChat: () => import('../icons/IconChat'),
    IconLink: () => import('../icons/IconLink')
  },
  computed: {
    ...mapState([
      'userProfile'
    ])
  },
  methods: {
    // Display / hide post editing form fields
    toggleUpdateForm (post) {
      this.postList.postUpdateData.title = post.title
      this.postList.postUpdateData.text = post.text
      this.postList.updating = !this.postList.updating
    },
    // Display / Hide post comments
    toggleCommentComponent (post) {
      this.postList.displayComments = !this.postList.displayComments
      this.postList.displayCommentForm = true
      this.postList.displayLinks = false
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
