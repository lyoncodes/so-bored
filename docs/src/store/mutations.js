
export default {
  // updateState function handles all dispatched actions, updating the state per the data's properties
  updateState (state, data) {
    const post = state.posts.find(el => el.id === data.id)
    if (data.payload === 'updatePost') {
      post.title = data.title
      post.text = data.text
      post.updating = !data.updating
    } else if (data.payload === 'togglePostUpdateFields') {
      post.updating = !data.updating
    }
    if (data.payload === 'deleteLink') {
      const filteredArr = post.links.filter((el) => {
        return (el.linkSerial !== data.linkSerial) ? el : null
      })
      post.links = filteredArr
    }
  },
  // update userProfile in the state to the user passed on login / logout
  setUserProfile (state, val) {
    state.userProfile = val
  },
  // set posts in state to the posts retrieved from db
  sortPosts (state, posts) {
    state.posts = posts
  },
  sortComments (state, comment) {
    const post = state.posts.find(el => el.id === comment.reference)
    post.comments.push(comment)
  },
  removeComment (state, comment) {
    const post = state.posts.find(el => el.id === comment.reference)
    const filteredArr = post.comments.filter((el) => {
      return el.serialId !== comment.serialId
    })
    post.comments = filteredArr
  },
  sortLinks (state, link) {
    const post = state.posts.find(el => el.id === link.reference)
    post.links.push(link)
  },
  removeLink (state, link) {
    const post = state.posts.find(el => el.id === link.reference)
    const filteredLinks = post.links.filter((el) => {
      return el.serialId !== link.serialId
    })
    post.links = filteredLinks
  },
  populateImages (state, assets) {
    state.imgFolder.push(assets)
    state.imgFolder = state.imgFolder.sort()
  },
  clearImages (state) {
    state.imgFolder = []
  }
}
