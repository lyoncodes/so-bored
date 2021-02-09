<template lang="pug">
  b-container#login-container
    b-row.justify-content-center.pt-5
      b-col.col-11.col-lg-4(v-if="showLoginForm && !toggleCredentials")
        loginForm(v-on:toggleBoolean="toggleSignUp")
      b-col.col-11.col-lg-4(v-if="!showLoginForm && !toggleCredentials")
        signUpForm(v-on:toggle="toggleSignUp")
      b-col.col-11.col-lg-4(v-if="toggleCredentials")
        passwordReset(v-on:resetForms="toggleResetForm")
      b-col.col-11.col-lg-12(v-if="!toggleCredentials")
        b-row.justify-content-center
          a.link-style-main(@click="toggleResetForm") forgot password
</template>
<script>
import { mapActions } from 'vuex'

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
    signUpForm: () => import('../components/login/signUpForm'),
    loginForm: () => import('../components/login/loginForm'),
    passwordReset: () => import('../components/login/passwordReset')
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
  }
}
</script>
<style scoped lang="scss">

</style>
