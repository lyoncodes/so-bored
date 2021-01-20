<template lang="pug">
  b-form(
    @submit.prevent="handleSignUp(signUpForm)"
  )
    .p-2
      b-col.mt-4
        b-row.justify-content-center
          img.form-header-icon.mb-4(src='../../assets/tellTales.svg')
        b-row.justify-content-center
          b-form-group#account-email.col-12.mb-0
            b-row
              a.validation-char.ml-1.mb-1 login email
            b-row
              b-form-input.sign-up-form(
                v-model="signUpForm.email"
                type="text"
              )
          b-form-group#account-username.col-12.mb-0
            b-row
              a.validation-char.ml-1.mb-1 tell tales username
            b-row
              b-form-input.sign-up-form(
                v-model="signUpForm.username"
                type="text"
              )
          b-form-group#account-password.col-12
            b-row
              a.validation-char.ml-1.mb-1 password
            b-row
              b-form-input.sign-up-form(
                @keyup="validateCharCount()"
                @keydown.enter.prevent="handleSignUp(signUpForm)"
                v-model="signUpForm.password"
                type="text"
              )
            a.validation-char.ml-1.mb-1(
            ) {{signUpForm.password.length}} / {{formChar.passwordLength}}
          button.neu-c-button.mt-3(type="submit") Join
        b-row.justify-content-center
          a.link-style-main.pt-5(type="submit" @click="toggleForm()") Back to Login
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
      formChar: {
        passwordLength: 6
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
    },
    validateCharCount () {
    }
  }
}
</script>
<style scoped lang="scss">

</style>
