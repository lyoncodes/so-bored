<template lang="pug">
  b-container.mt-3
    b-row.justify-content-center
      b-col.col-8
        a.validation-char {{annotationData.text.length}} / {{ annotationValidation.charLimit}}
      b-col.col-12
        b-form.mb-2.mt-4(@submit.prevent="submitAnnotation(annotationData)")
          b-form-textarea(
            id="annotate-text"
            v-model="annotationData.text"
            @keyup="validateCharCount()"
          )
          b-row(v-if="annotationData.text.length > annotationValidation.charLimit")
            b-badge(variant="danger") {{ annotationValidation.errorMsg }}
          b-button#submit-annotation(type="submit" variant="primary" v-if="!annotationValidation.errorMsg" :disabled="!annotationData.text.length")
            img.annotate-icon(src="../../assets/add.svg")
        p.annotations(v-for="annotation in rule.annotations") {{ annotation.text }}
          b-button(@click="handleDelete(annotation)") Delete
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'annotation',
  props: ['rule'],
  data () {
    return {
      annotationData: {
        text: '',
        author: '',
        annotationType: true
      },
      annotationValidation: {
        charLimit: 60,
        errorMsg: String
      }
    }
  },
  computed: {
    ...mapState([
      'rules'
    ])
  },
  methods: {
    ...mapActions([
      'annotateCard',
      'deleteAnnotation'
    ]),
    validateCharCount () {
      this.annotationValidation.errorMsg = this.annotationData.text.length > this.annotationValidation.charLimit ? 'Too Many' : null
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
    },
    handleDelete (annotation) {
      this.deleteAnnotation(annotation)
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
  &:active, :focus {
    background: none!important;
  }
}
</style>
