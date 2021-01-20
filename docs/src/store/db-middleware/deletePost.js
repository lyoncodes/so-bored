async function deletePost ({ commit, dispatch }, data) {
  dispatch('mapRes', data).then(async (res) => {
    // Deletes Post
    if (data.payload === 'deletePost') {
      res.delete()
    }
  })
  commit('updateState', data)
}
export { deletePost }
