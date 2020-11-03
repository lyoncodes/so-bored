<template lang="pug">
  b-container.mt-5
    b-col
      button.neu-a-button(
        @click="toggleCardForm"
        v-bind:class="{postFormActive: showCardForm }")
        //- span {{ buttonText.toggleMsg }}
        img.card-icon(src="../assets/add.svg")
    b-col.mt-4(v-if="showCardForm")
      b-form(@submit.prevent="handleSubmit")
        b-col
          //- h5 knack knack
          //- glyphs(@addtype="submitType")
          b-form-group.mt-5(id="input-title")
            b-form-textarea#title-input(
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
              required
              placeholder="Enter Rule Text"
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
          img.card-icon(v-if="showConfirm" src='../assets/Valid.svg')
          b-button(type="submit")
            img.card-icon(src='../assets/add.svg')
          b-button(type="reset")
            img.card-icon(src='../assets/cancel.svg')
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
        toggleMsg: 'Neu',
        errorMsg: 'Nvm'
      },
      formChar: {
        titleCount: 0,
        titleLimit: 40,
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
      const idx = this.rules.length + 1
      const card = {
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
        titleLimit: 20,
        charCount: 0,
        charLimit: 300,
        confirmation: 'Added!'
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
  box-shadow: $box-shadow-dark-inset;
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
