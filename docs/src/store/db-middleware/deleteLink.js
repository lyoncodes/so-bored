import { firestore } from 'firebase'
async function deleteLink ({ commit, dispatch }, data) {
  dispatch('mapRes', data).then(async (res) => {
    // Deletes Link to Link dataStore
    data.payload = 'createLink'
    res.update({
      links: firestore.FieldValue.arrayRemove(data)
    })
  })
  data.payload = 'deleteLink'
  commit('updateState', data)
}
export { deleteLink }
