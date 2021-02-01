async function togglePostComponents ({ commit, dispatch }, postList) {
  if (postList.tokenString === 'togglePostUpdateFields') {
    commit('updateState', postList)
  }
}
export { togglePostComponents }
