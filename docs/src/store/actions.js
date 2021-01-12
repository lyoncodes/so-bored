import * as firebase from '../../firebase'
import { firestore } from 'firebase'
import { login, fetchUserProfile, signUp, resetCredential } from './db-middleware/auth'
import { logout } from './db-middleware/logout'
import { fetchPosts, fetchRuleCollection, fetchImageAssets } from './db-middleware/fetch'
import { mapRes } from './db-middleware/mapRes'
import { attachLink } from './db-middleware/attachLink'

export default {
  // MESSAGE BOARD CALL STACK
  signUp,
  login,
  resetCredential,
  fetchUserProfile,
  logout,
  fetchPosts,
  fetchRuleCollection,
  fetchImageAssets,
  mapRes,
  attachLink,
  async mother ({ commit, dispatch }, data) {
    console.log('momma says: ', data)
    if (data.payload === 'addRule') {
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
      dispatch('fetchPosts')
    }
    dispatch('mapRes', data).then(async (res) => {
      if (data.payload === 'deleteRule') {
        res.delete()
      }
      if (data.payload === 'toggleActive') {
        if (data.active) {
          await res.update({
            active: true
          })
        } else {
          await res.update({
            active: false
          })
        }
      }
      // update card title & text
      if (data.payload === 'updateRule' && !data.commentType) {
        res.update({
          title: data.title,
          text: data.text,
          updating: !data.updating
        })
      }
      // delete comment
      if (!data.commentType && !data.ref && data.payload !== 'toggleUpdateFields') {
        // if it's none of those things, then it must be a comment!
        data.commentType = true
        res.update({
          comments: firestore.FieldValue.arrayRemove(data)
        })
        data.commentType = false
      }
      if (data.commentType && !data.ref) {
        res.update({
          comments: firestore.FieldValue.arrayUnion(data)
        })
      }
      if (data.ref && !data.commentType) {
        data.payload = 'addLink'
        res.update({
          links: firestore.FieldValue.arrayRemove(data)
        })
        data.payload = 'deleteLink'
      }
      if (data.payload === 'toggleLinkForm') {
        data.displayLinks = !data.displayLinks
      }
      commit('updateState', data)
    })
  }
}
