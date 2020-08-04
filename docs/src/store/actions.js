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
  // get() rulesCollection
  async fetchRuleCollection () {
    const rule = firebase.rulesCollection
    const snapshot = await rule.get()
    return snapshot.docs
  },
  // map response for id, return found value
  async mapRes ({ dispatch }, data) {
    return new Promise((resolve, reject) => {
      dispatch('fetchRuleCollection').then((res) => {
        res.map((el) => {
          return el.id === data.id ? resolve(firebase.rulesCollection.doc(data.id)) : null
        })
      })
    })
  },
  async actionThis ({ commit, dispatch }, data) {
    if (data.payload === 'addRule') {
      await firebase.rulesCollection.add({
        locked: data.locked,
        type: data.type,
        title: data.title,
        text: data.text,
        active: data.active,
        updating: data.updating,
        comments: data.comments,
        links: data.links
      })
      dispatch('fetchRules')
    }
    dispatch('mapRes', data).then(async (res) => {
      if (data.payload === 'deleteRule') {
        res.delete()
      }
      if (data.payload === 'toggleShow') {
        if (data.active) {
          await res.update({
            active: true
          })
        } else {
          await res.update({
            active: false
          })
        }
      }
      if (data.payload === 'toggleUpdateFields') {
        res.update({
          updating: !data.updating
        })
      }
      if (data.payload === 'updateRule') {
        res.update({
          title: data.title,
          text: data.text,
          updating: !data.updating
        })
      }
      if (!data.commentType) {
        data.commentType = true
        res.update({
          comments: firestore.FieldValue.arrayRemove(data)
        })
        data.commentType = false
      }
      if (data.commentType) {
        res.update({
          comments: firestore.FieldValue.arrayUnion(data)
        })
      }
      commit('updateState', data)
    })
  },
  async attachLink ({ commit, dispatch }, link) {
    dispatch('mapRes', link).then(async (res) => {
      await res.update({
        links: firestore.FieldValue.arrayUnion(link)
      })
    })
    link.payload = 'addLink'
    commit('updateState', link)
  },
  // filters by type
  filterAction: ({ commit }, type) => {
    commit('filterRules', type)
  }
}
