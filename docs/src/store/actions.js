import * as firebase from '../../firebase'
import router from '../router/index'

export default {
  // logs user in
  async login ({ dispatch }, form) {
    const { user } = await firebase.auth.signInWithEmailAndPassword(form.email, form.password)
    dispatch('fetchUserProfile', user)
    dispatch('fetchRules')
  },
  // signs user up and saves doc in firebase with set() method
  async signUp ({ dispatch }, form) {
    const { user } = await firebase.auth.createUserWithEmailAndPassword(form.email, form.password)
    await firebase.usersCollection.doc(user.uid).set({
      email: form.email,
      password: form.password
    })
    dispatch('fetchUserProfile', user)
  },
  // get() for user profile via user.uid
  async fetchUserProfile ({ commit }, user) {
    const userProfile = await firebase.usersCollection.doc(user.uid).get()
    commit('setUserProfile', userProfile.data())
    if (router.currentRoute.path === '/login') {
      router.push('/')
    }
  },
  // fetches rules, sets cards array to fetched rules
  async fetchRules ({ commit }) {
    const rule = firebase.rulesCollection
    const snapshot = await rule.get()
    const ruleData = []
    snapshot.forEach(el => ruleData.push(el.data()))
    commit('setRuleCards', ruleData)
  },
  // logs user out and resets current user obj
  async logout ({ commit }) {
    await firebase.auth.signOut()
    commit('setUserProfile', {})
    router.push('/login')
  },
  // add card from add card form
  async submitRule ({ commit }, card) {
    commit('addRule', card)
  },
  // appends card to UI
  async appendCard ({ commit }, card) {
    const rules = firebase.rulesCollection
    const ruleSet = await rules.get()
    const ruleId = ruleSet.docs[card.idx].id
    await rules.doc(ruleId).update({
      active: true
    })
    commit('activateRule', card)
  },
  // update/clear form fields
  async showUpdateField ({ commit }, card) {
    const rules = firebase.rulesCollection
    const ruleSet = await rules.get()
    const ruleId = ruleSet.docs[card.idx].id
    await rules.doc(ruleId).update({
      updating: !card.updating
    })
    commit('updateCardField', card)
  },
  // update card in Cards and pinnedcards arrays
  async updateCard ({ dispatch, commit }, card) {
    const rules = firebase.rulesCollection
    const ruleSet = await rules.get()
    const ruleId = ruleSet.docs[card.idx].id
    await rules.doc(ruleId).update({
      title: card.title,
      text: card.text,
      updating: !card.updating
    })
    dispatch('fetchRules')
    commit('replaceCardRule', card)
  },
  // annotate
  annotateCard: ({ commit }, card) => {
    commit('submitAnnotation', card)
  },
  // deletes card in Cards and pinnedCards arrays
  async hidePin ({ commit }, card) {
    const rules = firebase.rulesCollection
    const ruleSet = await rules.get()
    const ruleId = ruleSet.docs[card.idx].id
    await rules.doc(ruleId).update({
      active: false
    })
    commit('removeCard', card)
  },
  // filters by type
  filterAction: ({ commit }, type) => {
    commit('filterRules', type)
  }
}
