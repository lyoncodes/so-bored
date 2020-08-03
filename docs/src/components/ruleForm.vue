<template lang="pug">
  b-container
    b-card
      b-col
        button.labeled-button(@click="toggleCardForm")
          span {{ buttonText.toggleMsg }}
            img.card-icon-sm.pl-2(src='../assets/add.svg')
      b-col(v-if="showCardForm")
        b-form(@submit.prevent="handleSubmit")
          b-col
            //- b-row.justify-content-center
            //-   b-form-group#input-type
            //-     b-button.type-links(
            //-       v-for="(select, idx) in Menu"
            //-       v-model="formData.type"
            //-       :key="idx"
            //-       :class="{ selected: formData.type === select.type }"
            //-       @click="submitType(select.type)") {{select.type}}
            b-form-group.mt-5(id="input-title")
              b-row(v-if="formChar.titleCount > formChar.titleLimit")
                b-badge(variant="danger") {{formChar.errorMsg}}
              b-form-input(
                v-model="formData.title"
                @keyup="validateCharCount()"
                required
                placeholder="Enter Doc Title"
                )
              a.validation-char {{formChar.titleCount}} / {{formChar.titleLimit}}
            b-form-group(id="input-card-text")
              b-row(v-if="formChar.charCount > formChar.charLimit")
                b-badge(variant="danger") {{formChar.errorMsg}}
              b-form-input(
                id="card-text"
                v-model="formData.text"
                @keyup="validateCharCount()"
                required
                placeholder="Enter Rule Text"
              )
              a.validation-char {{formChar.charCount}} / {{formChar.charLimit}}
            b-form-group
              b-form-radio(
                id="unlock"
                v-model="formData.locked"
                :value="false"
                variant="light"
              )
                img.card-icon-sm(src='../assets/Unlock.svg')
              b-form-radio(
                id="lock"
                v-model="formData.locked"
                :value="true"
                variant="light"
              )
                img.card-icon-sm(src='../assets/Lock.svg')
            img.card-icon(v-if="showConfirm" src='../assets/Valid.svg')
            b-button(type="submit")
              img.card-icon(src='../assets/add.svg')
            b-button(type="reset")
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
        toggleMsg: 'Add Doc',
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
        links: [],
        annotationType: false
      }
    }
  },
  computed: {
    ...mapState([
      'userProfile',
      'Menu',
      'rules'
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
      const { locked, title, text, type, active, updating, annotations, links, annotationType } = this.formData
      const idx = this.rules.length + 1
      const card = {
        locked,
        title,
        text,
        type,
        idx,
        active,
        updating,
        annotations,
        links,
        annotationType
      }
      if (card.text.length > this.formChar.charLimit || card.title.length > this.formChar.titleLimit) {
        return alert('Error handling: fix length')
      }
      this.submitRule(card)
      this.formData = {
        locked: false,
        title: '',
        text: '',
        type: '',
        active: false,
        updating: false,
        annotations: [],
        links: [],
        annotationType: false
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
.custom-control {
  display: inline;
}
</style>
