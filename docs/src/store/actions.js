import * as firebase from '../../firebase'
import { firestore } from 'firebase'
import router from '../router/index'
import { readPost } from './db-middleware/readPost'
import { updatePost } from './db-middleware/updatePost'
import { togglePostComponents } from './db-middleware/togglePostComponents'
import state from './state'

export default {
  // MESSAGE BOARD FUNCTIONALITY
  // SIGNS USER UP
  async signUp ({ dispatch }, form) {
    const { user } = await firebase.auth.createUserWithEmailAndPassword(form.email, form.password)
    await firebase.usersCollection.doc(user.uid).set({
      email: form.email,
      username: form.username,
      password: form.password
    })
    dispatch('fetchUserProfile', user)
  },
  // LOGS USER IN
  async login ({ dispatch }, form) {
    const { user } = await firebase.auth.signInWithEmailAndPassword(form.email, form.password)
    dispatch('fetchUserProfile', user)
    dispatch('fetchPosts')
  },
  // GET() USER PROFILE
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
  // FETCHES POSTS FROM DB & ATTACHES COMMENTS
  async fetchPosts ({ commit, dispatch }) {
    await firebase.postsCollection.orderBy('createdOn', 'desc').onSnapshot(snapshot => {
      const dataStore = []

      snapshot.forEach(async (el) => {
        const post = el.data()
        post.createdOn = post.createdOn.toDate()
        post.id = el.id
        post.idx = snapshot.length + 1
        post.active = null
        post.updating = null
        post.displayLinks = null
        post.comments = []
        post.links = []

        const commentsRef = await firebase.commentsCollection.where('reference', '==', post.id).get()
        commentsRef.forEach(doc => {
          const comment = doc.data()
          comment.id = doc.id
          post.comments.push(comment)
        })

        const linksRef = await firebase.linksCollection.where('reference', '==', post.id).get()
        linksRef.forEach(doc => {
          post.links.push(doc.data())
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

  // CREATES POST
  async createPost ({ dispatch }, data) {
    await firebase.postsCollection.add({
      createdOn: new Date(),
      userId: firebase.auth.currentUser.uid,
      userName: data.userName,
      title: data.title,
      text: data.text
    })
    dispatch('refreshPosts', data)
  },
  // GET()s POSTS COLLECTION FOR UPDATING/REFRESHING STATE
  async refreshPosts ({ commit }) {
    const postRef = await firebase.postsCollection.orderBy('createdOn', 'desc')
    commit('sortPosts', postRef)
  },

  readPost, // READ POST
  updatePost, // UPDATE POST
  // DELETE POST
  async deletePost ({ commit }, data) {
    await firebase.postsCollection.doc(data.id).delete()
    commit('removePost', data)
  },
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
  // GET()s COMMENTS COLLECTION FOR UPDATING/REFRESHING STATE
  async refreshComments ({ commit }, comment) {
    const commentsRef = await firebase.commentsCollection.where('serialId', '==', comment.serialId).get()
    console.log(commentsRef)

    commentsRef.forEach((el) => {
      const comment = el.data()
      commit('sortComments', comment)
    })
  },
  // DELETES COMMENT
  async deleteComment ({ commit, dispatch }, comment) {
    await firebase.commentsCollection.doc(`${comment.id}`).delete()
    commit('removeComment', comment)
  },
  // CREATES LINK
  createLink ({ commit, dispatch }, link) {
    dispatch('mapRes', link).then((res) => {
      res.update({
        links: firestore.FieldValue.arrayUnion(link)
      })
    })
    link.payload = 'createLink'
    commit('updateState', link)
  },
  // DELETES LINK
  deleteLink ({ commit, dispatch }, data) {
    dispatch('mapRes', data).then((res) => {
      data.payload = 'createLink'
      res.update({
        links: firestore.FieldValue.arrayRemove(data)
      })
    })
    data.payload = 'deleteLink'
    commit('updateState', data)
  },
  togglePostComponents // COMPONENT STATE TOGGLING
}
