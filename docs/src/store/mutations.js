export default {
  // updateState function handles all dispatched actions
  updateState (state, data) {
    const ruleEl = state.rules.find(el => el.id === data.id)
    if (data.payload === 'addRule') {
      state.rules.push(data)
    } else if (data.payload === 'deleteRule') {
      const filteredArr = state.rules.filter((el) => {
        return (el.id !== data.id) ? el : null
      })
      state.rules = filteredArr
    } else if (data.payload === 'updateRule') {
      ruleEl.title = data.title
      ruleEl.text = data.text
      ruleEl.updating = !data.updating
    } else if (data.payload === 'toggleUpdateFields') {
      ruleEl.updating = !data.updating
    } else if (data.payload === 'addAnnotation') {
      ruleEl.annotations.push(data)
    } else if (data.payload === 'deleteAnnotation') {
      const filteredArr = ruleEl.annotations.filter(el => {
        return (el.text !== data.text) ? el : null
      })
      ruleEl.annotations = filteredArr
    } else if (data.payload === 'addLink') {
      ruleEl.links.push(data)
    }
  },
  // update userProfile in the state to the user passed on login
  setUserProfile (state, val) {
    state.userProfile = val
  },
  // set rules in state to the rules retrieved from db
  setRuleCards (state, rulePayload) {
    state.rules = rulePayload
  }
}
