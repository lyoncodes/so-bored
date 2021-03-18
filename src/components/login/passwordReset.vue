<template lang="pug">
  div(v-if="!showSuccess")
    b-form(
      @submit.prevent="resetPassword(resetData)"
    )
      b-col
        b-row.justify-content-center
        b-row.justify-content-center
          b-form-group#reset-email.col-12.mb-0
            b-row
              a.link-style-alt.ml-1.mb-1 recovery email
            b-row
              b-form-input.login-input(
                v-model="resetData"
                type="email"
              )
          button.neu-a-button.mt-3(type="submit" @click="resetPassword(resetData)") Send

        b-row.justify-content-center
          a.link-style-alt.pt-5(@click="toggleSignUp") Back to Login
  div(v-else)
    h4 Success
    p.pt-1 okay I sent them.
    a.link-style-alt(@click="toggleSignUp") Back to Login
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
