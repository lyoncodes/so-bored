export default {
  activeCards: (state) => {
    return state.Cards.filter((card) => {
      return card.id === 0
    })
  }
}
