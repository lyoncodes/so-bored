<template lang="pug">
  b-form(
    @submit.prevent="handleLogin(loginData)"
  )
    b-col
      b-row.justify-content-center
        b-form-group#login-email.col-12.mb-2
          b-row
            a.link-style-alt.ml-1.mb-1 email
          b-row
            b-form-input#login-form-textarea.login-input(
              v-model="loginData.email"
              type="text"
            )

        b-form-group#login-password.col-12
          b-row
            a.link-style-alt.ml-1.mb-1 password
          b-row
            b-form-input#login-form-password.login-input(
              @keydown.enter.prevent="handleLogin(loginData)"
              v-model="loginData.password"
              type="password"
            )

      b-row.justify-content-center
        button.neu-b-button(
          type="submit"
        ) Login
      b-row.justify-content-center.hr
      b-row.justify-content-center
        button.neu-b-button#google-button(
          @click="googleLogin"
        )
          IconBase#google-logo.mr-2(
            icon-name="Google"
            height="20"
            width="20"
          )
            IconGoogle
          a Continue with Google
</template>
<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      loginData: {
        email: '',
        password: ''
      }
    }
  },
  components: {
    IconBase: () => import('../IconBase'),
    IconLogo: () => import('../icons/IconLogo'),
    IconGoogle: () => import('../icons/IconGoogle')
  },
  methods: {
    ...mapActions([
      'login',
      'loginWithGoogle'
    ]),
    googleLogin () {
      this.loginWithGoogle()
    },
    handleLogin (loginData) {
      this.login(loginData)
    }
  }
}
</script>
<style scoped lang="scss">
</style>
