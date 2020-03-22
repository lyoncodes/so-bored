<template>
  <b-container>
    <b-container class="menu-row">
      <b-row>
        <h1>Style Rules</h1>
        <b-button-group size="sm">
          <b-button
          v-for="card in Cards"
          :key="card.id"
          :class="{ selected: card === selectedCard }"
          @click="toggleCard(card)"
          variant="primary"
          >
            {{ card.title }}
          </b-button>
        </b-button-group>
      </b-row>
      <b-card-group class="card-grid" v-if="selectedCard && showCard">
        <b-col md="6" class="card-container" :key="card">
          <b-card bg-variant="dark" text-variant="white">
              <h3>
                {{selectedCard.title}}
              </h3>
              <b-card-text>
                {{selectedCard.text}}
              </b-card-text>
              <b-button @click="handleDelete(selectedCard.id)" variant="primary">Delete Card</b-button>
          </b-card>
        </b-col>
      </b-card-group>
    </b-container>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'menu-row',
  data () {
    return {
      showCard: false,
      selectedCard: null
    }
  },
  computed: {
    ...mapState([
      'Cards',
      'Menu'
    ])
  },
  methods: {
    toggleCard (card) {
      this.selectedCard = card
      this.showCard = !this.showCard
      return this.selectedCard
    },
    handleDelete (id) {
      const cardId = id
      this.$delete(this.Cards, cardId)
      this.showCard = !this.showCard
    }
  },
  mounted () {
    const menu = this.Menu
    this.menu = menu
    const card = this.Cards
    this.card = card
  }
}
</script>
<style scoped>

</style>
