import * as firebase from '../../../firebase'
// map response for id, return found value
async function mapRes ({ dispatch }, data) {
  return new Promise((resolve, reject) => {
    dispatch('fetchPostSnapshot').then((res) => {
      res.map((el) => {
        return el.id === data.id ? resolve(firebase.rulesCollection.doc(data.id)) : null
      })
    })
  })
}
export { mapRes }
