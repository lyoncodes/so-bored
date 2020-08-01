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
  // fetches rules, calls mutation to assign fetched rules to rules array in state
  async fetchRules ({ commit }) {
    const rule = firebase.rulesCollection
    const snapshot = await rule.get()
    const rulePayload = []
    snapshot.forEach((el) => {
      const rule = el.data()
      rule.id = el.id
      rulePayload.push(rule)
    })
    commit('setRuleCards', rulePayload)
  },
  // get() rulesCollection
  async fetchRuleCollection () {
    const rule = firebase.rulesCollection
    const snapshot = await rule.get()
    return snapshot.docs
  },
  async mapRes ({ dispatch }, data) {
    return new Promise((resolve, reject) => {
      dispatch('fetchRuleCollection').then((res) => {
        res.map((el) => {
          return el.id === data.id ? resolve(firebase.rulesCollection.doc(data.id)) : null
        })
      })
    })
  },
  // add card from add card form
  async submitRule ({ commit, dispatch }, card) {
    await firebase.rulesCollection.add({
      locked: card.locked,
      type: card.type,
      title: card.title,
      text: card.text,
      active: card.active,
      updating: card.updating,
      annotations: card.annotations,
      links: card.links
    })
    commit('addRule', card)
    dispatch('fetchRules')
  },
  // delete card from db, calls mutation to remove card from rules in state
  async deleteCard ({ commit, dispatch }, card) {
    dispatch('mapRes', card).then(res => {
      res.delete()
    })
    commit('removeCard', card)
  },
  // updates card in firebase to active
  async appendCard ({ commit, dispatch }, card) {
    dispatch('mapRes', card).then(res => {
      res.update({
        active: true
      })
    })
    commit('activateRule', card)
  },
  // Toggles card.active property value in database
  async toggleShow ({ dispatch }, card) {
    dispatch('mapRes', card).then(async (res) => {
      if (card.active) {
        await res.update({
          active: true
        })
      } else {
        await res.update({
          active: false
        })
      }
    })
  },
  // update/clear form fields
  async showUpdateField ({ commit, dispatch }, card) {
    dispatch('mapRes', card).then((res) => {
      res.update({
        updating: !card.updating
      })
    })
    commit('updateCardField', card)
  },
  // update card in db and call mutation to update card in state
  async updateCard ({ commit, dispatch }, updateData) {
    dispatch('mapRes', updateData).then((res) => {
      res.update({
        title: updateData.title,
        text: updateData.text,
        updating: !updateData.updating
      })
    })
    commit('replaceCardRule', updateData)
  },
  // add annotation to annotation array of card object in db and call mutation to annotate card in state
  async annotateCard ({ commit, dispatch }, card) {
    dispatch('mapRes', card).then((res) => {
      res.update({
        annotations: firestore.FieldValue.arrayUnion(card)
      })
    })
    commit('submitAnnotation', card)
  },
  // delete annotation to annotation array of card object in db and call mutation to remove annotation in state
  async deleteAnnotation ({ commit, dispatch }, annotation) {
    dispatch('mapRes', annotation).then((res) => {
      res.update({
        annotations: firestore.FieldValue.arrayRemove(annotation)
      })
    })
    commit('removeAnnotation', annotation)
  },
  async attachLink ({ commit, dispatch }, link) {
    dispatch('mapRes', link).then(async (res) => {
      await res.update({
        links: firestore.FieldValue.arrayUnion(link)
      })
    })
    commit('addLink', link)
  },
  // filters by type
  filterAction: ({ commit }, type) => {
    commit('filterRules', type)
  }
}
