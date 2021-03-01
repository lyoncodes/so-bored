export default {
  // handle errors
  handleError (state, error) {
    state.errorMsg = error
  },
  // update userProfile in the state to the user passed on login / logout
  setUserProfile (state, userProfile) {
    state.userProfile = userProfile
  },
  updatePosts (state, data) {
    state.posts = data
  },
  updateComments (state, data) {
    state.comments = data
  }
}
