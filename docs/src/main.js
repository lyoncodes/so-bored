import Vue from 'vue'
import { BContainer, BRow, BCol, BForm, BFormTextarea, BFormText, BFormGroup, BFormInput } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import App from './App.vue'
import router from './router'
import store from './store'
import { auth } from '../firebase'

Vue.component('b-container', BContainer)
Vue.component('b-row', BRow)
Vue.component('b-col', BCol)
Vue.component('b-form', BForm)
Vue.component('b-form-text', BFormText)
Vue.component('b-form-textarea', BFormTextarea)
Vue.component('b-form-group', BFormGroup)
Vue.component('b-form-input', BFormInput)

Vue.config.productionTip = false

let app
// check app state for current user on page refresh
auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
  if (user) {
    store.dispatch('fetchUserProfile', user)
    store.dispatch('fetchPosts')
    // trigger welcome animation here:
  }
  if (!store.state.imgFolder.length) {
    store.dispatch('fetchImageAssets')
  }
})
