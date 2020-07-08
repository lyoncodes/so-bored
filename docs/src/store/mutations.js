import * as firebase from '../../firebase'
export default {
  // add user to userProfile data
  setUserProfile (state, val) {
    state.userProfile = val
  },
  setRuleCards (state, ruleData) {
    state.rules = ruleData
  },
  // add card from add card form
  async addRule (state, card) {
    const filteredTitle = state.rules.filter(el => {
      if (el.title === card.title) {
        return el
      }
    })
    if (!filteredTitle.length) {
      state.rules.push(card)
      // save to db
      await firebase.rulesCollection.doc(card.title).set({
        locked: card.locked,
        type: card.type,
        title: card.title,
        text: card.text,
        id: card.id,
        active: card.active,
        updating: card.updating,
        annotations: card.annotations
      })
    } else alert('this title already exists! Try another entry')
  },
  // append card after switch is active
  appendPin: (state, card) => {
    state.pinnedCards.push(card)
    const arr = [...state.rules, ...state.pinnedCards]
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
    return state.rules.map((el) => {
      if (el.id === card.id) {
        el.active = false
      }
    })
  },
  // filters rules in all Rules
  filterRules: (state, type) => {
  }
}
