<template lang="pug">
  b-container
    button(@click="toggleCardForm" class="btn btn-primary") Add New Card
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
          b-form-input(
            id="card-title"
            v-model="formData.title"
            @keyup="validateCharCount()"
            required
            placeholder="Enter Rule Title"
            )
        b-form-group(id="input-card-text" label="Card Text:" label-for="input-card-text")
          a {{formChar.charCount}} / {{formChar.charLimit}}
          b-form-input(
            id="card-text"
            v-model="formData.text"
            @keyup="validateCharCount()"
            required
            placeholder="Enter Rule Text"
          )
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
      formChar: {
        titleCount: 0,
        titleLimit: 30,
        charCount: 0,
        charLimit: 300
      },
      formData: {
        title: '',
        text: '',
        type: '',
        active: false,
        updating: false
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
    },
    submitType (type) {
      this.$emit('addType', type)
      this.formData.type = type
    },
    handleSubmit () {
      const { title, text, type, active, updating } = this.formData
      const id = this.Cards.length
      const card = {
        title,
        text,
        type,
        id,
        active,
        updating
      }
      this.submitRule(card)
      this.formData = {
        title: '',
        text: '',
        type: ''
      }
      this.formChar = {
        titleCount: 0,
        titleLimit: 30,
        charCount: 0,
        charLimit: 300
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
