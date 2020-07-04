<template lang="pug">
  b-container
    b-row.justify-content-center.mt-5
      b-col.col-4
        b-form(@submit.prevent="handleLogin")
          b-card.p-2
            h1 Login
            b-col.mt-4
              b-form-group(id="login-email")
                b-row
                  a.validation-char name@unearthlabs.com
                b-form-input(
                  v-model="loginData.email"
                  type="text"
                )
              b-form-group(id="login-password")
                b-row
                  a.validation-char Password
                b-form-input(
                  v-model="loginData.password"
                  type="text"
                  placeholder="********"
                )
              b-button(type="submit") Enter
</template>
<script>
export default {
  data () {
    return {
      loginData: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    handleLogin () {
      console.log('here')
    }
  }
}
</script>
<style scoped lang="scss">
button{
  border: 1px solid $indigo
}
</style>
