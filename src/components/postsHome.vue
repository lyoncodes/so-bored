<template lang="pug">
  //- Post Container
  b-container
    //- new post form (CREATE)
    createPost(
      :formValidation="formValidation"
      v-if="showCreatePost"
      @hideCreatePost="toggleCreatePost()"
    )
    //- Array Iteration (post in posts, mounted() from 'posts' in state object)
    b-col.post.col-12.ml-0(v-for="post in posts" :key="post.id")

      postComponent(
        :post="post"
        :formValidation="formValidation"
      )
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'posts',
  props: ['formValidation', 'showCreatePost'],
  components: {
    postComponent: () => import('../components/post/postComponent'),
    createPost: () => import('../components/createPost')
  },
  computed: {
    ...mapState([
      'posts'
    ])
  },
  methods: {
    toggleCreatePost () {
      this.showCreatePost = !this.showCreatePost
    }
  }
}
</script>
<style scoped lang="scss">
</style>
