import * as firebase from '../../../firebase'
// fetches rules, calls mutation to assign fetched rules to rules array in state
async function fetchRules ({ commit }) {
  const rule = firebase.rulesCollection
  const snapshot = await rule.get()
  const rulePayload = []
  snapshot.forEach((el) => {
    const rule = el.data()
    rule.id = el.id
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
export { fetchRules, fetchRuleCollection }
