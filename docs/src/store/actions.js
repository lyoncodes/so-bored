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
    dispatch('fetchPosts')
  },

  // Gets user profile; calls setUserProfile mutation and routes to home
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
  // Retrieves post data from database and formats front-end posts
  async fetchPosts ({ commit, dispatch }) {
    await firebase.postsCollection.orderBy('createdOn', 'desc').onSnapshot(snapshot => {
      const dataStore = []

      snapshot.forEach(async (el) => {
        const post = el.data()
        post.createdOn = post.createdOn.toDate()
        post.id = el.id
        post.idx = snapshot.length + 1
        post.comments = []
        post.links = []

        // fetches post comments
        const commentsRef = await firebase.commentsCollection.where('reference', '==', post.id).get()
        commentsRef.forEach(doc => {
          const comment = doc.data()
          comment.id = doc.id
          post.comments.push(comment)
        })
        // fetches post links
        const linksRef = await firebase.linksCollection.where('reference', '==', post.id).get()
        linksRef.forEach(doc => {
          const link = doc.data()
          link.id = doc.id
          post.links.push(link)
        })

        dataStore.push(post)
      })
      commit('sortPosts', dataStore)
    })
  },

  // GET() IMAGES
  async fetchImageAssets ({ commit }) {
    if (state.imgFolder.length < 6) {
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
  async createPost ({ dispatch, commit }, post) {
    await firebase.postsCollection.add({
      title: post.title,
      text: post.text,
      serialId: post.serialId,
      createdOn: post.createdOn,
      userName: post.userName,
      userId: firebase.auth.currentUser.uid
    })
  },
  async updatePost ({ commit }, updateData) {
    console.log(updateData)
    const post = firebase.postsCollection.doc(updateData.id)
    await post.update({
      title: updateData.title,
      text: updateData.text
    })
  },
  // Deletes post & post comments from db
  async deletePost ({ commit }, post) {
    // Deletes post from postsCollection in db & state
    await firebase.postsCollection.doc(post.id).delete()
    // Queries for comments belonging to post & deletes them
    const commentsRef = await firebase.commentsCollection.where('reference', '==', post.id).get()
    commentsRef.forEach((comment) => {
      comment.ref.delete()
    })
  },

  // updatePost, // UPDATE POST

  // CREATES COMMENT
  async createComment ({ commit, dispatch }, comment) {
    await firebase.commentsCollection.add({
      createdOn: new Date(),
      text: comment.text,
      userName: comment.userName,
      reference: comment.reference,
      serialId: comment.serialId
    })
    dispatch('refreshComments', comment)
  },
  // DELETES COMMENT
  async deleteComment ({ commit, dispatch }, comment) {
    await firebase.commentsCollection.doc(`${comment.id}`).delete()
    commit('removeComment', comment)
  },
  // GET()s COMMENTS COLLECTION FOR UPDATING/REFRESHING STATE
  async refreshComments ({ commit }, comment) {
    const commentsRef = await firebase.commentsCollection.where('serialId', '==', comment.serialId).get()

    commentsRef.forEach((el) => {
      const comment = el.data()
      commit('sortComments', comment)
    })
  },

  // Creates link in db
  async createLink ({ dispatch }, link) {
    await firebase.linksCollection.add({
      linkText: link.linkText,
      linkURL: link.linkURL,
      userName: link.userName,
      reference: link.reference
    })
    dispatch('refreshLinks')
  },
  // DELETES LINK
  async deleteLink ({ commit }, link) {
    await firebase.linksCollection.doc(`${link.id}`).delete()
    commit('removeLink', link)
  },
  // Gets links collection fro updating/refreshing state
  async refreshLinks ({ commit }, link) {
    const linksRef = await firebase.linksCollection.where('reference', '==', link.reference).get()

    linksRef.forEach((el) => {
      const link = el.data()
      commit('sortLinks', link)
    })
  },
  togglePostComponents // COMPONENT STATE TOGGLING
}
