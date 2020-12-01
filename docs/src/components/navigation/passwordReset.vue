<template lang="pug">
  div(v-if="!showSuccess")
    b-form(
      @submit.prevent
    )
      .p-2
        b-col.mt-4
          img.form-header-icon.mb-4(src='../../assets/doDoA.svg')
          h4 Password Recovery
          b-form-group#reset-email
            b-row
              a.validation-char.pl-3 enter your email & I will send you instructions
            b-form-input(
              v-model="resetData"
              type="email"
            )
          button.neu-c-button.mt-3(type="submit" @click="resetPassword(resetData)") Send
          .col.pt-4
            a.login-menu-link(@click="toggleSignUp") Back to Login
  div(v-else)
    img.form-header-icon.mb-4(src='../../assets/doDoA.svg')
    h4 Success
    p.pt-1 Ok. I sent them.
    a.login-menu-link(@click="toggleSignUp") Back to Login
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      resetData: '',
      showSuccess: false
    }
  },
  methods: {
    ...mapActions([
      'resetCredential'
    ]),
    resetPassword (resetData) {
      this.resetCredential(resetData)
      this.showSuccess = !this.showSuccess
    },
    toggleSignUp () {
      this.$emit('resetForms')
    }
  }
}
</script>
<style scoped lang="scss">

</style>
