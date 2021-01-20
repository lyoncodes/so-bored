export default {
  // updateState function handles all dispatched actions, updating the state per the data's properties
  updateState (state, data) {
    const ruleEl = state.posts.find(el => el.id === data.id)
    if (data.payload === 'deletePost') {
      const filteredArr = state.posts.filter((el) => {
        return (el.id !== data.id) ? el : null
      })
      state.posts = filteredArr
    } else if (data.payload === 'updatePost') {
      ruleEl.title = data.title
      ruleEl.text = data.text
      ruleEl.updating = !data.updating
    } else if (data.payload === 'togglePostEdit') {
      ruleEl.updating = !data.updating
    } else if (data.payload === 'toggleComments') {
      ruleEl.displayComments = !data.displayComments
    } else if (data.commentType) {
      ruleEl.comments.push(data)
    } else if (!data.commentType) {
      const filteredArr = ruleEl.comments.filter(el => {
        return (el.commentSerial !== data.commentSerial) ? el : null
      })
      ruleEl.comments = filteredArr
    }
    if (data.payload === 'createLink') {
      ruleEl.links.push(data)
    }
    if (data.payload === 'deleteLink') {
      const filteredArr = ruleEl.links.filter((el) => {
        return (el.linkSerial !== data.linkSerial) ? el : null
      })
      ruleEl.links = filteredArr
    }
  },
  // update userProfile in the state to the user passed on login
  setUserProfile (state, val) {
    state.userProfile = val
  },
  // set posts in state to the posts retrieved from db
  sortPosts (state, rulePayload) {
    state.posts = rulePayload.sort((a, b) => {
      return b.createdOn.seconds - a.createdOn.seconds
    })
  },
  populateImages (state, asset) {
    state.imgFolder.push(asset)
  }
}
