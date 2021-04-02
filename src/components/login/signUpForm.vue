<template lang="pug">
  b-form(
    @submit.prevent="handleSignUp"
  )
    b-col
      b-row.justify-content-center
        b-form-group.col-12.mb-2
          b-row
            a.link-disabled.ml-1.mb-1 login email
          b-row
            b-form-input.inline-input-lg(
              v-model="signUpForm.email"
              type="text"
            )

        b-form-group.col-12
          b-row.justify-content-between
            a.link-disabled.ml-1.mb-1 password
            a.link-disabled(
              :class="errorObject"
            ) {{signUpForm.password.length}} / {{formChar.passwordLength}}
          b-row
            b-form-input.inline-input-lg(
              @keydown.enter.prevent="handleSignUp()"
              v-model="signUpForm.password"
              type="password"
            )
      b-row.justify-content-center
        button.action-button-lg(
          type="submit"
        ) Create Account

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
      }
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
    }
  }
}
</script>
<style scoped lang="scss">
</style>
