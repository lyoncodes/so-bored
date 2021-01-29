import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/firestore'
import '@firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDGs4h23pMfAAcyR7rMhtYap2Lyq1yVVOs',
  authDomain: 'itoio-e3548.firebaseapp.com',
  databaseURL: 'https://itoio-e3548.firebaseio.com',
  projectId: 'itoio-e3548',
  storageBucket: 'itoio-e3548.appspot.com',
  messagingSenderId: '147268643356',
  appId: '1:147268643356:web:a2075616b7e9de53d70dd9',
  measurementId: 'G-SBF957DP30'
}
firebase.initializeApp(firebaseConfig)

// utils
const fs = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

// collection references
const usersCollection = fs.collection('users')
const postsCollection = fs.collection('posts')
const commentsCollection = fs.collection('comments')
const linksCollection = fs.collection('links')

// export utils/refs
export {
  fs,
  auth,
  storage,
  usersCollection,
  postsCollection,
  commentsCollection,
  linksCollection
}
