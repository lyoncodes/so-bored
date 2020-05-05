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
          :class="{ selected: card === selectedCard }"
          @click="handleSwitch(card, idx)"
          variant="primary") {{card.title}}
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'switch-row',
  data () {
    return {
      showCards: true,
      switchesActive: false,
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
    showAllCards () {
      this.showCards = !this.showCards
      if (this.showCards && this.showFilterCards) {
        this.showFilterCards = !this.showFilterCards
      }
    },
    handleSwitch (card, idx) {
      if (!this.switchesActive) {
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
