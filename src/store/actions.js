import * as firebase from '../../firebase'
import router from '../router/index'

export default {
  // LOGIN OPERATIONS
  // Creates authenticated account - ML
  signUp ({ commit, dispatch }, data) {
    firebase.auth.createUserWithEmailAndPassword(data.email, data.password)
      .catch(error => commit('handleError', error.message))
      .then(user => {
        if (!user.user.displayName) {
          router.push('/login/newUserName')
        }
      })
  },
  // Logs auth user in - ML
  login ({ commit }, data) {
    console.log(data)
    firebase.auth.signInWithEmailAndPassword(data.email, data.password)
      .catch(error => {
        commit('handleError', error.message)
      })
      .then(router.push('/'))
  },
  // Creates user in firebase user collection - ML
  createUser ({ commit }, data) {
    firebase.usersCollection.doc(data.uid).set({
      createdOn: new Date(),
      email: data.email,
      displayName: data.displayName
    })
  },
  // Logs user in w/ Google 3PA; triggers onAuthStateChanged in main.js - ML
  loginWithGoogle ({ commit }) {
    const provider = new firebase.authObj.GoogleAuthProvider()
    firebase.auth.signInWithPopup(provider)
      .catch(error => commit('handleError', error.message))
      .then(data => {
        data.additionalUserInfo.isNewUser ? router.push(`/login/${data.user.displayName}`) : router.push('/')
      })
  },
  // Sends password recovery to auth email - ML
  async resetCredential ({ commit }, email) {
    await firebase.auth.sendPasswordResetEmail(email)
  },
  // Logs auth user out - ML
  async logout ({ commit, dispatch }) {
    await firebase.auth.signOut()
    router.push('/login')
  },

  // DATA FETCH OPERATIONS
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
  // Read posts comments
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
  // Read posts links
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

  // POST CRUD OPERATIONS
  // Creates post in db collection - ML
  async createPost ({ commit }, post) {
    await firebase.postsCollection.add({
      title: post.title,
      text: post.text,
      createdOn: post.createdOn,
      userName: post.userName,
      userId: firebase.auth.currentUser.uid
    })
  },
  // Updates post in db collection - ML
  async updatePost ({ commit }, postUpdateData) {
    const post = firebase.postsCollection.doc(postUpdateData.id)
    await post.update({
      title: postUpdateData.title,
      text: postUpdateData.text
    })
  },
  // Deletes post & post comments from db collection - ML
  async deletePost ({ commit }, post) {
    await firebase.postsCollection.doc(post.id).delete()
    const commentsRef = await firebase.commentsCollection.where('reference', '==', post.id).get()
    commentsRef.forEach((comment) => {
      comment.ref.delete()
    })
  },
  // Creates comment in db collection - ML
  async createComment ({ commit }, comment) {
    await firebase.commentsCollection.add({
      createdOn: comment.createdOn,
      text: comment.text,
      userName: comment.userName,
      reference: comment.reference
    })
  },
  // Creates link in db collection - ML
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
