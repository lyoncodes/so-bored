<template lang="pug">
  b-card-group.card-grid
    b-container.card-container
      b-row
        b-col(md="4" v-for="card in pinnedCards" :key="card.title")
          b-card
            b-row.mb-4
              b-col.col-4.pr-0.pl-3
                a(@click="handleHide(card)" variant="primary" v-if="!card.updating")
                  img.card-icon(src='../assets/cancel.svg')
                //- rule locked? ------
                img.card-icon.pl-3(v-if="card.locked" src='../assets/Lock.svg')
                b-button#handle-update(@click="handleUpdate(card)" variant="primary" v-if="!card.updating && !card.locked" :disabled="updateData.updating")
                  img.card-icon(src='../assets/smPen.svg')
                b-button#handle-cancel(@click="handleCancel(card)" variant="primary" v-else-if="!card.locked")
                  img.card-icon(src='../assets/smPen.svg')
            //- rule title -------
            h3(v-if="!card.updating") {{card.title}}
            //- h3(v-if="card.updating") {{updateData.title}}
            //-------------
            b-form.title-form(@submit.prevent="submitUpdate(card, updateData)" v-if="card.updating")
              a {{updateData.title.length}} / {{validation.titleLimit}}
              b-row(v-if="validation.titleCount > validation.titleLimit")
                b-badge(variant="danger") {{validation.errorMsg}}
              b-form-textarea#card-title.mt-3(
                v-model="updateData.title"
                @keyup="validateCharCount()"
                :placeholder="updateData.title"
              )
              b-button#submit-annotation(type="submit" variant="primary" v-if="card.updating && !validation.errorMsg" :disabled="!updateData.text.length && !updateData.title.length")
                img.card-icon(src='../assets/add.svg')
            //- rule text ------
            b-card-text(v-if="!card.updating") {{card.text}}
            b-form.mt-3(@submit.prevent="submitUpdate(card, updateData)" v-if="card.updating")
              a {{updateData.text.length}} / {{validation.charLimit}}
              b-row(v-if="validation.charCount > validation.charLimit")
                b-badge(variant="danger") {{validation.errorMsg}}
              b-form-textarea.mt-3(
                id="card-text"
                v-model="updateData.text"
                @keyup="validateCharCount()"
                :placeholder="updateData.text"
              )
              b-button#submit-annotation(type="submit" variant="primary" v-if="card.updating && !validation.errorMsg" :disabled="!updateData.text.length && !updateData.title.length")
                img.card-icon(src='../assets/add.svg')
            //- Annotation
            cardAnnotation(
              :rule="card"
            )
</template>
<script>
import { mapActions, mapState } from 'vuex'
import cardAnnotation from '../components/card/cardAnnotation'
export default {
  name: 'activeRuleContainer',
  props: ['validation'],
  data () {
    return {
      updateData: {
        title: '',
        text: '',
        updating: false
      },
      templateText: {
        toggleMsg: 'Show All Switches',
        toggleMsgAlt: 'Hide All Switches',
        updateBtn: 'Update!',
        updateRule: 'Update Rule',
        cancelBtn: 'Nvm',
        hideBtn: 'Hide'
      }
    }
  },
  components: {
    cardAnnotation
  },
  computed: {
    ...mapState([
      'Cards',
      'pinnedCards'
    ])
  },
  methods: {
    ...mapActions([
      'showUpdateField',
      'updateCard',
      'hidePin'
    ]),
    validateCharCount () {
      this.validation.charCount = this.updateData.text.length
      this.validation.titleCount = this.updateData.title.length
      this.validation.errorMsg = this.updateData.title.length > this.validation.titleLimit || this.updateData.text.length > this.validation.charLimit ? 'Too Many!' : null
    },
    handleUpdate (card) {
      this.updateData.updating = !this.updateData.updating
      this.updateData.title = card.title
      this.updateData.text = card.text
      const payload = this.cardFormat(card)
      this.$emit('cardUpdate', payload)
      this.showUpdateField(payload)
    },
    submitUpdate (card) {
      const id = card.id
      const { title, text, updating } = this.updateData
      const updateData = {
        title,
        text,
        id,
        updating
      }
      if (updateData.text.length > this.validation.charLimit || updateData.title.length > this.validation.titleLimit) {
        return alert('Error handling: fix length')
      }
      this.updateCard(updateData)
      card.updating = false
      this.clearForm()
    },
    handleCancel (card) {
      this.updateData.updating = !this.updateData.updating
      const payload = this.cardFormat(card)
      this.showUpdateField(payload)
      this.clearForm()
    },
    handleHide (card) {
      this.hidePin(card)
    },
    clearForm () {
      this.updateData = {
        title: '',
        text: '',
        updating: false
      }
    },
    cardFormat (card) {
      const { type, title, text, id, active, updating } = card
      const cardPayload = {
        type,
        title,
        text,
        id,
        active,
        updating
      }
      return cardPayload
    }
  },
  mounted () {
    const card = this.Cards
    this.card = card
  }

}
</script>
<style scoped lang="scss">
form {
  textarea {
    border: 1px solid $neon;
  }
}
.card {
  .card-text{
    padding: 1em;
  }
  .title-form {
    textarea {
      color: $indigo;
      font-size: 1.75em;
      border-top: none;
      border-right: none;
      border-left: none;
      height: 2em;
      resize: none;
    }
  }
    #handle-update{
      border: 0em;
      box-shadow: none;
      padding: .25em 0 0 .25em;
      margin: 0 0 0 .5em;
    }
    #handle-cancel{
      border: 0em;
      box-shadow: none;
      margin: 0;
      padding: .25em .25em .25em 2.6em;
    }
    #submit-annotation{
      border: 0em;
      box-shadow: none;
      margin: 1em;
      padding: .25em;
    }
}
</style>
