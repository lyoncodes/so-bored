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
                b-form(@submit.prevent="updateCard(card.id)" v-if="showUpdateField")
                  b-form-input(
                    id="card-title"
                    v-model="cardText.title"
                    required
                    placeholder="Enter New Title"
                  )
                  b-form-input(
                    id="card-text"
                    v-model="cardText.text"
                    required
                    placeholder="Enter New Rule"
                  )
                  b-button(type="submit" variant="primary") Update!
                b-button(@click="handleUpdate" variant="primary" v-if="!showUpdateField") Update Rule
                b-button(@click="handleDelete(card.id)" variant="primary") Delete Card
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'menu-row',
  data () {
    return {
      showCards: false,
      showUpdateField: false,
      cardText: {
        title: '',
        text: ''
      }
    }
  },
  computed: {
    ...mapState([
      'Cards',
      'pinnedCards'
    ])
  },
  methods: {
    ...mapActions([
      'pinCard',
      'updateCardText',
      'hidePin',
      'eraseCard'
    ]),
    handleSwitch (card, index) {
      const { title, text, id, active } = card
      const pinnedCard = {
        title,
        text,
        id,
        active
      }
      // Conditions to handle juggling switches
      if (!this.pinnedCards.length || (this.pinnedCards.length && !this.Cards[index].active)) {
        return this.pinCard(pinnedCard)
      }
      if (this.Cards[index].active) {
        return this.hidePin(pinnedCard)
      }
    },
    handleUpdate () {
      this.showUpdateField = !this.showUpdateField
    },
    updateCard (id) {
      const cardId = id
      const { title, text } = this.cardText
      const cardText = {
        title,
        text,
        cardId
      }
      this.card.title = cardText.title
      this.updateCardText(cardText)
      this.cardText = {
        title: '',
        text: ''
      }
      this.showUpdateField = !this.showUpdateField
    },
    // we handle delete card outside the action/mutation system in order to utilize the $delete directive (it's just too easy)
    handleDelete (id) {
      const cardId = id
      this.$delete(this.Cards, cardId)
      this.$delete(this.pinnedCards, cardId)
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
