<template>
  <div class="home">
    <h1>Unearth Docs</h1>
    <button @click="toggleCardForm" class="btn btn-primary">Add New Card</button>
    <b-form @submit.prevent="handleSubmit" v-if="showCardForm">
      <b-form-group id="input-title" label="Card Title" label-for="input-title">
        <b-form-input
          id="card-title"
          v-model="formData.title"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-card-text" label="Card Text:" label-for="input-card-text">
        <b-form-input
          id="card-text"
          v-model="formData.text"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters([
      'activeCards'
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
