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
                //-   CARD TITLE
                h3(v-if="!cardText.title.length") {{card.title}}
                h3(v-if="cardText.title.length") {{cardText.title}}
                //-
                b-form(@submit.prevent="updateCard(card.id)" v-if="showUpdateField")
                  b-form-input(
                    id="card-title"
                    v-model="cardText.title"
                    placeholder="Enter New Title"
                    @click="handleTitleEntry"
                  )
                //- CARD TEXT
                b-card-text(v-if="!cardText.text.length") {{card.text}}
                b-card-text(v-if="cardText.text.length") {{cardText.text}}
                //-
                b-form(@submit.prevent="updateCard(card.id)" v-if="showUpdateField")
                  b-form-input(
                    id="card-text"
                    v-model="cardText.text"
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
      titleUpdating: false,
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
      } else if (this.Cards[index].active) {
        return this.hidePin(pinnedCard)
      }
    },
    // Toggles update card form fields
    handleUpdate () {
      this.showUpdateField = !this.showUpdateField
    },
    // Removes Title from card when being updated
    handleTitleEntry () {
      this.titleUpdating = !this.titleUpdating
    },
    updateCard (id) {
      const cardId = id
      const { title, text } = this.cardText
      const cardText = {
        title,
        text,
        cardId
      }
      // Only title updated
      if (cardText.title.length && !cardText.text.length) {
        this.card.title = cardText.title
        this.updateCardText(cardText)
      }
      // Only text updated
      if (cardText.text.length && !cardText.title.length) {
        this.card.text = cardText.text
        this.updateCardText(cardText)
      }
      // Both fields updated
      if (cardText.title.length && cardText.text.length) {
        this.card.title = cardText.title
        this.card.text = cardText.text
        this.updateCardText(cardText)
      }
      this.cardText = {
        title: '',
        text: ''
      }
      this.showUpdateField = !this.showUpdateField
      this.titleUpdating = !this.titleUpdating
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
