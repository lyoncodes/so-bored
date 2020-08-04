<template lang="pug">
  b-card-group.card-grid
    b-container.card-container
      //- array iteration
      b-col(v-for="card in rules" :key="card.title")
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
          //- CARD BODY ----------
          b-col(v-if="card.active")
            //- CARD NAV ------------
            b-row.mb-4.justify-content-start
              b-col.p-0(v-if="card.active")
                //- If rule locked, display lock
                img.card-icon.pl-3(v-if="card.locked" src='../assets/Lock.svg')
                //- handle update & cancel
                b-button.icon-trigger(@click="handleUpdate(card)" v-if="!card.locked")
                  img.card-icon(src='../assets/smPen.svg')
                //- annotate
                b-button.icon-trigger(@click="toggleComments" variant="primary")
                  img.card-icon(src='../assets/annotate.svg')
                //- add link
                b-button.icon-trigger(@click="toggleLinks" variant="primary")
                  img.card-icon(src='../assets/Valid.svg')
            //- title form ------------
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
            //- text form ------------
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
            //- links comp ----------
            b-row.justify-content-center(v-for="link in card.links" :key="card.id")
              a.links(@click="redirect(link)") {{ link.ref }}
            b-col
              cardLinks(
                :rule="card"
                v-if="showLinks"
              )
            //- annotation comp ------------
            b-col(v-if="showComments")
              cardComments(
                :rule="card"
              )
            //- CARD footer
            b-col(v-if="card.active")
              b-badge {{card.type}}
</template>
<script>
import { mapActions, mapState } from 'vuex'
import cardComments from '../components/card/cardComments'
import cardLinks from '../components/card/cardLinks'
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
      },
      showComments: false,
      showLinks: false
    }
  },
  components: {
    cardComments,
    cardLinks
  },
  computed: {
    ...mapState([
      'rules'
    ])
  },
  methods: {
    ...mapActions([
      'actionThis'
    ]),
    validateCharCount () {
      this.validation.charCount = this.updateData.text.length
      this.validation.titleCount = this.updateData.title.length
      this.validation.errorMsg = this.updateData.title.length > this.validation.titleLimit || this.updateData.text.length > this.validation.charLimit ? 'Error: Char Count' : null
    },
    handleUpdate (card) {
      this.updateData.updating = !this.updateData.updating
      this.updateData.title = card.title
      this.updateData.text = card.text
      const payload = this.cardFormat(card)
      payload.payload = 'toggleUpdateFields'
      this.$emit('cardUpdate', payload)
      this.actionThis(payload)
    },
    submitUpdate (card) {
      const payload = this.cardFormat(card)
      const { locked, type, id, updating, comments, tokenRef } = payload
      const { title, text } = this.updateData
      const ruleUpdatePayload = {
        locked,
        type,
        title,
        text,
        id,
        updating,
        comments,
        tokenRef
      }
      if (ruleUpdatePayload.text.length > this.validation.charLimit || ruleUpdatePayload.title.length > this.validation.titleLimit) {
        return alert('Error handling: fix length')
      }
      ruleUpdatePayload.payload = 'updateRule'
      this.actionThis(ruleUpdatePayload)
      card.updating = false
      this.clearForm()
    },
    handleShow (card) {
      card.active = !card.active
      card.payload = 'toggleShow'
      this.actionThis(card)
    },
    handleDelete (card) {
      card.payload = 'deleteRule'
      this.actionThis(card)
    },
    toggleComments () {
      this.showComments = !this.showComments
    },
    toggleLinks () {
      this.showLinks = !this.showLinks
    },
    clearForm () {
      this.updateData = {
        title: '',
        text: '',
        updating: false
      }
    },
    cardFormat (card) {
      const { locked, type, title, text, id, active, updating, comments, tokenRef } = card
      const cardPayload = {
        locked,
        type,
        title,
        text,
        id,
        active,
        updating,
        comments,
        tokenRef
      }
      return cardPayload
    },
    redirect (link) {
      window.location.href = `https://${link.url}`
    }
  },

  mounted () {
    const card = this.rules
    this.card = card
  }

}
</script>
<style scoped lang="scss">
</style>
