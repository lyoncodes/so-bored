async function updatePost ({ commit, dispatch }, data) {
  dispatch('mapRes', data).then(async (res) => {
  // Updates Post Title & Text
    res.update({
      title: data.title,
      text: data.text,
      updating: !data.updating
    })
  })
  commit('updateState', data)
}
export { updatePost }
