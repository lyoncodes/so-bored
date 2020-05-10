export default {
  // add card from add card form
  submitRule: ({ commit }, card) => {
    commit('addRule', card)
  },
  // "plugIn" card to board after switch is active
  pinCard: ({ commit }, card) => {
    commit('appendPin', card)
  },
  // update/clear form fields
  showUpdateField: ({ commit }, card) => {
    commit('updateCardField', card)
  },
  // update card in Cards and pinnedcards arrays
  updateCard: ({ commit }, card) => {
    commit('replaceCardRule', card)
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
