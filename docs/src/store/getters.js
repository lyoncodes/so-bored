export default {
  userPosts: (state) => {
    state.posts.filter((post) => {
      return post.userName === state.userProfile.username
    })
  }
}
