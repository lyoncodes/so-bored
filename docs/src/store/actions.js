export default {
  // add card from add card form
  addCard: ({ commit }, card) => {
    commit('appendCard', card)
  },
  // "plugIn" card to board after switch is active
  pinCard: ({ commit }, card) => {
    commit('appendPin', card)
  },
  // update card in Cards and pinnedcards arrays
  updateCardText: ({ commit }, cardText) => {
    commit('replaceCardText', cardText)
  },
  // deletes card in Cards and pinnedCards arrays
  hidePin: ({ commit }, card) => {
    commit('removeCard', card)
  }
}
