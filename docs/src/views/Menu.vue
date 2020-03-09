<template>
  <b-card-group class="card-grid">
      <template v-for="card in SEOcards">
      <!-- card component goes here eventually -->
        <b-col md="4" class="card-container" :key="card">
          <b-card bg-variant="dark" text-variant="white">
              <h3>
                {{card.title}}
              </h3>
              <b-card-text>
                {{card.text}}
              </b-card-text>
              <b-button href="#" variant="primary">Go somewhere</b-button>
          </b-card>
        </b-col>
      </template>
      <template v-for="card in SGcards">
      <!-- card component goes here eventually -->
        <b-col md="4" class="card-container" :key="card">
          <b-card bg-variant="dark" text-variant="white">
              <h3>
                {{card.title}}
              </h3>
              <b-card-text>
                {{card.text}}
              </b-card-text>
              <b-button href="#" variant="primary">Go somewhere</b-button>
          </b-card>
        </b-col>
      </template>
  </b-card-group>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      card: {}
    }
  },
  computed: {
    ...mapState([
      'SEOcards',
      'SGcards'
    ])
  },
  mounted () {
    const card = this.SEOcards
    this.card = card
  }
}
</script>
<style scoped>

</style>
