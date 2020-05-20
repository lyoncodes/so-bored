<template lang="pug">
  b-container
    button(@click="toggleAnnotations" class="btn btn-primary" v-if="!showAnnotations") Annotate
    button(@click="toggleAnnotations" class="btn btn-primary" v-if="showAnnotations") Nvm
    p(v-for="annotation in rule.annotations") {{ annotation.text }}
    b-form(@submit.prevent="submitAnnotation(annotationData)" v-if="showAnnotations")
      b-form-textarea(
        v-model="annotationData.text"
        @keyup="validateCharCount()"
      )
      a {{annotationData.text.length}} / {{ rule.annotationValidation.charLimit}}
      b-row(v-if="annotationData.text.length > rule.annotationValidation.charLimit")
        b-badge(variant="danger") {{ rule.annotationValidation.errorMsg }}
      b-button(type="submit" variant="primary" v-if="!rule.annotationValidation.errorMsg" :disabled="!annotationData.text.length") Submit
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'annotation',
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
    validateCharCount () {
      this.rule.annotationValidation.errorMsg = this.annotationData.text.length > this.rule.annotationValidation.charLimit ? 'Too Many' : null
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
