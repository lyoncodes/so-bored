<template lang="pug">
  b-form(
    @submit.prevent="handleLogin(userCredentials)"
  )
    b-col
      b-row.justify-content-center
        b-form-group#login-email.col-12.mb-2
          b-row
            a.link-style-alt.ml-1.mb-1 email
          b-row
            b-form-input#login-form-email.login-input(
              v-model="userCredentials.email"
              type="text"
            )

        b-form-group#login-password.col-12
          b-row
            a.link-style-alt.ml-1.mb-1 password
          b-row
            b-form-input#login-form-password.login-input(
              @keydown.enter.prevent="handleLogin(userCredentials)"
              v-model="userCredentials.password"
              type="password"
            )

      b-row.justify-content-center
        button.neu-b-button(
          type="submit"
        ) Login
</template>
<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      userCredentials: {
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
      'login'
    ]),
    handleLogin (userCredentials) {
      this.login(userCredentials)
    }
  }
}
</script>
<style scoped lang="scss">
</style>
