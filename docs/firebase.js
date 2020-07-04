import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDx77VYbPiGJn3-taC8jh1i1lishX2xRk8',
  authDomain: 'unearth-docs-72b0a.firebaseapp.com',
  databaseURL: 'https://unearth-docs-72b0a.firebaseio.com',
  projectId: 'unearth-docs-72b0a',
  storageBucket: 'unearth-docs-72b0a.appspot.com',
  messagingSenderId: '72124022510',
  appId: '1:72124022510:web:a230a8bd0c2b2fe1be3dff',
  measurementId: 'G-28FV5MVQH1'
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection
}
