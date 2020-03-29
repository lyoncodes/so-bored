export default {
  appendCard: (state, card) => {
    state.Cards.push(card)
  },
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
