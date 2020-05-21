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
import ruleCard from '../components/ruleCard'

export default {
  name: 'rule-tabs',
  components: {
    ruleCard
  },
  data () {
    return {
      showCards: true,
      selectedCard: null,
      updateData: {
        title: '',
        text: '',
        updating: false
      },
      templateText: {
        toggleMsg: 'Show All Rules',
        toggleMsgAlt: 'Hide All Rules'
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
      const { locked, title, text, id, type, active, annotations, annotationValidation } = card
      const pinnedCard = {
        locked,
        title,
        text,
        id,
        type,
        active,
        annotations,
        annotationValidation
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
