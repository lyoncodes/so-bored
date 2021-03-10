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
        button.neu-a-button.mt-5(
          type="submit"
        ) Login
      b-row.justify-content-center.pt-5
        a.link-style-alt(
          @click="toggleSignUp"
        ) Sign Up
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
    IconLogo: () => import('../icons/IconLogo')
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    handleLogin (loginData) {
      this.login(loginData)
    },
    toggleSignUp () {
      this.$emit('toggleSignUp')
    }
  }
}
</script>
<style scoped lang="scss">
</style>
