<template lang="pug">
  b-form(
    @submit.prevent="handleSignUp(signUpForm)"
  )
    .p-2
      b-col.mt-4
        img.form-header-icon.mb-4(src='../../assets/main-logo.svg')
        h4 Create Your Account
        b-form-group#account-email
          b-row
            a.validation-char login email
          b-form-input(
            v-model="signUpForm.email"
            type="text"
          )
        b-form-group#account-username
          b-row
            a.validation-char username
          b-form-input(
            v-model="signUpForm.username"
            type="text"
          )
        b-form-group#account-password
          b-row
            a.validation-char password
          b-form-input(
            v-model="signUpForm.password"
            type="text"
          )
        button.neu-c-button.mt-3(type="submit") Join
        .mt-3
        a.login-menu-link.pt-5(type="submit" @click="toggleForm()") Go Back
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'signUpForm',
  data () {
    return {
      signUpForm: {
        email: '',
        username: '',
        password: ''
      },
      toggleBoolean: false
    }
  },
  computed: {
    ...mapState([
      'userProfile'
    ])
  },
  methods: {
    ...mapActions([
      'signUp'
    ]),
    handleSignUp () {
      const { email, username, password } = this.signUpForm
      const signUpData = {
        email,
        username,
        password
      }
      if (email && password && username) {
        this.signUp(signUpData)
      }
    },
    toggleForm () {
      this.toggleBoolean = !this.toggleBoolean
      this.$emit('toggle', this.toggleBoolean)
    }
  }
}
</script>
<style scoped lang="scss">

</style>
