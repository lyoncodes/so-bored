import * as firebase from '../../firebase'
import router from '../router/index'
import { togglePostComponents } from './db-middleware/togglePostComponents'
import state from './state'

export default {
  // MESSAGE BOARD FUNCTIONALITY

  // Creates account; adding user object to usersCollection
  async signUp ({ dispatch }, form) {
    const { user } = await firebase.auth.createUserWithEmailAndPassword(form.email, form.password)
    await firebase.usersCollection.doc(user.uid).set({
      email: form.email,
      username: form.username,
      password: form.password
    })
    dispatch('fetchUserProfile', user)
  },

  // Logs user in; dispatches methods to create user profile and retrieve application posts
  async login ({ dispatch }, form) {
    const { user } = await firebase.auth.signInWithEmailAndPassword(form.email, form.password)
    dispatch('fetchUserProfile', user)
  },

  // Gets user profile; calls setUserProfile mutation and routes to home, dispatches fetch Data
  async fetchUserProfile ({ commit, dispatch }, user) {
    const userProfile = await firebase.usersCollection.doc(user.uid).get()
    commit('setUserProfile', userProfile.data())
    if (router.currentRoute.path === '/login') {
      router.push('/')
    }
  },

  // RESETS CREDENTIAL
  async resetCredential ({ commit }, email) {
    await firebase.auth.sendPasswordResetEmail(email)
    commit('resetLoginState')
  },
  // LOGS USER
  async logout ({ commit, dispatch }) {
    await firebase.auth.signOut()
    commit('setUserProfile', {})
    commit('clearImages')
    router.push('/login')
  },
  // GET() IMAGES
  async fetchImageAssets ({ commit }) {
    if (state.imgStore.length < 6) {
      const imgStore = await firebase.storage.refFromURL('gs://itoio-e3548.appspot.com/images/')
      imgStore.list({ maxResults: 6 }).then((res) => {
        res.items.forEach((el) => {
          el.getDownloadURL().then((url) => {
            commit('populateImages', url)
          })
        })
      })
    }
  },
  // GET() POST PROMISE DATA
  async fetchCommentSnapshot () {
    const rule = firebase.commentsCollection
    const snapshot = await rule.get()
    return snapshot.docs
  },
  // MAP DB RESPONSES FOR FRONT-END ARRAYS
  async mapRes ({ dispatch }, data) {
    return new Promise((resolve) => {
      dispatch('fetchCommentSnapshot').then((res) => {
        res.map((el) => {
          return el.id === data.id ? resolve(firebase.commentsCollection.doc(data.id)) : null
        })
      })
    })
  },

  // POST OPERATIONS
  // Creates post in db
  async createPost ({ dispatch }, post) {
    await firebase.postsCollection.add({
      title: post.title,
      text: post.text,
      createdOn: post.createdOn,
      userName: post.userName,
      userId: firebase.auth.currentUser.uid
    })
  },
  async updatePost ({ dispatch }, postUpdate) {
    const post = firebase.postsCollection.doc(postUpdate.id)
    await post.update({
      title: postUpdate.title,
      text: postUpdate.text
    })
  },
  // Deletes post & post comments from db
  async deletePost ({ dispatch }, post) {
    // Deletes post from postsCollection in db & state
    await firebase.postsCollection.doc(post.id).delete()
    // Queries for comments belonging to post & deletes them
    const commentsRef = await firebase.commentsCollection.where('reference', '==', post.id).get()
    commentsRef.forEach((comment) => {
      comment.ref.delete()
    })
  },

  // Creates link in db
  async createLink ({ commit }, link) {
    await firebase.linksCollection.add({
      linkText: link.linkText,
      linkURL: link.linkURL,
      userName: link.userName,
      reference: link.reference
    })
    await firebase.postsCollection.doc(`${link.reference}`).update({
      links: (state.selectedPost.linkListSize) + 1
    })
    commit('appendLink', link)
  },
  // DELETES LINK
  async deleteLink ({ commit }, link) {
    await firebase.linksCollection.doc(`${link.id}`).delete()
    commit('removeLink', link)
  },

  togglePostComponents // COMPONENT STATE TOGGLING
}
