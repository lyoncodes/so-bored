<template lang="pug">
  b-container
    b-row.justify-content-center.pt-5
      b-col.col-sm-8.col-lg-4(v-if="showLoginForm")
        b-form(
          @submit.prevent="handleLogin(loginData)"
        )
          .p-2
            b-col.mt-4
              img.form-header-icon.mb-4(src='../assets/doDoA.svg')
              b-form-group#login-email
                b-row
                  a.validation-char email
                b-form-input(
                  v-model="loginData.email"
                  type="text"
                )
              b-form-group#login-password
                b-row
                  a.validation-char password
                b-form-input(
                  v-model="loginData.password"
                  type="password"
                )
              button.neu-c-button.mt-3(type="submit") Log In
              b-row.justify-content-center.pt-3
                span New user?
                a.pl-1(
                  @click="toggleSignUp"
                ) Sign Up
      b-col.col-md-8.col-lg-4(v-if="!showLoginForm")
        signUpForm(v-on:toggle="toggleSignUp")
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
