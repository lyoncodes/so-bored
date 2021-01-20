async function readPost ({ commit, dispatch }, data) {
  dispatch('mapRes', data).then(async (res) => {
    if (data.payload === 'toggleActive') {
      if (data.active) {
        await res.update({
          active: true
        })
      } else {
        await res.update({
          active: false
        })
      }
    }
  })
}
export { readPost }
