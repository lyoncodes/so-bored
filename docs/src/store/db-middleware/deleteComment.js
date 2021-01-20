import { firestore } from 'firebase'
async function deleteComment ({ commit, dispatch }, data) {
  dispatch('mapRes', data).then(async (res) => {
    // Delete Comment
    if (!data.commentType && !data.ref && data.payload !== 'togglePostEdit') {
      // if it's none of those things, then it must be a comment!
      data.commentType = true
      res.update({
        comments: firestore.FieldValue.arrayRemove(data)
      })
      data.commentType = false
    }
  })
  commit('updateState', data)
}
export { deleteComment }
