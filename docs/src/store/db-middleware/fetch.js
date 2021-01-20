import * as firebase from '../../../firebase'
// fetches posts, calls mutation to assign fetched posts to posts array in state
async function fetchPosts ({ commit }) {
  const rule = firebase.rulesCollection
  const snapshot = await rule.get()
  const rulePayload = []
  snapshot.forEach((el) => {
    const rule = el.data()
    rule.id = el.id
    rule.dateToFormat = rule.createdOn.toDate()
    rulePayload.push(rule)
  })
  commit('sortPosts', rulePayload)
}
// get() rulesCollection
async function fetchPostSnapshot () {
  const rule = firebase.rulesCollection
  const snapshot = await rule.get()
  return snapshot.docs
}
// ref Images
async function fetchImageAssets ({ commit }) {
  const gsReference = await firebase.storage.refFromURL('gs://itoio-e3548.appspot.com/bg-alt.png')
  gsReference.getDownloadURL().then((url) => {
    commit('populateImages', url)
  })
}
export { fetchPosts, fetchPostSnapshot, fetchImageAssets }
