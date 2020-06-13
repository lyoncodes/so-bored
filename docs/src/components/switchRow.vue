<template lang="pug">
  b-container
    b-container.switch-row
      b-row.justify-content-center
        h5.toggled(v-if="!showCards")
          a(@click="showAllCards") {{templateText.toggleMsg}}
        h5(v-if="showCards")
          a(@click="showAllCards") {{templateText.toggleMsgAlt}}
      b-button-group
        b-container.menu-row(v-if="showCards")
          button(
          v-for="(card, idx) in Cards"
          :key="idx"
          :class="{selected: card.active}"
          @click="handleSwitch(card, idx)"
          :disabled="switchDisabled"
          squared
          ) {{card.title}}
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'switch-row',
  data () {
    return {
      showCards: true,
      switchDisabled: false,
      selectedCard: null,
      updateData: {
        title: '',
        text: '',
        updating: false
      },
      templateText: {
        toggleMsg: 'Show Rulebook',
        toggleMsgAlt: 'Hide Rulebook',
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
<style scoped lang="scss">
.selected {
  border: 5px solid;
  background: $border-g !important;
  color: white!important;
}
.toggled {
  color: $indigo
}
</style>
