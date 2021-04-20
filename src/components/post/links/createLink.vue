<template lang="pug">
b-col.col-12.p-0.mt-2
  b-form(
    @submit.prevent="append"
  )
    b-form-textarea.inline-input(
      autofocus
      v-model="link.linkText"
      placeholder="link title"
    )

    b-form-textarea.inline-input.mt-1(
      @keydown.enter.prevent="append()"
      v-model="link.linkURL"
      placeholder="https://"
    )

    b-row.justify-content-between
      a.validation-char.mt-1(
        :class="errorObject"
      ) {{this.link.linkText.length}} / {{ validation.commentLimit}}
      button.pill-button.mr-3(
        type="submit"
        :disabled="this.link.linkText.length > this.validation.commentLimit"
      ) Link

</template>
<script>
export default {
  name: 'CreateLink',
  props: {
    validation: {
      type: Object,
      required: true
    }
  },
  components: {
    postLinks: () => import('./postLinks')
  },
  data () {
    return {
      link: {
        linkText: '',
        linkURL: ''
      }
    }
  },
  computed: {
    errorObject: function () {
      return {
        error: this.link.linkText.length > this.validation.commentLimit ? true : null
      }
    }
  },
  methods: {
    append () {
      const link = { ...this.link }
      this.$emit('append', link)
      this.link = {
        linkText: '',
        linkURL: ''
      }
    },

    redirect (link) {
      window.location.href = `https://${link.linkURL}`
    }
  }
}
</script>
<style scoped lang="scss">
</style>
