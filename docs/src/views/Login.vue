<template lang="pug">
  b-container
    b-row.justify-content-center.mt-5
      b-col.col-md-4
        b-form(@submit.prevent="handleLogin(loginData)")
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
              b-form-group(id="login-password")
                b-row
                  a.validation-char Password
                b-form-input(
                  v-model="loginData.password"
                  type="text"
                  placeholder="********"
                )
              b-button#login-btn(type="submit") Enter
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
      return this.login(loginData)
    }
  }
}
</script>
<style scoped lang="scss">

</style>
