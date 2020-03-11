export default {
  addMenu: ({ commit }, menu) => {
    commit('appendMenu', menu)
  },
  addCard: ({ commit }, card) => {
    commit('appendCard', card)
  }
}
