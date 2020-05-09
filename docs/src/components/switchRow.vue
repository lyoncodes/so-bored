<template lang="pug">
  b-container
    b-container(class="switch-row")
      b-row
        b-button-group(size="sm" v-if="!showCards")
          a(@click="showAllCards") {{templateText.toggleMsg}}
        b-button-group(size="sm" v-if="showCards")
          a(@click="showAllCards") {{templateText.toggleMsgAlt}}
    b-container(class="menu-row" v-if="showCards")
      b-row
        b-button-group(size="sm")
          b-button(
          v-for="(card, idx) in Cards"
          :key="idx"
          :class="{ selected: card.active}"
          @click="handleSwitch(card, idx)"
          :disabled="card.updating"
          variant="primary") {{card.title}}
</template>

<script>
import { mapState, mapActions } from 'vuex'
import cardUI from '../components/cardUI'

export default {
  name: 'switch-row',
  components: {
    cardUI
  },
  data () {
    return {
      showCards: true,
      switchDisabled: 0,
      selectedCard: null,
      updateData: {
        title: '',
        text: '',
        updating: false
      },
      templateText: {
        toggleMsg: 'Show All Switches',
        toggleMsgAlt: 'Hide All Switches',
        updateBtn: 'Update!',
        updateRule: 'Update Rule',
        cancelBtn: 'Nvm',
        hideBtn: 'Hide'
      }
    }
  },
  computed: {
    ...mapState([
      'Menu',
      'Cards',
      'pinnedCards'
    ])
  },
  methods: {
    ...mapActions([
      'pinCard',
      'showUpdateField',
      'updateCard',
      'hidePin'
    ]),
    cardUpdate (card) {
      console.log(card)
      this.switchDisabled = (this.switchDisabled + 1)
    },
    showAllCards () {
      this.showCards = !this.showCards
      if (this.showCards && this.showFilterCards) {
        this.showFilterCards = !this.showFilterCards
      }
    },
    handleSwitch (card, idx) {
      const { title, text, id, active } = card
      const pinnedCard = {
        title,
        text,
        id,
        active
      }
      return (!this.pinnedCards.length || (this.pinnedCards.length && !this.Cards[idx].active)) ? this.pinCard(pinnedCard)
        : (this.Cards[idx].active) ? this.hidePin(pinnedCard) : null
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
