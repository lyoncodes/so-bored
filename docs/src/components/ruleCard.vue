<template lang="pug">
  b-card-group.card-grid
    b-container.card-container
      b-row
        b-col(md="4" v-for="card in pinnedCards" :key="card.active")
          b-card(bg-variant="dark" text-variant="white")
            //- rule type -------
            h5 {{card.type}}
            //- rule title -------
            h3(v-if="!card.updating") {{card.title}}
            //-------------
            b-form(@submit.prevent="submitUpdate(card, updateData)" v-if="card.updating")
              a {{updateData.title.length}} / {{validation.titleLimit}}
              b-row(v-if="validation.titleCount > validation.titleLimit")
                b-badge(variant="danger") {{validation.errorMsg}}
              b-form-textarea(
                id="card-title"
                v-model="updateData.title"
                @keyup="validateCharCount()"
                :placeholder="updateData.title"
              )
            //- rule text ------
            b-card-text(v-if="!card.updating") {{card.text}}
            //-----------
            b-form(@submit.prevent="submitUpdate(card, updateData)" v-if="card.updating")
              a {{updateData.text.length}} / {{validation.charLimit}}
              b-row(v-if="validation.charCount > validation.charLimit")
                b-badge(variant="danger") {{validation.errorMsg}}
              b-form-textarea(
                id="card-text"
                v-model="updateData.text"
                @keyup="validateCharCount()"
                :placeholder="updateData.text"
              )
              b-button(type="submit" variant="primary" v-if="card.updating && !validation.errorMsg" :disabled="!updateData.text.length && !updateData.title.length") {{templateText.updateBtn}}
            b-button(@click="handleUpdate(card)" variant="primary" v-if="!card.updating" :disabled="updateData.updating") {{templateText.updateRule}}
            b-button(@click="handleCancel(card)" variant="primary" v-if="card.updating") {{templateText.cancelBtn}}
            b-button(@click="handleHide(card)" variant="primary" v-if="!card.updating") {{templateText.hideBtn}}
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
<style scoped>

</style>
