import * as firebase from '../../../firebase'
async function createPost ({ commit, dispatch }, data) {
  await firebase.rulesCollection.add({
    createdOn: new Date(),
    userId: firebase.auth.currentUser.uid,
    userName: data.author,
    title: data.title,
    text: data.text,
    active: data.active,
    updating: data.updating,
    comments: data.comments,
    links: data.links,
    displayComments: data.displayComments,
    displayLinks: data.displayLinks
  })
  // Reads Post
  dispatch('fetchPosts')
}
export { createPost }
