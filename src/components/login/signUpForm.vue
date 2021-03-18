<template lang="pug">
  b-form(
    @submit.prevent="handleSignUp"
  )
    b-col
      b-row.justify-content-center
        b-form-group#account-email.col-12.mb-2
          b-row
            a.link-style-alt.ml-1.mb-1 login email
          b-row
            b-form-input.login-input(
              v-model="signUpForm.email"
              type="text"
            )

        b-form-group#account-password.col-12
          b-row
            a.link-style-alt.ml-1.mb-1 password
          b-row
            b-form-input.login-input(
              @keydown.enter.prevent="handleSignUp()"
              v-model="signUpForm.password"
              type="password"
            )
          b-row
            a.link-style-alt.mt-1(
              :class="errorObject"
            ) {{signUpForm.password.length}} / {{formChar.passwordLength}}

        button.neu-a-button.mt-3(type="submit") Join

      b-row.justify-content-center
        a.link-style-alt.pt-5(type="submit" @click="toggleForm()") Back to Login
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'signUpForm',
  data () {
    return {
      signUpForm: {
        email: '',
        password: ''
      },
      formChar: {
        passwordLength: 6
      },
      toggleBoolean: false
    }
  },
  computed: {
    errorObject: function () {
      return {
        valid: this.signUpForm.password.length > this.formChar.passwordLength ? true : null
      }
    }
  },
  methods: {
    ...mapActions([
      'signUp'
    ]),

    handleSignUp () {
      const { email, password } = this.signUpForm
      const newUser = {
        email,
        password
      }
      if (email && password) {
        this.signUp(newUser)
      }
    },

    toggleForm () {
      this.toggleBoolean = !this.toggleBoolean
      this.$emit('toggleForm', this.toggleBoolean)
    }
  }
}
</script>
<style scoped lang="scss">
</style>
