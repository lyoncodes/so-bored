<template lang="pug">
  b-container
    button(@click="toggleAnnotations" class="btn btn-primary") Annotate
    p(v-for="annotation in rule.annotations") {{ annotation.text }}
    b-form(@submit.prevent="submitAnnotation(annotationData)" v-if="showAnnotations")
      b-form-textarea(
        v-model="annotationData.text"
      )
      b-button(type="submit" variant="primary" :disabled="annotationData.text.length === 0") Annotate
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'card-label',
  props: ['rule'],
  data () {
    return {
      showAnnotations: false,
      annotationData: {
        text: '',
        author: '',
        annotationType: false
      }
    }
  },
  computed: {
    ...mapState([
      'pinnedCards'
    ])
  },
  methods: {
    ...mapActions([
      'annotateCard'
    ]),
    toggleAnnotations () {
      this.showAnnotations = !this.showAnnotations
    },
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
      this.showAnnotations = false
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
