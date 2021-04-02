<template lang="pug">
  //- login container
  b-container
    //- Logo and login error msg
    b-row
      IconBase#main-logo(
        icon-name="Comment"
        height="100"
        width="100"
      )
        IconLogo
    b-row.justify-content-center.pt-3
      p.link-style-alt(v-if="errorMsg.length") {{errorMsg}} 🤕

    b-row.justify-content-center
      b-col(v-if="showLoginForm")
        loginForm()

      b-col(v-if="!showLoginForm")
        signUpForm(v-on:toggleForm="toggleSignUp")

    b-row.justify-content-center.hr
    b-row.justify-content-center
      button.action-button-lg.logo-button(
        @click="googleLogin"
      )
        IconBase#google-logo.mr-2(
          icon-name="Google"
          height="20"
          width="20"
        )
          IconGoogle
        a Continue with Google
    b-col.mt-4
      b-row.justify-content-center
        a(
          @click="toggleSignUp"
        )
          p.link-style-main(v-if="showLoginForm") Sign Up
          p.link-style-main(v-if="!showLoginForm") Back to Login
</template>
<script>
import signUpForm from '../components/login/signUpForm'
import loginForm from '../components/login/loginForm'
import { mapState, mapActions } from 'vuex'

export default {

  data () {
    return {
      showLoginForm: true
    }
  },

  components: {
    signUpForm,
    loginForm,
    IconBase: () => import('../components/IconBase'),
    IconLogo: () => import('../components/icons/IconLogo'),
    IconGoogle: () => import('../components/icons/IconGoogle')
  },

  methods: {
    ...mapActions([
      'loginWithGoogle'
    ]),
    googleLogin () {
      this.loginWithGoogle()
    },
    toggleSignUp () {
      this.showLoginForm = !this.showLoginForm
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
