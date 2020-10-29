<template lang="pug">
  b-container
    //- postFilter
    postCard(
      :validation="formChar"
    )
</template>

<script>
import postCard from '../components/postCard'
import postFilter from '../components/postFilter'

export default {
  name: 'rule-book',
  data () {
    return {
      formChar: {
        titleCount: 0,
        titleLimit: 20,
        charCount: 0,
        charLimit: 300,
        errorMsg: String
      }
    }
  },
  components: {
    postCard,
    postFilter
  }
}
</script>
<style scoped lang="scss">
.card-grid{
  margin-top: 2em;
}
</style>
