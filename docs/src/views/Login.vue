<template lang="pug">
  //- login container
  b-container
    b-row.justify-content-center.pt-5
      p.validation-char(v-if="errorMsg.length") {{errorMsg}}

      b-col.col-11.col-lg-4(v-if="showLoginForm && !toggleCredentials")
        loginForm(v-on:toggleBoolean="toggleSignUp")

      b-col.col-11.col-lg-4(v-if="!showLoginForm && !toggleCredentials")
        signUpForm(v-on:toggle="toggleSignUp")

      b-col.col-11.col-lg-4(v-if="toggleCredentials")
        passwordReset(v-on:resetForms="toggleResetForm")

      b-col.col-11.col-lg-12(v-if="!toggleCredentials")
        b-row.justify-content-center.mt-3
          a.link-style-alt(@click="toggleResetForm") forgot password
</template>
<script>
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
