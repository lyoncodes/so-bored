<template>
  <b-container>
    <b-card-group class="card-grid" v-if="showCard">
      <b-container class="card-container">
        <b-row>
          <b-col md="4" v-for="card in pinnedCards" :key="card">
            <b-card bg-variant="dark" text-variant="white">
              <h3>
                {{card.title}}
              </h3>
              <b-card-text>
                {{card.text}}
              </b-card-text>
              <b-button @click="handleDelete(card.id)" variant="primary">Unpin Card</b-button>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </b-card-group>
  </b-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'menu-row',
  data () {
    return {
      showCard: true
    }
  },
  computed: {
    ...mapState([
      'pinnedCards',
      'allCards'
    ])
  },
  methods: {
    ...mapActions([
      'removeCard'
    ]),
    handleDelete (id) {
      const cardId = id
      this.$delete(this.pinnedCards, cardId)
      this.showCard = !this.showCard
    },
    unPinCard (id) {
      const cardId = id
      this.$delete(this.pinnedCards, cardId)
    }
  },
  mounted () {
    const card = this.pinnedCards
    this.card = card
  }
}
</script>
<style scoped>

</style>
