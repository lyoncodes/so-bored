<template lang="pug">
  b-form(
    @submit.prevent="handleLogin(loginData)"
  )
    .p-2
      b-col.mt-4
        b-row.justify-content-center
          img.form-header-icon.mb-4(v-bind:src="imgFolder[3]")
        b-row.justify-content-center
          b-form-group#login-email.col-12.mb-0
            b-row
              a.validation-char.ml-1.mb-1 email
            b-row
              b-form-input.sign-up-form(
                v-model="loginData.email"
                type="text"
              )
          b-form-group#login-password.col-12
            b-row
              a.validation-char.ml-1.mb-1 password
            b-row
              b-form-input.sign-up-form(
                @keydown.enter.prevent="handleLogin(loginData)"
                v-model="loginData.password"
                type="password"
              )
        b-row.justify-content-center
          button.neu-c-button.mt-3(type="submit") Login
        b-row.justify-content-center.pt-5
          span New user?
          a.pl-1.link-style-main(
            @click="toggleSignUp"
          ) Sign Up
</template>
<script>
import { mapActions, mapState } from 'vuex'
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
  },
  computed: {
    ...mapState([
      'imgFolder'
    ])
  }
}
</script>
<style scoped lang="scss">

</style>
