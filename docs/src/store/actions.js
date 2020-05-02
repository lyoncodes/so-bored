export default {
  // add card from add card form
  addCard: ({ commit }, card) => {
    commit('appendCard', card)
  },
  // "plugIn" card to board after switch is active
  pinCard: ({ commit }, card) => {
    commit('appendPin', card)
  },
  showUpdateField: ({ commit }, card) => {
    commit('updateCardField', card)
  },
  // update card in Cards and pinnedcards arrays
  updateCard: ({ commit }, card) => {
    commit('replaceCardRule', card)
  },
  // clears forms on 'nvm' button
  clearForm: ({ commit }, card) => {
    commit('clearCardForm', card)
  },
  // deletes card in Cards and pinnedCards arrays
  hidePin: ({ commit }, card) => {
    commit('removeCard', card)
  },
  // filters by type
  filterByType: ({ commit }, type) => {
    commit('filterCard', type)
  }
}
