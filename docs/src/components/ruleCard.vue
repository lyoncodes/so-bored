<template lang="pug">
  b-card-group.card-grid
    b-container.card-container
      b-row
        //- array iteration
        b-col.col-6(v-for="card in rules" :key="card.title")
          //- card template
          b-card
            //- CARD ----------
            //- activate (show)
            b-button.icon-trigger(@click="handleShow(card)" variant="primary"
            :disabled="card.updating")
              img.card-icon(src='../assets/add.svg')
            //- delete (remove)
            b-button.icon-trigger(@click="handleDelete(card)" variant="primary"
            :disabled="card.updating"
            )
              img.card-icon(src='../assets/cancel.svg')
            //- CARD HEADING ----------
            b-col(v-if="!card.active")
              h3 {{card.title}}
              b-badge {{card.type}}
            b-col(v-if="card.active")
              //- CARD NAV ------------
              b-row.mb-4.justify-content-start
                b-col.p-0
                  //- If rule locked, display lock
                  img.card-icon.pl-3(v-if="card.locked" src='../assets/Lock.svg')
                  //- handle update & cancel
                  b-button.icon-trigger(@click="handleUpdate(card)" v-if="!card.locked")
                    img.card-icon(src='../assets/smPen.svg')
              //- title --------------
              h3(v-if="!card.updating") {{card.title}}
              b-form.title-form(@submit.prevent="submitUpdate(card, updateData)" v-if="card.updating")
                b-row.justify-content-center.pt-3(v-if="validation.titleCount > validation.titleLimit")
                  img.error-icon.pl-3(src='../assets/error.svg')
                b-form-textarea.mt-3(
                  v-model="updateData.title"
                  @keyup="validateCharCount()"
                  :placeholder="updateData.title"
                )
                a.validation-char {{updateData.title.length}} / {{validation.titleLimit}}
              //- rule text ------
              b-card-text(v-if="!card.updating") {{card.text}}
              b-form.mt-3(@submit.prevent="submitUpdate(card, updateData)" v-if="card.updating")
                b-row(v-if="validation.charCount > validation.charLimit")
                  b-badge(variant="danger") {{validation.errorMsg}}
                b-form-textarea.mt-3(
                  id="card-text"
                  v-model="updateData.text"
                  @keyup="validateCharCount()"
                  :placeholder="updateData.text"
                )
                a.validation-char {{updateData.text.length}} / {{validation.charLimit}}
                b-button#submit-annotation(type="submit" variant="primary" v-if="card.updating && !validation.errorMsg" :disabled="!updateData.text.length && !updateData.title.length")
                  img.card-icon(src='../assets/add.svg')
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
      'pinnedCards',
      'rules'
    ])
  },
  methods: {
    ...mapActions([
      'showUpdateField',
      'updateCard',
      'toggleShow',
      'deleteCard'
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
      const payload = this.cardFormat(card)
      const { locked, type, idx, id, updating, annotations, tokenRef } = payload
      const { title, text } = this.updateData
      const ruleUpdate = {
        locked,
        type,
        title,
        text,
        idx,
        id,
        updating,
        annotations,
        tokenRef
      }
      if (ruleUpdate.text.length > this.validation.charLimit || ruleUpdate.title.length > this.validation.titleLimit) {
        return alert('Error handling: fix length')
      }
      this.updateCard(ruleUpdate)
      card.updating = false
      this.clearForm()
    },
    handleShow (card) {
      card.active = !card.active
      this.toggleShow(card)
    },
    handleDelete (card) {
      this.deleteCard(card)
    },
    clearForm () {
      this.updateData = {
        title: '',
        text: '',
        updating: false
      }
    },
    cardFormat (card) {
      const { locked, type, title, text, idx, id, active, updating, annotations, tokenRef } = card
      const cardPayload = {
        locked,
        type,
        title,
        text,
        idx,
        id,
        active,
        updating,
        annotations,
        tokenRef
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
</style>
