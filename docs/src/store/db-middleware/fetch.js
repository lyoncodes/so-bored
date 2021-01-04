import * as firebase from '../../../firebase'
// fetches rules, calls mutation to assign fetched rules to rules array in state
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
  commit('setRuleCards', rulePayload)
}
// get() rulesCollection
async function fetchRuleCollection () {
  const rule = firebase.rulesCollection
  const snapshot = await rule.get()
  return snapshot.docs
}
// ref Images
async function fetchImageAssets ({ commit }) {
  const gsReference = await firebase.storage.refFromURL('gs://itoio-e3548.appspot.com/ito-bg.png')
  gsReference.getDownloadURL().then((url) => {
    console.log(url)
    commit('populateImages', url)
  })
}
export { fetchPosts, fetchRuleCollection, fetchImageAssets }
