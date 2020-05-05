<template lang="pug">
  .home
    img(src="../assets/unearth-slate.svg")
    h1.heading Documents
    button(@click="toggleCardForm" class="btn btn-primary") Add New Card
    b-form(@submit.prevent="handleSubmit" v-if="showCardForm")
      b-col(md="6")
        b-form-group(id="input-title" label="Card Title:" label-for="input-title")
          b-form-input(
            id="card-title"
            v-model="formData.title"
            required
            placeholder="Enter Rule Title"
            )
        b-form-group(id="input-card-text" label="Card Text:" label-for="input-card-text")
          b-form-input(
            id="card-text"
            v-model="formData.text"
            required
            placeholder="Enter Rule Text"
          )
      b-button(type="submit" variant="primary") Submit
      b-button(type="reset" variant="danger") Reset
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Home',
  data () {
    return {
      showCardForm: false,
      formData: {
        title: '',
        text: '',
        type: ''
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
      'addCard'
    ]),
    toggleCardForm () {
      this.showCardForm = !this.showCardForm
    },
    handleSubmit () {
      const { title, text, type } = this.formData
      const id = this.Cards.length
      const card = {
        title,
        text,
        type,
        id
      }
      this.addCard(card)
      this.formData = {
        title: '',
        text: '',
        type: ''
      }
    }
  }
}
</script>
<style scoped lang="scss">

</style>
