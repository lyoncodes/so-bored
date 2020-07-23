import * as firebase from '../../firebase'
export default {
  // add user to userProfile data
  setUserProfile (state, val) {
    state.userProfile = val
  },
  setRuleCards (state, ruleData) {
    // const active = ruleData.filter(el => el.active)
    // state.pinnedCards = active
    state.rules = ruleData
  },
  // add card from add card form
  async addRule (state, card) {
    // checks if title already exists
    const filteredTitle = state.rules.filter(el => {
      if (el.title === card.title) {
        return el
      }
    })
    if (!filteredTitle.length) {
      state.rules.push(card)
      // save to db
      await firebase.rulesCollection.add({
        locked: card.locked,
        type: card.type,
        title: card.title,
        idx: card.idx,
        text: card.text,
        active: card.active,
        updating: card.updating,
        annotations: card.annotations
      })
    } else alert('this title already exists! Try another entry')
  },
  // append card after switch is active
  activateRule: (state, card) => {
    // console.log(card)
    // const arr = [...state.rules, ...state.pinnedCards]
    // console.log(arr)
    state.pinnedCards.push(card)
  },
  // change state of cards to updating (only needs front-end)
  updateCardField: (state, card) => {
    const arr = [...state.rules]
    arr.map(el => {
      if (el.id === card.id) {
        el.updating = !el.updating
      }
    })
  },
  // update card in cards and pinnedcards arrays & change state of cards to !updating
  async replaceCardRule (state, card) {
    const arr = [...state.rules, ...state.pinnedCards]
    arr.map((el) => {
      if (el.idx === card.idx) {
        el.title = card.title
        el.text = card.text
        el.updating = false
      }
    })
  },
  // annotates card
  submitAnnotation: (state, card) => {
    state.rules.map(el => {
      if (el.id === card.id) {
        el.annotations.push(card)
      }
    })
  },
  removeAnnotation: (state, card) => {
    state.rules.map(el => {
      if (el.id === card.id) {
        const filteredAnnotations = el.annotations.filter(el => {
          if (el.text !== card.text) {
            return el
          }
        })
        el.annotations = filteredAnnotations
      }
    })
  },
  // deactivates card in Cards and pinnedCards arrays
  removeCard: (state, card) => {
    const filtered = state.rules.filter((el) => {
      if (el.id !== card.id) {
        return el
      }
    })
    state.rules = filtered
  },
  // filters rules in all Rules
  filterRules: (state, type) => {
  }
}
