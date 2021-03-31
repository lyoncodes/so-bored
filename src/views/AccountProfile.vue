<template lang="pug">
b-container
  //- Logo and login error msg
  b-row
    IconBase#main-logo(
      icon-name="Comment"
      height="100"
      width="100"
    )
      IconLogo
  //- Update Alias Form ============
  b-col.card.col-12.ml-0
    .pt-1.pl-2.pr-2
      b-row.pl-4.pt-3
          h1 Welcome, {{this.userProfile.displayName || 'friend'}}!
      b-form(
        @submit.prevent="updateProfile"
      )
        b-form-input.mt-2.mb-3(
          v-model="updateProfileData.displayName"
          @keydown.enter.prevent="updateProfile()"
          placeholder="what's your username?"
          autofocus
          rows="1"
          max-rows="1"
        )
        button.action-button-lg.mt-1.mb-3(
          type="submit"
        ) GO
</template>
<script>
import { mapState, mapActions } from 'vuex'
import router from '../router/index'
export default {
  name: 'AccountProfile',
  components: {
    router,
    postComponent: () => import('../components/post/postComponent'),
    IconBase: () => import('../components/IconBase'),
    IconLogo: () => import('../components/icons/IconLogo')
  },
  data () {
    return {
      updateProfileData: {
        displayName: null
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
      'createUser'
    ]),
    updateProfile () {
      this.userProfile.updateProfile({
        displayName: this.updateProfileData.displayName
      })
      this.userProfile.displayName = this.updateProfileData.displayName
      this.createUser(this.userProfile)
      if (this.updateProfileData.displayName.length) {
        router.push('/')
      }
    }
  }
}
</script>
<style scoped lang="scss">
</style>
