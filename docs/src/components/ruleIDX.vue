<template lang="pug">
  b-container
    b-container.rule-menu
      b-row.justify-content-center
        h5(size="sm" v-if="!showCards")
          a(@click="showAllCards") {{ templateText.toggleMsg }}
        h5(size="sm" v-if="showCards")
          a(@click="showAllCards") {{ templateText.toggleMsgAlt }}
    b-button-group
      b-container.menu-row(v-if="showCards")
        b-button(
        v-for="(card, idx) in Cards"
        :key="idx"
        :class="{ selected: card.active }"
        @click="handleSwitch(card, idx)"
        :disabled="card.updating"
        squared) {{ card.title }}
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
        toggleMsg: 'Show Rulebook',
        toggleMsgAlt: 'Hide Rulebook'
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
<style scoped lang="scss">

</style>
