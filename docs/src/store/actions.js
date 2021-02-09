import * as firebase from '../../firebase'
import router from '../router/index'
import state from './state'
import mutations from './mutations'

firebase.postsCollection.orderBy('createdOn', 'desc').onSnapshot(snapshot => {
  console.log('called')
  const posts = []
  snapshot.forEach(async (doc) => {
    const post = doc.data()
    post.id = doc.id

    posts.push(post)
  })
  mutations.updatePosts(state, posts)
})

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
  // Updates post in db
  async updatePost ({ dispatch }, postUpdate) {
    const post = firebase.postsCollection.doc(postUpdate.id)
    await post.update({
      title: postUpdate.title,
      text: postUpdate.text
    })
  },
  // Deletes post & post comments from db
  async deletePost ({ dispatch }, post) {
    await firebase.postsCollection.doc(post.id).delete()
    const commentsRef = await firebase.commentsCollection.where('reference', '==', post.id).get()
    commentsRef.forEach((comment) => {
      comment.ref.delete()
    })
  }

}
