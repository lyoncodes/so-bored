<template lang="pug">
  b-container.mt-3
    b-row.justify-content-center
      b-col.col-8
        button#edit-button.mr-2(
          @click="toggleAnnotations")
          img.annotate-icon(src='../../assets/annotate.svg')
        a(v-if="showAnnotations") {{annotationData.text.length}} / {{ rule.annotationValidation.charLimit}}
      b-col.col-12
        b-form.mb-2.mt-4(@submit.prevent="submitAnnotation(annotationData)" v-if="showAnnotations")
          b-form-textarea(
            v-model="annotationData.text"
            @keyup="validateCharCount()"
          )
          b-row(v-if="annotationData.text.length > rule.annotationValidation.charLimit")
            b-badge(variant="danger") {{ rule.annotationValidation.errorMsg }}
          b-button#submit-annotation(type="submit" variant="primary" v-if="!rule.annotationValidation.errorMsg" :disabled="!annotationData.text.length")
            img.annotate-icon(src="../../assets/add.svg")
        p.annotations(v-for="annotation in rule.annotations") {{ annotation.text }}
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
<style scoped lang="scss">
form {
  textarea {
    border: 1px solid $neon;
    outline: none;
    &:focus {
      border: 1px solid $indigo;
    }
  }
}
.annotations {
  margin: 1.25em;
}
.annotate-icon {
  height: 2em;
}
#submit-annotation{
  border: 0em;
  box-shadow: none;
  margin: 1em;
  padding: .25em;
}
#edit-button {
  border: 0em;
  padding: 0;
}
</style>
