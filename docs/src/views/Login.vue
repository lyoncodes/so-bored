<template lang="pug">
  b-container
    b-row.justify-content-center.mt-5
      b-col.col-md-8.col-lg-4
        b-form(
          @submit.prevent="handleLogin(loginData)"
        )
          b-card.p-2
            h1 Login
            b-col.mt-4
              b-form-group#login-email
                b-row
                  a.validation-char name@unearthlabs.com
                b-form-input(
                  v-model="loginData.email"
                  type="text"
                )
              b-form-group#login-password
                b-row
                  a.validation-char Password
                b-form-input(
                  v-model="loginData.password"
                  type="text"
                  placeholder="********"
                )
              b-button.login-btn(type="submit") Log In
              b-row.justify-content-center
                b-button.signUp-btn(
                  @click="toggleSignUp"
                ) Sign Up
        signUpForm(
          v-if="!showLoginForm"
        )
</template>
<script>
import { mapActions } from 'vuex'
import signUpForm from '../components/navigation/signUpForm'
export default {
  data () {
    return {
      loginData: {
        email: '',
        password: ''
      },
      showLoginForm: true
    }
  },
  components: {
    signUpForm
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
    }
  }
}
</script>
<style scoped lang="scss">

</style>
