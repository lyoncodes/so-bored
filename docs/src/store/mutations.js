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
  sortPosts (state, data) {
    state.posts.posts = data.posts
    state.posts.comments = data.comments
  },
  updatePosts (state, data) {
    state.posts = data
  },
  selectPost (state, post) {
    state.selectedPost = post
  },
  deselectPost (state) {
    state.selectedPost = {}
  },
  sortLinks (state, links) {
    state.posts.links = links
  },
  appendLink (state, link) {
    state.selectPost.links[state.selectPost.linkListSize++] = link
  },
  removeLink (state, link) {
    const post = state.posts.find(el => el.id === link.reference)
    const foundAt = post.links.findIndex(el => el === link)
    if (post) {
      post.links.splice(foundAt, 1)
      --post.linksListSize
    }
  },
  clearLinks (state, comment) {
    delete state.selectPost.links
    state.selectPost.links = []
    state.selectPost.linksListSize = state.selectPost.pos = 0
  },
  populateImages (state, assets) {
    setTimeout(() => {
      state.imgStore.push(assets)
      state.imgStore = state.imgStore.sort()
    }, 500)
  },
  clearImages (state) {
    state.imgStore = []
  }
}
