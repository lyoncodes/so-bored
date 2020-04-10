export default {
  // add card from add card form
  appendCard: (state, card) => {
    state.Cards.push(card)
  },
  // "plugIn" card to board after switch is active
  appendPin: (state, card) => {
    card.active = true
    card.toggled = true
    state.pinnedCards.push(card)
    return state.Cards.map((el) => {
      if (el.id === card.id) {
        el.active = true
      }
    })
  },
  // update card in cards and pinnedcards arrays
  replaceCardText: (state, card) => {
    state.Cards.map(el => {
      if (el.id === card.cardId) {
        el.title = card.title
        el.text = card.text
      }
    })
    state.pinnedCards.map(el => {
      if (el.id === card.cardId) {
        el.title = card.title
        el.text = card.text
      }
    })
  },
  // deletes card in Cards and pinnedCards arrays
  removeCard: (state, card) => {
    const filtered = state.pinnedCards.filter((value) => {
      if (value.id !== card.id) {
        card.active = false
        return value
      }
    })
    state.pinnedCards = filtered
    return state.Cards.map((el) => {
      if (el.id === card.id) {
        el.active = false
      }
    })
  }
}
