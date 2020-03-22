export default {
  addCard: ({ commit }, card) => {
    commit('appendCard', card)
  },
  deleteCard: ({ commit }, card) => {
    console.log('action')
    commit('removeCard', card)
  }
}
