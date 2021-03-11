<template lang="pug">
//- Update Alias Form ============
b-col.post.col-12.ml-0
  h1 Before posting, you'll need a pseudonym...
  b-form(
    @submit.prevent="updateProfile"
  )
    b-form-textarea#update-profile-textarea(
      v-model="updateProfileData.displayName"
      placeholder="alias"
    )
    button#update-profile.post-navigation-button.m-0.mt-1(
      type="submit"
    )
      IconBase(
        icon-name="comment"
        height="15"
        width="15"
      )
        IconComment
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'AccountProfile',
  components: {
    postComponent: () => import('../components/post/postComponent'),
    IconBase: () => import('../components/IconBase'),
    IconComment: () => import('../components/icons/IconComment')
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
    updateProfile () {
      this.userProfile.updateProfile({
        displayName: this.updateProfileData.displayName
      })
    }
  }
}
</script>
<style scoped lang="scss">
</style>
