<template lang="pug">
  b-container
    h1(v-for="annotation in rule.annotations") {{ annotation.text }}
    b-form(@submit.prevent="submitAnnotation(annotationData)")
      b-form-textarea(
        v-model="annotationData.text"
      )
      b-button(type="submit" variant="primary") Annotate
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'card-label',
  props: ['rule'],
  data () {
    return {
      annotationData: {
        text: '',
        author: '',
        annotationType: false
      }
    }
  },
  computed: {
    ...mapState([
      'Cards',
      'pinnedCards'
    ])
  },
  methods: {
    ...mapActions([
      'annotateCard'
    ]),
    submitAnnotation (annotationData) {
      this.annotationData.annotationType = true
      const id = this.$props.rule.id
      const { text, author, annotationType } = this.annotationData
      const annotationPayload = {
        text,
        author,
        id,
        annotationType
      }
      if (this.annotationData.text.length) {
        this.annotateCard(annotationPayload)
      }
      this.annotationData = {
        text: '',
        author: '',
        annotationType: false
      }
    }
  },
  mounted () {
    const ruleData = this.annotationData
    this.ruleData = ruleData
  }
}
</script>
<style scoped>

</style>
