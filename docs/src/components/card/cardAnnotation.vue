<template lang="pug">
  b-container.mt-3
    b-row.justify-content-center
      b-col.col-8
        button#edit-button.mr-2(
          @click="toggleAnnotations"
          class="btn btn-primary"
          :class="{annotating: showAnnotations}")
          img#validate-icon(src='../../assets/editPencil.svg')
        a {{annotationData.text.length}} / {{ rule.annotationValidation.charLimit}}
      b-col.col-12
        b-form.mb-2.mt-4(@submit.prevent="submitAnnotation(annotationData)" v-if="showAnnotations")
          b-form-textarea(
            v-model="annotationData.text"
            @keyup="validateCharCount()"
          )
          b-row(v-if="annotationData.text.length > rule.annotationValidation.charLimit")
            b-badge(variant="danger") {{ rule.annotationValidation.errorMsg }}
          b-button(type="submit" variant="primary" v-if="!rule.annotationValidation.errorMsg" :disabled="!annotationData.text.length") Submit
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
.annotations {
  margin: 1.25em;
}
.annotating {
  background: $border-g !important;
  color: white!important;
}
#validate-icon {
  height: 20px;
}
#edit-button {
  border: 0px;
  padding: 0;
}
</style>
