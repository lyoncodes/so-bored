import * as firebase from '../../firebase'
import router from '../router/index'

export default {
  // LOGIN OPERATIONS
  // Creates account; adding user object to usersCollection
  async signUp ({ dispatch }, form) {
    const { user } = await firebase.auth.createUserWithEmailAndPassword(form.email, form.password).catch(error => dispatch('handleError', error.message))
    await firebase.usersCollection.doc(user.uid).set({
      email: form.email,
      username: form.username,
      password: form.password
    })
  },
  // Logs user in; dispatches methods to create user profile and retrieve application posts
  async login ({ dispatch, commit }, form) {
    await firebase.auth.signInWithEmailAndPassword(form.email, form.password).catch(error => commit('handleError', error.message))
  },
  // Gets user profile; calls setUserProfile mutation and routes to home, dispatches fetch Data
  async fetchUserProfile ({ commit, dispatch }, user) {
    const userProfile = await firebase.usersCollection.doc(user.uid).get()
    commit('setUserProfile', userProfile.data())
    dispatch('readPosts')
    if (router.currentRoute.path === '/login') {
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
  },

  readPostComments ({ commit }) {
    firebase.commentsCollection.limit(250).onSnapshot(snapshot => {
      console.log(snapshot)
      const comments = []

      snapshot.forEach((c) => {
        const comment = c.data()
        comment.id = c.id
        comments.push(comment)
      })

      commit('updateComments', comments)
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
  }
}
