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
        v-for="(card, idx) in rules"
        :key="idx"
        :class="{ selected: card.active }"
        @click="handleSwitch(card, idx)"
        :disabled="card.updating") {{ card.title }}
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
      'pinnedCards',
      'rules'
    ])
  },
  methods: {
    ...mapActions([
      'appendCard',
      'hidePin'
    ]),
    showAllCards () {
      this.showCards = !this.showCards
      if (this.showCards && this.showFilterCards) {
        this.showFilterCards = !this.showFilterCards
      }
    },
    handleSwitch (card, idx) {
      const { locked, title, text, type, active, updating, annotations, tokenRef } = card
      const pinnedCard = {
        locked,
        title,
        text,
        idx,
        type,
        active,
        updating,
        annotations,
        tokenRef
      }
      return (!this.pinnedCards.length || (this.pinnedCards.length && !this.rules[idx].active)) ? this.appendCard(pinnedCard)
        : (this.rules[idx].active) ? this.hidePin(pinnedCard) : null
    }
  },
  mounted () {
    const card = this.rules
    this.card = card
  }
}
</script>
<style scoped lang="scss">
.menu-row{
  button {
    border: 1px solid transparent;
    // border-image-slice: 1;
    // border-width: 5px;
    // border-image-source: $border-g;
    -webkit-box-shadow:  $box-shadow-light;
    -moz-box-shadow:  $box-shadow-light;
    box-shadow:  $box-shadow-light;
    color: $indigo;
    font-size: .85em;
    font-weight: 600;
    margin: .25em;
    outline: none;
    padding: .75em 1em;
    transition: all 0.3s ease;

    &:active, :focus{
      background: $border-g !important;
      outline: none;
    }
    &:hover {
      box-shadow: none;
      border: 1px solid $neon;
    }

  }
  .selected {
    background: $border-g !important;
    color: white!important;
    -webkit-box-shadow:   23px 7px 13px -16px rgba(213,58,156,1);
    -moz-box-shadow:   23px 7px 13px -16px rgba(213,58,156,1);
    box-shadow:   23px 7px 13px -16px rgba(213,58,156,1);
  }
  .toggled {
    color: $indigo
  }
}
</style>
