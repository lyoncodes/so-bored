<template lang="pug">
  //- Post Container
  b-container.card-container.p-0
    //- Array Iteration (post in posts, mounted() from 'posts' in state object)
    b-col.post.col-12.ml-0(v-for="post in posts" :key="post.title")
      post(
        :post="post"
        :userProfile="userProfile"
      )
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'posts',
  props: ['postList'],
  data () {
    return {
    }
  },
  components: {
    post: () => import('../components/post/postComponent')
  },
  computed: {
    ...mapState([
      'posts',
      'userProfile'
    ])
  },
  methods: {
    ...mapActions([
      'updatePost',
      'deletePost'
    ]),
    // Delete Post
    handleDelete (post) {
      this.deletePost(post)
    },
    // Resets postList.postUpdateData
    clearForm (post) {
      this.postList.postUpdateData = {
        title: '',
        text: '',
        updating: false
      }
      this.$emit('resetForm')
    },
    // Assigns postList.postUpdateData to validation prop
    validateCharCount () {
      this.postList.formCounter.charCount = this.postList.postUpdateData.text.length
      this.postList.formCounter.titleCount = this.postList.postUpdateData.title.length
      this.postList.isError = this.postList.postUpdateData.text.length > this.postList.formValidation.charLimit || this.postList.postUpdateData.title.length > this.postList.formValidation.titleLimit ? true : null
    },
    // Redirects links to URL
    redirect (link) {
      window.location.href = `${link.url}`
    }
  },
  mounted () {
    const post = this.posts
    this.post = post
  }

}
</script>
<style scoped lang="scss">
.titleError, .textError {
  color: $candy-red;
}
</style>
