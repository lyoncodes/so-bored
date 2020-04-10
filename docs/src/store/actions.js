export default {
  addCard: ({ commit }, card) => {
    commit('appendCard', card)
  },
  pinCard: ({ commit }, card) => {
    commit('appendPin', card)
  },
  updateCardText: ({ commit }, cardText) => {
    commit('replaceCardText', cardText)
  },
  hidePin: ({ commit }, card) => {
    commit('removeCard', card)
  }
}
