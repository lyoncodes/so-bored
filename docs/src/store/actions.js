import * as firebase from '../../firebase'
import { firestore } from 'firebase'
import router from '../router/index'
import { readPost } from './db-middleware/readPost'
import { updatePost } from './db-middleware/updatePost'
import { deletePost } from './db-middleware/deletePost'
import { togglePostComponents } from './db-middleware/togglePostComponents'

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
  async fetchUserProfile ({ commit }, user) {
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
  // LOGS USER OUT
  async logout ({ commit }) {
    await firebase.auth.signOut()
    commit('setUserProfile', {})
    router.push('/login')
  },
  // FETCHES POSTS FROM DB
  async fetchPosts ({ commit }) {
    const rule = firebase.rulesCollection
    const snapshot = await rule.get()
    const rulePayload = []
    snapshot.forEach((el) => {
      const rule = el.data()
      rule.id = el.id
      rule.dateToFormat = rule.createdOn.toDate()
      rulePayload.push(rule)
    })
    commit('sortPosts', rulePayload)
  },
  // GET() POST DATA
  async fetchPostSnapshot () {
    const rule = firebase.rulesCollection
    const snapshot = await rule.get()
    return snapshot.docs
  },
  // GET() IMAGES
  async fetchImageAssets ({ commit }) {
    const imgStore = await firebase.storage.refFromURL('gs://itoio-e3548.appspot.com/images/')
    imgStore.listAll().then((res) => {
      res.items.forEach((el) => {
        el.getDownloadURL().then((url) => {
          commit('populateImages', url)
        })
      })
    })
    // const imgRef = ['neon-logo.png', 'bg-wash.png', 'edit-post.png']
    // imgRef.forEach(async (el) => {
    //   await imgStore.child(`images/${el}`).getDownloadURL().then((url) => {
    //     commit('populateImages', url)
    //   })
    // })
  },
  // MAP DB RESPONSES FOR FRONT-END ARRAYS
  async mapRes ({ dispatch }, data) {
    return new Promise((resolve, reject) => {
      dispatch('fetchPostSnapshot').then((res) => {
        res.map((el) => {
          return el.id === data.id ? resolve(firebase.rulesCollection.doc(data.id)) : null
        })
      })
    })
  },
  // CREATES POST
  async createPost ({ dispatch }, data) {
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
    // Calls fetchPosts()
    dispatch('fetchPosts')
  },
  readPost, // READ POST
  updatePost, // UPDATE POST
  deletePost, // DELETE POST
  // CREATES COMMENT
  async createComment ({ commit, dispatch }, data) {
    dispatch('mapRes', data).then(async (res) => {
      if (data.commentType && !data.ref) {
        res.update({
          comments: firestore.FieldValue.arrayUnion(data)
        })
      }
    })
    commit('updateState', data)
  },
  // DELETES COMMENT
  async deleteComment ({ commit, dispatch }, data) {
    dispatch('mapRes', data).then(async (res) => {
      if (!data.commentType && !data.ref && data.payload !== 'togglePostEdit') {
        // if it's none of those things, then it must be a comment!
        data.commentType = true
        res.update({
          comments: firestore.FieldValue.arrayRemove(data)
        })
        data.commentType = false
      }
    })
    commit('updateState', data)
  },
  // CREATES LINK
  async createLink ({ commit, dispatch }, link) {
    dispatch('mapRes', link).then(async (res) => {
      res.update({
        links: firestore.FieldValue.arrayUnion(link)
      })
    })
    link.payload = 'createLink'
    commit('updateState', link)
  },
  // DELETES LINK
  async deleteLink ({ commit, dispatch }, data) {
    dispatch('mapRes', data).then(async (res) => {
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
