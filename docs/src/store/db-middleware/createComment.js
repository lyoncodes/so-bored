import { firestore } from 'firebase'
async function createComment ({ commit, dispatch }, data) {
  dispatch('mapRes', data).then(async (res) => {
    // Adds Comment to Comment dataStore
    if (data.commentType && !data.ref) {
      res.update({
        comments: firestore.FieldValue.arrayUnion(data)
      })
    }
  })
  commit('updateState', data)
}
export { createComment }
