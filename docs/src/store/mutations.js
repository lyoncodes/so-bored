export default {
  appendCard: (state, card) => {
    state.Cards.push(card)
  },
  removeCard: (state, card) => {
    state.$delete(state.Cards, card)
  }
}
