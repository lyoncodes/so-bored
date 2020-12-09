<template lang="pug">
  div.mt-5.p-0
    b-col.mt-4.form-container
      b-form(@submit.prevent="handleSubmit")
        b-col
          //- h5 knack knack
          //- glyphs(@addtype="submitType")
          b-form-group.mt-5(id="input-title")
            b-form-input#title-input(
              v-model="formData.title"
              @keyup="validateCharCount()"
              required
              contenteditable
              placeholder="Title"
              )
            a.validation-char(
              v-bind:class="errorObject"
            ) {{formChar.titleCount}} / {{formChar.titleLimit}}
          b-form-group(id="input-card-text")
            b-form-textarea(
              id="card-text"
              v-model="formData.text"
              @keyup="validateCharCount()"
            )
            a.validation-char(
              v-bind:class="errorObject"
            ) {{formChar.charCount}} / {{formChar.charLimit}}
          b-form-group
            b-form-radio(
              id="unlock"
              v-model="formData.locked"
              :value="false"
              variant="light"
            )
              img.card-icon-sm(src='../assets/Unlock.svg')
            b-form-radio(
              id="lock"
              v-model="formData.locked"
              :value="true"
              variant="light"
            )
              img.card-icon-sm(src='../assets/Lock.svg')
              img.card-icon-sm.ml-3(v-if="showConfirm" src='../assets/Valid.svg')
          button.neu-c-button(type="submit") Post
          button.neu-c-button(type="reset" @click="toggleCardForm") Nah
</template>
<script>
import { mapActions, mapState } from 'vuex'
import glyphs from '../components/card/glyphs'

export default {
  name: 'Home',
  components: {
    glyphs
  },
  data () {
    return {
      showCardForm: false,
      showConfirm: false,
      buttonText: {
        toggleMsg: 'New Post',
        errorMsg: 'Nah'
      },
      formChar: {
        titleCount: 0,
        titleLimit: 140,
        charCount: 0,
        charLimit: 300,
        confirmation: String,
        errorMsg: String,
        isError: false
      },
      formData: {
        locked: false,
        title: '',
        text: '',
        type: '',
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
      'Glyphs',
      'rules'
    ]),
    errorObject: function () {
      return {
        error: this.formData.title.length > this.formChar.titleLimit || this.formData.text.length > this.formChar.charLimit ? true : null
      }
    }
  },
  methods: {
    ...mapActions([
      'mother'
    ]),
    toggleCardForm () {
      this.showCardForm = !this.showCardForm
    },
    validateCharCount () {
      this.formChar.charCount = this.formData.text.length
      this.formChar.titleCount = this.formData.title.length
      this.formChar.errorMsg = this.formData.title.length > this.formChar.titleLimit || this.formData.text.length > this.formChar.charLimit ? 'Too Many Characters' : null
    },
    submitType (glyphs) {
      this.formData.type = glyphs
    },
    handleSubmit () {
      const { locked, title, text, type, active, updating, comments, links, displayComments, displayLinks } = this.formData
      const author = this.userProfile.username
      const idx = this.rules.length + 1
      const card = {
        author,
        locked,
        title,
        text,
        type,
        idx,
        active,
        updating,
        comments,
        links,
        displayComments,
        displayLinks
      }
      if (card.text.length > this.formChar.charLimit || card.title.length > this.formChar.titleLimit) {
        return alert('Error handling: fix length')
      }
      card.payload = 'addRule'
      this.mother(card)
      this.resetForm()
    },
    resetForm () {
      this.formData = {
        locked: false,
        title: '',
        text: '',
        type: '',
        active: false,
        updating: false,
        comments: [],
        links: [],
        commentType: false,
        displayComments: false,
        displayLinks: false
      }
      this.showConfirm = true
      this.formChar = {
        titleCount: 0,
        titleLimit: 140,
        charCount: 0,
        charLimit: 300
      }
    }
  },
  mounted () {
    const glyphs = this.Glyphs
    this.glyphs = glyphs
  }
}
</script>
<style scoped lang="scss">
.postFormActive{
  color: $lime-green;
  -webkit-appearance: none;
  background-color: $background-slate;
  box-shadow: $box-shadow-light-inset;
}
.error {
  color: $cotton-candy !important;
}
.icon-trigger{
  border: 0em;
  box-shadow: none;
  &:active, :focus, :hover{
  background: $border-g !important;
  outline: none;
  }
}
#handle-cancel{
  border: 0em;
  box-shadow: none;
  margin: 0;
  padding: .25em .25em .25em 2.6em;
}
.custom-control {
  display: inline;
}
</style>
