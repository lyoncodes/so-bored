<template lang="pug">
  //- Post Container
  b-container
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
  props: ['formValidation'],
  data () {
    return {
    }
  },
  components: {
    postComponent: () => import('../components/post/postComponent')
  },
  computed: {
    ...mapState([
      'posts',
      'userProfile'
    ])
  }
}
</script>
<style scoped lang="scss">
</style>
