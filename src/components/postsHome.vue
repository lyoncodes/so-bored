<template lang="pug">
  //- Post Container ============
  b-container.mt-4
    createPost(
      :formValidation="formValidation"
    )
    //- Array Iteration (post in posts, mounted() from 'posts' in state object)
    b-col.card.col-12.ml-0(v-for="post in posts" :key="post.id")

      postComponent(
        :post="post"
        :formValidation="formValidation"
      )
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'posts',
  props: ['formValidation'],
  components: {
    createPost: () => import('../components/post/createPost'),
    postComponent: () => import('../components/post/postComponent')
  },
  computed: {
    ...mapState([
      'posts'
    ])
  }
}
</script>
<style scoped lang="scss">
</style>
