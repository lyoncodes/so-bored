import * as firebase from '../../firebase'
import { firestore } from 'firebase'
import { login, fetchUserProfile, signUp } from './db-middleware/auth'
import { logout } from './db-middleware/exit'
import { fetchRules, fetchRuleCollection } from './db-middleware/fetch'
import { mapRes } from './db-middleware/mapRes'

export default {
  // CALL STACK
  signUp,
  login,
  fetchUserProfile,
  logout,
  fetchRules,
  fetchRuleCollection,
  mapRes,
  async actionThis ({ commit, dispatch }, data) {
    if (data.payload === 'addRule') {
      await firebase.rulesCollection.add({
        locked: data.locked,
        type: data.type,
        title: data.title,
        text: data.text,
        active: data.active,
        updating: data.updating,
        comments: data.comments,
        links: data.links,
        displayComments: data.displayComments,
        displayLinks: data.displayLinks
      })
      dispatch('fetchRules')
    }
    dispatch('mapRes', data).then(async (res) => {
      if (data.payload === 'deleteRule') {
        res.delete()
      }
      if (data.payload === 'toggleShow') {
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
      if (data.payload === 'updateRule') {
        res.update({
          title: data.title,
          text: data.text,
          updating: !data.updating
        })
      }
      if (data.payload === 'toggleComments') {
        res.update({
          displayComments: !data.displayComments
        })
      }
      if (data.payload === 'toggleLinks') {
        res.update({
          displayLinks: !data.displayLinks
        })
      }
      if (!data.commentType && !data.ref) {
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
      if (data.ref) {
        data.payload = 'addLink'
        res.update({
          links: firestore.FieldValue.arrayRemove(data)
        })
        data.payload = 'deleteLink'
      }
      commit('updateState', data)
    })
  },
  async attachLink ({ commit, dispatch }, link) {
    dispatch('mapRes', link).then(async (res) => {
      await res.update({
        links: firestore.FieldValue.arrayUnion(link)
      })
    })
    commit('updateState', link)
  },
  // filters by type
  filterAction: ({ commit }, type) => {
    commit('filterRules', type)
  }
}
