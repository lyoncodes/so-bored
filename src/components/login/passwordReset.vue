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
        b-row.justify-content-center
          button.neu-b-button(
            type="submit"
            @click="resetPassword(resetData)"
          ) Send

  div(v-else)
    h4 Success
    p.pt-1 okay I sent them.
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
    }
  }
}
</script>
<style scoped lang="scss">

</style>
