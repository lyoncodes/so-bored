<template lang="pug">
  b-col.col-12.mt-4.p-0.form-container
    b-form(@submit.prevent="handleSubmit" v-bind:class="errorObject")
      b-col.form-content
        b-form-group.mt-3(id="input-title")
          b-form-input#title-input(
            v-model="formData.title"
            @keyup="validateCharCount()"
            autofocus
            required
            contenteditable
            placeholder="Title"
          )
          a.validation-char.ml-1 {{formChar.titleCount}} / {{validation.titleLimit}}
        b-form-group(id="input-card-text")
          b-form-textarea#post-form-textarea(
            @keyup="validateCharCount()"
            @keydown.enter.prevent="handleSubmit"
            v-model="formData.text"
            placeholder="Input text here"
          )
          a.validation-char.ml-1 {{formChar.charCount}} / {{validation.charLimit}}
        b-row.justify-content-center
          button.neu-c-button(type="reset" @click="toggleCardForm") Nvm
          button.neu-c-button(type="submit") Post
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'postForm',
  props: ['validation'],
  data () {
    return {
      formChar: {
        titleCount: 0,
        charCount: 0
      },
      formData: {
        title: '',
        text: '',
        active: false,
        updating: false,
        comments: [],
        links: [],
        displayComments: false,
        displayLinks: false
      }
    }
  },
  computed: {
    ...mapState([
      'userProfile',
      'posts'
    ]),
    errorObject: function () {
      return {
        error: this.formData.title.length > this.validation.titleLimit || this.formData.text.length > this.validation.charLimit ? true : null
      }
    }
  },
  methods: {
    ...mapActions([
      'mother'
    ]),
    toggleCardForm () {
      this.$emit('hideForm', this.formData.active)
    },
    validateCharCount () {
      this.formChar.charCount = this.formData.text.length
      this.formChar.titleCount = this.formData.title.length
      this.validation.errorMsg = this.formData.title.length > this.validation.titleLimit || this.formData.text.length > this.validation.charLimit ? 'Too Many Characters' : null
    },
    handleSubmit () {
      const { title, text, active, updating, comments, links, displayComments, displayLinks } = this.formData
      const author = this.userProfile.username
      const idx = this.posts.length + 1
      const card = {
        author,
        title,
        text,
        idx,
        active,
        updating,
        comments,
        links,
        displayComments,
        displayLinks
      }
      if (card.text.length > this.validation.charLimit || card.title.length > this.validation.titleLimit) {
        return alert('Error handling: fix length')
      }
      card.payload = 'addRule'
      this.mother(card)
      this.resetForm()
    },
    resetForm () {
      this.formData = {
        title: '',
        text: '',
        active: false,
        updating: false,
        comments: [],
        links: [],
        commentType: false,
        displayComments: false,
        displayLinks: false
      }
      this.formChar = {
        titleCount: 0,
        charCount: 0
      }
      this.$emit('hideForm', this.formData.active)
    }
  }
}
</script>
<style scoped lang="scss">
.error .validation-char {
  color: $candy-red!important;
}
</style>
