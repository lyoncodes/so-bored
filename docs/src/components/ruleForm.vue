<template lang="pug">
  b-container
    button.labeled-button(@click="toggleCardForm")
      span(v-if="!showCardForm") {{ buttonText.toggleMsg }}
        img.card-icon.pl-3(src='../assets/add.svg')
      span(v-if="showCardForm") {{ buttonText.errorMsg }}
        img.card-icon.pl-3(src='../assets/cancel.svg')
    b-row.justify-content-center
      b-form(@submit.prevent="handleSubmit" v-if="showCardForm")
        b-col
          b-form-group(id="input-type")
            b-button(
              id="card-type"
              v-for="(select, idx) in Menu"
              v-model="formData.type"
              :key="idx"
              :class="{ selected: formData.type === select.type }"
              @click="submitType(select.type)") {{select.type}}
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
              id="unlock"
              v-model="formData.locked"
              :value="false"
              variant="light"
            )
              img.card-icon(src='../assets/Unlock.svg')
            b-form-radio.pl-5(
              id="lock"
              v-model="formData.locked"
              :value="true"
              variant="light"
            )
              img.card-icon(src='../assets/Lock.svg')
        img.card-icon(v-if="showConfirm" src='../assets/Valid.svg')
        b-button#handle-update(type="submit")
          img.card-icon(src='../assets/add.svg')
        b-button#handle-cancel(type="reset")
          img.card-icon(src='../assets/cancel.svg')
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
<style scoped lang="scss">
.icon-trigger{
  border: 0em;
  box-shadow: none;
  // padding: .25em 0 0 .25em;
  // margin: 0 0 0 .5em;
  &:active, :focus, :hover{
  background: $border-g !important;
  outline: none;
  }
}
#handle-cancel{
  border: 0em;
  box-shadow: none;
  margin: 0;
  padding: .25em .25em .25em 2.6em;
}
#card-lock {
  input{
    display: inline;
  }
}
#card-text {
  font-size: 1em;
}
.custom-control {
  display: inline;
}
</style>
