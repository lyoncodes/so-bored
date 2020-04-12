export default {
  // add card from add card form
  appendCard: (state, card) => {
    state.Cards.push(card)
  },
  // append card after switch is active
  appendPin: (state, card) => {
    card.active = true
    state.pinnedCards.push(card)
    return state.Cards.map((el) => {
      if (el.id === card.id) {
        el.active = true
      }
    })
  },
  // change state of cards to updating
  updateCardField: (state, card) => {
    const arr = [...state.Cards, ...state.pinnedCards]
    card.updating = true
    return arr.map((el) => {
      if (el.id === card.id) {
        el.updating = true
      }
    })
  },
  // update card in cards and pinnedcards arrays & change state of cards to !updating
  replaceCardRule: (state, card) => {
    console.log('called')
    card.updating = false
    console.log(card)
    const arr = [...state.Cards, ...state.pinnedCards]
    arr.map(el => {
      if (el.id === card.cardId) {
        // Only title updated
        if (card.title.length && !card.text.length) {
          el.title = card.title
          el.updating = !el.updating
        }
        // Only text updated
        if (card.text.length && !card.title.length) {
          el.text = card.text
          el.updating = !el.updating
        } else {
          el.title = card.title
          el.text = card.text
          el.updating = !el.updating
        }
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
