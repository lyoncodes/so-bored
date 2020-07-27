import * as firebase from '../../firebase'
export default {
  // update userProfile in the state to the user passed on login
  setUserProfile (state, val) {
    state.userProfile = val
  },
  // set rules in state to the rules retrieved from db
  setRuleCards (state, rulePayload) {
    state.rules = rulePayload
  },
  // adds a rule to database
  async addRule (state, card) {
    // checks if rule title already exists
    const filteredTitle = state.rules.filter(el => {
      return (el.title === card.title) ? el : null
    })
    if (!filteredTitle.length) {
      // adds card to rules in state
      state.rules.push(card)
      // adds card to rules in db
      await firebase.rulesCollection.add({
        locked: card.locked,
        type: card.type,
        title: card.title,
        idx: card.idx,
        text: card.text,
        active: card.active,
        updating: card.updating,
        annotations: card.annotations,
        links: card.links
      })
    } else alert('this title already exists! Try another entry')
  },
  // change state of cards to updating (disables buttons when card is being edited)
  updateCardField: (state, card) => {
    const arr = state.rules
    arr.map(el => {
      if (el.id === card.id) {
        el.updating = !el.updating
      }
    })
  },
  // update card in cards and pinnedcards arrays & change state of cards to !updating
  async replaceCardRule (state, card) {
    const arr = state.rules
    arr.map((el) => {
      if (el.id === card.id) {
        el.title = card.title
        el.text = card.text
        el.updating = !card.updating
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
          return (el.text !== card.text) ? el : null
        })
        el.annotations = filteredAnnotations
      }
    })
  },
  // adds LinkBox
  addLink: (state, link) => {
    state.rules.map(el => {
      if (el.id === link.id) {
        el.links.push(link)
      }
    })
  },
  // deactivates card in Cards and pinnedCards arrays
  removeCard: (state, card) => {
    const newArray = state.rules.filter((el) => {
      return (el.id !== card.id) ? el : null
    })
    state.rules = newArray
  },
  // filters rules in all Rules
  filterRules: (state, type) => {
  }
}
