<template lang="pug">
  b-form(
    @submit.prevent="handleSignUp(signUpForm)"
  )
    b-card.p-2
      h1 Create Account
      b-col.mt-4
        b-form-group#account-email
          b-row
            a.validation-char email
          b-form-input(
            v-model="signUpForm.email"
            type="text"
          )
        b-form-group#account-password
          b-row
            a.validation-char Password
          b-form-input(
            v-model="signUpForm.password"
            type="password"
            placeholder="password"
          )
        b-button.signUp-btn(type="submit") Create Account
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'signUpForm',
  data () {
    return {
      signUpForm: {
        email: '',
        password: ''
      }
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
      const { email, password } = this.signUpForm
      const signUpData = {
        email,
        password
      }
      this.signUp(signUpData)
    }
  }
}
</script>
<style scoped lang="scss">

</style>
