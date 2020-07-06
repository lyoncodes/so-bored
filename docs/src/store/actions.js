import * as firebase from '../../firebase'
import router from '../router/index'
export default {
  async login ({ dispatch }, form) {
    const { user } = await firebase.auth.signInWithEmailAndPassword(form.email, form.password)
    // fetch user profile and set to state
    dispatch('fetchUserProfile', user)
  },
  async fetchUserProfile ({ commit }, user) {
    // fetch user profile
    const userProfile = await firebase.usersCollection.doc(user.uid).get()
    // set user profile to state
    commit('setUserProfile', userProfile.data())
    // change route
    if (router.currentRoute.path === '/login') {
      router.push('/')
    }
  },
  async signUp ({ dispatch }, form) {
    const { user } = await firebase.auth.createUserWithEmailAndPassword(form.email, form.password)
    // create user object in userCollection
    await firebase.usersCollection.doc(user.uid).set({
      email: form.email,
      password: form.password
    })
    dispatch('fetchUserProfile', user)
  },
  async logout ({ commit }) {
    await firebase.auth.signOut()
    // clear profile, redirect to /login
    commit('setUserProfile', {})
    router.push('/login')
  },
  // add card from add card form
  submitRule: ({ commit }, card) => {
    commit('addRule', card)
  },
  // "plugIn" card to board after switch is active
  pinCard: ({ commit }, card) => {
    commit('appendPin', card)
  },
  // update/clear form fields
  showUpdateField: ({ commit }, card) => {
    commit('updateCardField', card)
  },
  // update card in Cards and pinnedcards arrays
  updateCard: ({ commit }, card) => {
    commit('replaceCardRule', card)
  },
  // annotate
  annotateCard: ({ commit }, card) => {
    commit('submitAnnotation', card)
  },
  // deletes card in Cards and pinnedCards arrays
  hidePin: ({ commit }, card) => {
    commit('removeCard', card)
  },
  // filters by type
  filterAction: ({ commit }, type) => {
    commit('filterRules', type)
  }
}
