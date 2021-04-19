export default {
  // handle errors
  handleError (state, error) {
    state.errorMsg = error
  },
  // update userProfile in the state to the user passed on login / logout
  setUserProfile (state, data) {
    state.userProfile.displayName = data
  },
  showPostForm (state) {
    state.showPostForm = !state.showPostForm
  },
  updatePosts (state, data) {
    state.posts = data
  },
  updateLinks (state, data) {
    state.links = data
  },
  updateComments (state, data) {
    state.comments = data
  }
}
