<template lang="pug">
  b-form(
    @submit.prevent="handleLogin(userCredentials)"
  )
    b-col
      b-row.justify-content-center
        b-form-group.col-12.mb-2
          b-row
            a.link-disabled.ml-1.mb-1 email
          b-row
            b-form-input.inline-input-lg(
              v-model="userCredentials.email"
              type="text"
            )

        b-form-group.col-12
          b-row
            a.link-disabled.ml-1.mb-1 password
          b-row
            b-form-input.inline-input-lg(
              @keydown.enter.prevent="handleLogin(userCredentials)"
              v-model="userCredentials.password"
              type="password"
            )

      b-row.justify-content-center
        button.action-button-lg(
          type="submit"
        ) Login
</template>
<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      userCredentials: {
        email: '',
        password: ''
      }
    }
  },
  components: {
    IconBase: () => import('../IconBase'),
    IconLogo: () => import('../icons/IconLogo'),
    IconGoogle: () => import('../icons/IconGoogle')
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    handleLogin (userCredentials) {
      this.login(userCredentials)
    }
  }
}
</script>
<style scoped lang="scss">
</style>
