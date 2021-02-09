<template lang="pug">
  //- Post Container
  b-container.card-container.p-0
    //- Array Iteration (post in posts, mounted() from 'posts' in state object)
    b-col.post.col-12.ml-0(v-for="post in posts" :key="post.id")
      postComponent(
        :post="post"
        :userProfile="userProfile"
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
.titleError, .textError {
  color: $candy-red;
}
</style>
