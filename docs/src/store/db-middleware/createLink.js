import { firestore } from 'firebase'
async function createLink ({ commit, dispatch }, link) {
  dispatch('mapRes', link).then(async (res) => {
    // Creates Link
    res.update({
      links: firestore.FieldValue.arrayUnion(link)
    })
  })
  link.payload = 'createLink'
  commit('updateState', link)
}
export { createLink }
