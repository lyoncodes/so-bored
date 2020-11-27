<template lang="pug">
  b-container.card-container.p-0
    //- array iteration
    b-col.col-0.p-1(v-for="card in rules" :key="card.title")
      //- card template
      .pb-1
        //- CARD HEADING ----------
        b-col
          b-row.mb-2.mt-2.justify-content-start
            h3 {{card.title}}
          b-row.mb-4.justify-content-start
            span.caption {{card.userName}}
        //- CARD ----------
        b-row
          //- activate (show)
          b-button.icon-trigger(@click="handleShow(card)" variant="primary"
          :disabled="card.updating")
            img.card-icon(src='../assets/add.svg')
          //- delete (remove)
          b-button.icon-trigger(@click="handleDelete(card)" variant="primary"
          :disabled="card.updating"
          )
            img.card-icon(src='../assets/cancel.svg')
          //- handle update & cancel
          b-button.icon-trigger(@click="handleUpdate(card)" v-if="!card.locked")
            img.card-icon(src='../assets/editPencil.svg')
          //- annotate
          b-button.icon-trigger(@click="toggleComments(card)" variant="primary")
            img.card-icon(src='../assets/annotate.svg')
          //- add link
          b-button.icon-trigger(@click="toggleLinks(card)" variant="primary")
            iconWatch
        //- CARD BODY ----------
        b-col(v-if="card.active")
          b-row.mb-4.justify-content-start
            //- title form ------------
            b-col.p-0(v-if="card.active")
              //- If rule locked, display lock
              img.card-icon.pl-3(v-if="card.locked" src='../assets/Lock.svg')
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
          b-col
            postLinks(
              :rule="card"
              :show="card.displayLinks"
            )
          //- annotation comp ------------
          b-col
            postComments(
              :rule="card"
              :show="card.displayComments"
            )
          //- CARD footer
          b-col(v-if="card.active")
            b-badge {{card.type}}
</template>
<script>
import { mapActions, mapState } from 'vuex'
import postComments from '../components/card/postComments'
import postLinks from '../components/card/postLinks'
import iconWatch from '../components/icons/iconWatch'
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
      showLinks: false
    }
  },
  components: {
    postComments,
    postLinks,
    iconWatch
  },
  computed: {
    ...mapState([
      'rules',
      'userProfile'
    ])
  },
  methods: {
    ...mapActions([
      'mother'
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
      this.mother(payload)
    },
    submitUpdate (card) {
      const payload = this.cardFormat(card)
      const { locked, type, id, updating, comments } = payload
      const { title, text } = this.updateData
      const ruleUpdatePayload = {
        locked,
        type,
        title,
        text,
        id,
        updating,
        comments
      }
      if (ruleUpdatePayload.text.length > this.validation.charLimit || ruleUpdatePayload.title.length > this.validation.titleLimit) {
        return alert('Error handling: fix length')
      }
      ruleUpdatePayload.payload = 'updateRule'
      this.mother(ruleUpdatePayload)
      card.updating = false
      this.clearForm()
    },
    handleShow (card) {
      card.active = !card.active
      card.payload = 'toggleShow'
      this.mother(card)
    },
    handleDelete (card) {
      card.payload = 'deleteRule'
      this.mother(card)
    },
    toggleComments (card) {
      card.payload = 'toggleComments'
      this.mother(card)
    },
    toggleLinks (card) {
      card.payload = 'toggleLinks'
      this.mother(card)
    },
    clearForm () {
      this.updateData = {
        title: '',
        text: '',
        updating: false
      }
    },
    cardFormat (card) {
      const { locked, type, title, text, id, active, updating, comments } = card
      const cardPayload = {
        locked,
        type,
        title,
        text,
        id,
        active,
        updating,
        comments
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
