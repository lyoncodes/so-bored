import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { auth } from '../firebase'

Vue.config.productionTip = false
Vue.config.devtools = true

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
    store.state.userProfile = user
  }
})
