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
    console.log('updateCardField')
    card.updating = true
    const arr = [...state.Cards, ...state.pinnedCards]
    return arr.map((el) => {
      if (el.id === card.id) {
        el.updating = true
        console.log(el)
      }
    })
  },
  // update card in cards and pinnedcards arrays & change state of cards to !updating
  replaceCardRule: (state, card) => {
    console.log('called')
    console.log(card)
    card.updating = false
    const arr = [...state.Cards, ...state.pinnedCards]
    arr.map(el => {
      if (el.id === card.cardId) {
        el.title = card.title
        el.text = card.text
      }
      el.updating = false
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
