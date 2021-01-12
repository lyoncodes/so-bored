import * as firebase from '../../../firebase'
import router from '../../router/index'
// logs user out and resets current user obj, pushes the /login page to the router to re-direct user to login component
async function logout ({ commit }) {
  await firebase.auth.signOut()
  commit('setUserProfile', {})
  router.push('/login')
}
export { logout }
