<template lang="pug">
  b-row.mb-2.mt-3.pt-2.pb-2

    //- handle update post data & cancel form update
    button.square-pad-button.pt-1(
      v-if="user === post.userName"
      @click="toggleUpdateForm(post)"
    )
      IconBase(
        icon-name="edit"
      )
        IconEdit

    //- sets postList.displayComments & displays comment component
    button.square-pad-button(
      @click="toggleCommentComponent(post)"
      :disabled="postList.updating"
    )
      IconBase(
        icon-name="comment"
        height="18"
        width="18"
      )
        IconComment
      span.caption.pl-1.pr-1 {{postComments.length}}

    //- sets postList.showLinks & displays link component
    button.square-pad-button(
      @click="toggleLinkForm(post)"
      :disabled="postList.updating"
    )
      IconBase(
        icon-name="link"
        height="20"
        width="20"
      )
        IconLink
      span.caption.pl-1.pr-1 {{postLinks.length}}
</template>
<script>
export default {
  name: 'postNav',
  props: ['post', 'user', 'postList', 'postComments', 'postLinks'],
  components: {
    IconBase: () => import('../IconBase'),
    IconEdit: () => import('../icons/IconEdit'),
    IconComment: () => import('../icons/IconComment'),
    IconLink: () => import('../icons/IconLink')
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
