<template lang="pug">
  b-container
    b-container(class="menu-row")
      b-row
        b-button-group(size="sm")
          b-button(
          v-for="(card, index) in Cards"
          :key="index"
          :class="{ selected: card === selectedCard }"
          @click="handleSwitch(card, index)"
          variant="primary") {{card.title}}
      b-card-group(class="card-grid")
        b-container(class="card-container")
          b-row
            b-col(md="4" v-for="card in pinnedCards" :key="card.active")
              b-card(bg-variant="dark" text-variant="white")
                h3 {{card.title}}
                b-card-text {{card.text}}
                b-button(@click="handleDelete(card.id)" variant="primary") Unpin Card
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'menu-row',
  data () {
    return {
      showCards: false
    }
  },
  computed: {
    ...mapState([
      'Cards',
      'allCards',
      'pinnedCards'
    ])
  },
  methods: {
    ...mapActions([
      'pinCard',
      'hidePin'
    ]),
    handleSwitch (card, index) {
      const { title, text, id, active } = card
      const pinnedCard = {
        title,
        text,
        id,
        active
      }
      if (!this.pinnedCards.length) {
        return this.pinCard(pinnedCard)
      }
      if (this.Cards[index].active) {
        return this.hidePin(pinnedCard)
      }
      if (this.pinnedCards.length && !this.Cards[index].active) {
        return this.pinCard(pinnedCard)
      }
    },
    handleDelete (id) {
      const cardId = id
      this.$delete(this.Cards, cardId)
      this.$delete(this.allCards, cardId)
      this.showCards = !this.showCards
    }
  },
  mounted () {
    const card = this.Cards
    this.card = card
  }
}
</script>
<style scoped>

</style>
