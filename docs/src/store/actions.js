import * as firebase from '../../firebase'
import router from '../router/index'
import { firestore } from 'firebase'

export default {
  // logs user in
  async login ({ dispatch }, form) {
    const { user } = await firebase.auth.signInWithEmailAndPassword(form.email, form.password)
    dispatch('fetchUserProfile', user)
    dispatch('fetchRules')
  },
  // logs user out and resets current user obj
  async logout ({ commit }) {
    await firebase.auth.signOut()
    commit('setUserProfile', {})
    router.push('/login')
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
    snapshot.forEach((el) => {
      const rule = el.data()
      rule.id = el.id
      ruleData.push(rule)
    })
    commit('setRuleCards', ruleData)
  },
  // get() rulesCollection
  async fetchRuleCollection () {
    const rule = firebase.rulesCollection
    const snapshot = await rule.get()
    return snapshot.docs
  },
  // add card from add card form
  async submitRule ({ commit, dispatch }, card) {
    commit('addRule', card)
    dispatch('fetchRules')
  },
  // updates card in firebase to active
  async appendCard ({ commit, dispatch }, card) {
    dispatch('fetchRuleCollection').then((res) => {
      res.map((el) => {
        if (el.id === card.id) {
          if (!el.active) {
            firebase.rulesCollection.doc(card.id).update({
              active: true
            })
          }
        }
      })
    })
    commit('activateRule', card)
  },
  // Toggles card.active property value in database
  async toggleShow ({ commit, dispatch }, card) {
    dispatch('fetchRuleCollection').then((res) => {
      res.map(async (el) => {
        if (el.id === card.id) {
          const ref = firebase.rulesCollection.doc(card.id)
          if (card.active) {
            await ref.update({
              active: true
            })
          } else {
            await ref.update({
              active: false
            })
          }
        }
      })
    })
  },
  // update/clear form fields
  async showUpdateField ({ commit, dispatch }, card) {
    dispatch('fetchRuleCollection').then((res) => {
      const ruleId = res[card.idx - 1].id
      firebase.rulesCollection.doc(ruleId).update({
        updating: !card.updating
      })
    })
    commit('updateCardField', card)
  },
  // update card in Cards and pinnedcards arrays
  async updateCard ({ commit, dispatch }, card) {
    dispatch('fetchRuleCollection').then((res) => {
      const ruleId = res[card.idx - 1].id
      firebase.rulesCollection.doc(ruleId).update({
        title: card.title,
        text: card.text,
        updating: !card.updating
      })
    })
    commit('replaceCardRule', card)
  },
  // annotate
  async annotateCard ({ commit, dispatch }, card) {
    dispatch('fetchRuleCollection').then(async (res) => {
      const ruleId = res[card.idx - 1].id
      const ref = firebase.rulesCollection.doc(ruleId)
      await ref.update({
        annotations: firestore.FieldValue.arrayUnion(card)
      })
    })
    commit('submitAnnotation', card)
  },
  // filters by type
  filterAction: ({ commit }, type) => {
    commit('filterRules', type)
  }
}
