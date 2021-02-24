<template lang="pug">
  b-form(
    @submit.prevent="handleLogin(loginData)"
  )
      b-col.mt-4.pt-2
        b-row.justify-content-center
          b-form-group#login-email.col-12.mb-0
            b-row
              a.validation-char.ml-1.mb-1 email
            b-row
              b-form-input#login-form-textarea(
                v-model="loginData.email"
                type="text"
              )

          b-form-group#login-password.col-12
            b-row
              a.validation-char.ml-1.mb-1 password
            b-row
              b-form-input#login-form-password(
                @keydown.enter.prevent="handleLogin(loginData)"
                v-model="loginData.password"
                type="password"
              )

        b-row.justify-content-center
          button.neu-a-button.mt-5(type="submit") Login

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
