async function togglePostComponents ({ commit, dispatch }, data) {
  dispatch('mapRes', data).then(async (res) => {
    // Toggles Post Title & Text Fields
    if (data.payload === 'togglePostEdit') {
      res.update({
        updating: !data.updating
      })
    }
    // Mutates state (we do this in actions to avoid having to exclude this payload from all the other actions)
    if (data.payload === 'toggleLinkForm') {
      data.displayLinks = !data.displayLinks
    }
    commit('updateState', data)
  })
}
export { togglePostComponents }
