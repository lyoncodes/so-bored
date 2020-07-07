import * as firebase from '../../firebase'
import router from '../router/index'

export default {
  // logs user in and calls fetchUserProfile
  async login ({ dispatch }, form) {
    const { user } = await firebase.auth.signInWithEmailAndPassword(form.email, form.password)
    dispatch('fetchUserProfile', user)
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
    console.log('userfetched: ' + user.email)
    const userProfile = await firebase.usersCollection.doc(user.uid).get()
    console.log('userProf: ' + Object.keys(userProfile))
    commit('setUserProfile', userProfile.data())
    if (router.currentRoute.path === '/login') {
      router.push('/')
    }
  },
  // logs user out and resets current user obj
  async logout ({ commit }) {
    await firebase.auth.signOut()
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
