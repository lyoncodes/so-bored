<template lang="pug">
  b-container#login-container
    b-row.justify-content-center.pt-5
      b-col.col-8.col-lg-4(v-if="showLoginForm && !toggleCredentials")
        loginForm(v-on:toggleBoolean="toggleSignUp")
      b-col.col-8.col-lg-4(v-if="!showLoginForm && !toggleCredentials")
        signUpForm(v-on:toggle="toggleSignUp")
      b-col.col-8.col-lg-4(v-if="toggleCredentials")
        passwordReset(v-on:resetForms="toggleResetForm")
      b-col.col-8.col-lg-12(v-if="!toggleCredentials")
        a.login-menu-link(@click="toggleResetForm") forgot password
</template>
<script>
import { mapActions } from 'vuex'
import signUpForm from '../components/navigation/signUpForm'
import loginForm from '../components/navigation/loginForm'
import passwordReset from '../components/navigation/passwordReset'
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
    loginForm,
    passwordReset
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
