import * as firebase from '../../../firebase'
import router from '../../router/index'
// logs user in
async function login ({ dispatch }, form) {
  const { user } = await firebase.auth.signInWithEmailAndPassword(form.email, form.password)
  dispatch('fetchUserProfile', user)
  dispatch('fetchRules')
}
// get() for user profile via user.uid
async function fetchUserProfile ({ commit }, user) {
  const userProfile = await firebase.usersCollection.doc(user.uid).get()
  commit('setUserProfile', userProfile.data())
  if (router.currentRoute.path === '/login') {
    router.push('/')
  }
}
export { login, fetchUserProfile }
