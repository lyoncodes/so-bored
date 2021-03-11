import * as firebase from '../../firebase'
import router from '../router/index'

export default {
  // LOGIN OPERATIONS
  // Creates authenticated account
  signUp ({ dispatch }, form) {
    firebase.auth.createUserWithEmailAndPassword(form.email, form.password).catch(error => dispatch('handleError', error.message))
  },
  // Logs user in; dispatches methods to create user profile and retrieve application posts
  login ({ dispatch, commit }, form) {
    firebase.auth.signInWithEmailAndPassword(form.email, form.password)
      .catch(error => {
        commit('handleError', error.message)
      })
  },
  // Logs user in w/ Google 3PA; triggers onAuthStateChanged in main.js
  loginWithGoogle ({ dispatch, commit }) {
    const provider = new firebase.authObj.GoogleAuthProvider()
    firebase.auth.signInWithPopup(provider)
      .catch(error => dispatch('handleError', error.message))
      .then(data => {
        dispatch('fetchUserProfile', data)
      })
  },
  // Sets user profile to current user, fetches data & re-routes to Home
  async fetchUserProfile ({ commit, dispatch }, user) {
    dispatch('readPosts')
    if (router.currentRoute.path === '/login' && user.additionalUserInfo.isNewUser) {
      router.push('/accountProfile')
    } else if (router.currentRoute.path === '/login') {
      router.push('/')
    }
  },
  // Resets password
  async resetCredential ({ commit }, email) {
    await firebase.auth.sendPasswordResetEmail(email)
  },
  // Logs user out
  async logout ({ commit, dispatch }) {
    await firebase.auth.signOut()
    commit('setUserProfile', {})
    router.push('/login')
  },

  // POST CRUD OPERATIONS
  // Read posts
  readPosts ({ commit, dispatch }) {
    firebase.postsCollection.orderBy('createdOn', 'desc').limit(50).onSnapshot(snapshot => {
      const posts = []

      snapshot.forEach((doc) => {
        const post = doc.data()
        post.id = doc.id
        posts.push(post)
      })
      commit('updatePosts', posts)
    })
    dispatch('readPostComments')
    dispatch('readPostLinks')
  },

  readPostComments ({ commit }) {
    firebase.commentsCollection.limit(500).onSnapshot(snapshot => {
      const comments = []

      snapshot.forEach((c) => {
        const comment = c.data()
        comment.id = c.id
        comments.push(comment)
      })

      commit('updateComments', comments)
    })
  },

  readPostLinks ({ commit }) {
    firebase.linksCollection.limit(250).onSnapshot(snapshot => {
      const links = []

      snapshot.forEach((l) => {
        const link = l.data()
        link.id = l.id
        links.push(link)
      })

      commit('updateLinks', links)
    })
  },

  // Creates post in db
  async createPost ({ commit }, post) {
    await firebase.postsCollection.add({
      title: post.title,
      text: post.text,
      createdOn: post.createdOn,
      userName: post.userName,
      userId: firebase.auth.currentUser.uid
    })
  },
  // Updates post in db
  async updatePost ({ commit }, postUpdateData) {
    const post = firebase.postsCollection.doc(postUpdateData.id)
    await post.update({
      title: postUpdateData.title,
      text: postUpdateData.text
    })
  },
  // Deletes post & post comments from db
  async deletePost ({ commit }, post) {
    await firebase.postsCollection.doc(post.id).delete()
    const commentsRef = await firebase.commentsCollection.where('reference', '==', post.id).get()
    commentsRef.forEach((comment) => {
      comment.ref.delete()
    })
  },
  async createComment ({ commit }, comment) {
    await firebase.commentsCollection.add({
      createdOn: comment.createdOn,
      text: comment.text,
      userName: comment.userName,
      reference: comment.reference
    })
  },
  async createLink ({ commit }, link) {
    await firebase.linksCollection.add({
      createdOn: link.createdOn,
      linkText: link.linkText,
      linkURL: link.linkURL,
      userName: link.userName,
      reference: link.reference
    })
  }
}
