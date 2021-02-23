<template lang="pug">
  b-form(
    @submit.prevent="handleSignUp(signUpForm)"
  )
    b-col.mt-4.pt-2
      b-row.justify-content-center

        b-form-group#account-email.col-12.mb-0
          b-row
            a.validation-char.ml-1.mb-1 login email
          b-row
            b-form-input(
              v-model="signUpForm.email"
              type="text"
            )

        b-form-group#account-username.col-12.mb-0
          b-row
            a.validation-char.ml-1.mb-1 tell tales username
          b-row
            b-form-input(
              v-model="signUpForm.username"
              type="text"
            )

        b-form-group#account-password.col-12
          b-row
            a.validation-char.ml-1.mb-1 password
          b-row
            b-form-input(
              @keyup="validateCharCount()"
              @keydown.enter.prevent="handleSignUp(signUpForm)"
              v-model="signUpForm.password"
              type="password"
            )
          a.validation-char.ml-1.mb-1(
            :class="errorObject"
          ) {{signUpForm.password.length}} / {{formChar.passwordLength}}

        button.neu-c-button.mt-3(type="submit") Join

      b-row.justify-content-center
        a.link-style-alt.pt-5(type="submit" @click="toggleForm()") Back to Login
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'signUpForm',
  data () {
    return {
      signUpForm: {
        email: '',
        username: '',
        password: ''
      },
      formChar: {
        passwordLength: 6
      },
      toggleBoolean: false
    }
  },
  computed: {
    ...mapState([
      'userProfile'
    ]),
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
      this.$emit('toggleForm', this.toggleBoolean)
    },

    validateCharCount () {
    }
  }
}
</script>
<style scoped lang="scss">
</style>
