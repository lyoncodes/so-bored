<template lang="pug">
  b-container
    button(@click="toggleCardForm" class="btn btn-primary")
      span(v-if="!showCardForm") {{ buttonText.toggleMsg }}
      span(v-if="showCardForm") {{ buttonText.errorMsg }}
    b-form(@submit.prevent="handleSubmit" v-if="showCardForm")
      b-col(md="6")
        b-form-group(id="input-type")
          b-button(
            id="card-type"
            v-for="(select, idx) in Menu"
            v-model="formData.type"
            :key="idx"
            @click="submitType(select.type)"
            variant="light") {{select.type}}
        b-form-group(id="input-title" label="Card Title:" label-for="input-title")
          a {{formChar.titleCount}} / {{formChar.titleLimit}}
          b-row(v-if="formChar.titleCount > formChar.titleLimit")
            b-badge(variant="danger") {{formChar.errorMsg}}
          b-form-input(
            id="card-title"
            v-model="formData.title"
            @keyup="validateCharCount()"
            required
            placeholder="Enter Rule Title"
            )
        b-form-group(id="input-card-text" label="Card Text:" label-for="input-card-text")
          a {{formChar.charCount}} / {{formChar.charLimit}}
          b-row(v-if="formChar.charCount > formChar.charLimit")
            b-badge(variant="danger") {{formChar.errorMsg}}
          b-form-input(
            id="card-text"
            v-model="formData.text"
            @keyup="validateCharCount()"
            required
            placeholder="Enter Rule Text"
          )
        b-form-group(id="card-lock")
          b-form-radio(
            id="lock"
            v-model="formData.locked"
            :value="true"
            variant="light"
          ) lock
          b-form-radio(
            id="unlock"
            v-model="formData.locked"
            :value="false"
            variant="light"
          ) unlock
      b-badge(v-if="showConfirm" variant="success") {{formChar.confirmation}}
      b-button(type="submit" variant="primary") Submit
      b-button(type="reset" variant="danger") Reset
</template>
<script>
import { mapActions, mapState } from 'vuex'
import ruleForm from '../components/ruleForm'

export default {
  name: 'Home',
  components: {
    ruleForm
  },
  data () {
    return {
      showCardForm: false,
      showConfirm: false,
      buttonText: {
        toggleMsg: 'Add New Card',
        errorMsg: 'Nvm'
      },
      formChar: {
        titleCount: 0,
        titleLimit: 20,
        charCount: 0,
        charLimit: 300,
        confirmation: String,
        errorMsg: String
      },
      formData: {
        locked: false,
        title: '',
        text: '',
        type: '',
        active: false,
        updating: false,
        annotations: [],
        annotationType: false,
        annotationValidation: {
          charLimit: 100,
          errorMsg: String
        }
      }
    }
  },
  computed: {
    ...mapState([
      'Menu',
      'Cards',
      'allCards'
    ])
  },
  methods: {
    ...mapActions([
      'submitRule'
    ]),
    toggleCardForm () {
      this.showCardForm = !this.showCardForm
    },
    validateCharCount () {
      this.formChar.charCount = this.formData.text.length
      this.formChar.titleCount = this.formData.title.length
      this.formChar.errorMsg = this.formData.title.length > this.formChar.titleLimit || this.formData.text.length > this.formChar.charLimit ? 'Too Many Characters' : null
    },
    submitType (type) {
      this.$emit('addType', type)
      this.formData.type = type
    },
    handleSubmit () {
      const { locked, title, text, type, active, updating, annotations, annotationType, annotationValidation } = this.formData
      const id = this.Cards.length
      const card = {
        locked,
        title,
        text,
        type,
        id,
        active,
        updating,
        annotations,
        annotationType,
        annotationValidation
      }
      if (card.text.length > this.formChar.charLimit || card.title.length > this.formChar.titleLimit) {
        return alert('Error handling: fix length')
      }
      this.submitRule(card)
      this.formData = {
        title: '',
        text: '',
        type: ''
      }
      this.showConfirm = true
      this.formChar = {
        titleCount: 0,
        titleLimit: 20,
        charCount: 0,
        charLimit: 300,
        confirmation: 'Added!'
      }
    }
  },
  mounted () {
    const menu = this.Menu
    this.menu = menu
  }
}
</script>
<style scoped>

</style>
