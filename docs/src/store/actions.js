export default {
  addCard: ({ commit }, card) => {
    commit('appendCard', card)
  }
}
