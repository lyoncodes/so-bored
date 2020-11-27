<template lang="pug">
  b-form(
    @submit.prevent="handleLogin(loginData)"
  )
    .p-2
      b-col.mt-4
        img.form-header-icon.mb-4(src='../../assets/doDoA.svg')
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
        b-row.justify-content-center.pt-5
          span New user?
          a.pl-1(
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
      this.$emit('toggleBoolean')
    }
  }
}
</script>
<style scoped lang="scss">

</style>
