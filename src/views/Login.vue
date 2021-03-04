<template lang="pug">
  //- login container
  b-container
    b-row.mt-3.mb-3
      IconBase#main-logo(
        icon-name="Comment"
        height="100"
        width="100"
      )
        IconLogo
    b-row.justify-content-center.pt-3
      p.link-style-alt(v-if="errorMsg.length") {{errorMsg}} 🤕
    b-row.justify-content-center

      b-col(v-if="showLoginForm && !toggleCredentials")
        loginForm(v-on:toggleSignUp="toggleSignUp")

      b-col(v-if="!showLoginForm && !toggleCredentials")
        signUpForm(v-on:toggleForm="toggleSignUp")

      b-col(v-if="toggleCredentials")
        passwordReset(v-on:resetForms="toggleResetForm")

      b-col.col-11.col-lg-12(v-if="!toggleCredentials")
        b-row.justify-content-center.mt-3
          a.link-style-alt(@click="toggleResetForm") forgot password
</template>
<script>
import signUpForm from '../components/login/signUpForm'
import { mapActions, mapState } from 'vuex'

export default {

  data () {
    return {
      loginData: {
        email: '',
        password: ''
      },
      showLoginForm: true,
      toggleCredentials: false
    }
  },

  components: {
    signUpForm,
    loginForm: () => import('../components/login/loginForm'),
    passwordReset: () => import('../components/login/passwordReset'),
    IconBase: () => import('../components/IconBase'),
    IconLogo: () => import('../components/icons/IconLogo')
  },

  methods: {
    ...mapActions([
      'login'
    ]),
    handleLogin (loginData) {
      this.login(loginData)
    },
    toggleSignUp () {
      this.showLoginForm = !this.showLoginForm
    },
    toggleResetForm () {
      this.toggleCredentials = !this.toggleCredentials
      if (!this.showLoginForm) {
        this.showLoginForm = true
      }
    }
  },

  computed: {
    ...mapState([
      'errorMsg'
    ])
  }
}
</script>
<style scoped lang="scss">

</style>
