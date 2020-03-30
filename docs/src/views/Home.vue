<template lang="pug">
  .home
    img(src="../assets/unearth-slate.svg")
    h1.heading Documents
    <button @click="toggleCardForm" class="btn btn-primary">Add New Card</button>
    <b-form @submit.prevent="handleSubmit" v-if="showCardForm">
      <b-col md="6">
        <b-form-group id="input-title" label="Card Title" label-for="input-title">
          .b-form-input(
            id="card-title"
            v-model="formData.title"
            required
            placeholder="Enter name"
            )
        </b-form-group>
        <b-form-group id="input-card-text" label="Card Text:" label-for="input-card-text">
          .b-form-input(
            id="card-text"
            v-model="formData.text"
            required
          )
        </b-form-group>
      </b-col>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Home',
  data () {
    return {
      showCardForm: false,
      formData: {
        title: '',
        text: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'addCard'
    ]),
    toggleCardForm () {
      this.showCardForm = !this.showCardForm
    },
    handleSubmit () {
      const { title, text } = this.formData
      const card = {
        title,
        text
      }
      this.addCard(card)
      this.formData = {
        title: '',
        text: ''
      }
    }
  }
}
</script>
<style scoped lang="scss">

</style>
