import * as firebase from '../../../firebase'
import router from '../../router/index'
// logs user in
async function login ({ dispatch }, form) {
  const { user } = await firebase.auth.signInWithEmailAndPassword(form.email, form.password)
  dispatch('fetchUserProfile', user)
  dispatch('fetchPosts')
}
// get() for user profile via user.uid
async function fetchUserProfile ({ commit }, user) {
  const userProfile = await firebase.usersCollection.doc(user.uid).get()
  commit('setUserProfile', userProfile.data())
  if (router.currentRoute.path === '/login') {
    router.push('/')
  }
}
// signs user up and saves doc in firebase with set() method
async function signUp ({ dispatch }, form) {
  const { user } = await firebase.auth.createUserWithEmailAndPassword(form.email, form.password)
  await firebase.usersCollection.doc(user.uid).set({
    email: form.email,
    username: form.username,
    password: form.password
  })
  dispatch('fetchUserProfile', user)
}
export { login, fetchUserProfile, signUp }
