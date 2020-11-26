<template lang="pug">
  b-container
    b-row.justify-content-center.pt-5
      b-col.col-sm-8.col-lg-4(v-if="showLoginForm")
        loginForm(v-on:toggleBoolean="toggleSignUp")
      b-col.col-md-8.col-lg-4(v-if="!showLoginForm")
        signUpForm(v-on:toggle="toggleSignUp")
</template>
<script>
import { mapActions } from 'vuex'
import signUpForm from '../components/navigation/signUpForm'
import loginForm from '../components/navigation/loginForm'
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
    signUpForm,
    loginForm
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
