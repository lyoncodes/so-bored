export default {
  // add card from add card form
  addRule: (state, card) => {
    const test = state.Cards.filter(el => {
      if (el.title === card.title) {
        return el
      }
    })
    if (!test.length) {
      state.Cards.push(card)
    } else alert('this title already exists! Try another entry')
  },
  // append card after switch is active
  appendPin: (state, card) => {
    state.pinnedCards.push(card)
    const arr = [...state.Cards, ...state.pinnedCards]
    return arr.map((el) => {
      if (el.title === card.title) {
        el.active = true
      }
    })
  },
  // change state of cards to updating
  updateCardField: (state, card) => {
    const arr = [...state.Cards, ...state.pinnedCards]
    arr.map(el => {
      if (el.id === card.id) {
        el.updating = !el.updating
      }
    })
  },
  // update card in cards and pinnedcards arrays & change state of cards to !updating
  replaceCardRule: (state, card) => {
    const arr = [...state.Cards, ...state.pinnedCards]
    arr.map(el => {
      if (el.id === card.id) {
        if (card.title.length && !card.text.length) {
          el.title = card.title
          card.text = el.text
        } else if (card.text.length && !card.title.length) {
          el.text = card.text
          card.title = el.title
        } else {
          el.title = card.title
          el.text = card.text
        }
      }
      el.updating = false
    })
  },
  // annotates card
  submitAnnotation: (state, card) => {
    state.pinnedCards.map(el => {
      if (el.id === card.id) {
        el.annotations.push(card)
      }
    })
  },
  // deactivates card in Cards and pinnedCards arrays
  removeCard: (state, card) => {
    const filtered = state.pinnedCards.filter((el) => {
      if (el.id !== card.id) {
        card.active = false
        return el
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
