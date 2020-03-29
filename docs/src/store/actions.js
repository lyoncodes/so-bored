export default {
  addCard: ({ commit }, card) => {
    commit('appendCard', card)
  },
  pinCard: ({ commit }, card) => {
    commit('appendPin', card)
  },
  hidePin: ({ commit }, card) => {
    commit('removeCard', card)
  }
}
