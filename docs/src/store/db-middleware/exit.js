import * as firebase from '../../../firebase'
import router from '../../router/index'
// logs user out and resets current user obj
async function logout ({ commit }) {
  await firebase.auth.signOut()
  commit('setUserProfile', {})
  router.push('/login')
}
export { logout }
