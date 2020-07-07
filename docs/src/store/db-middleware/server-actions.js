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
    const userProfile = await firebase.usersCollection.doc(user.uid).get()
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
  }  
}