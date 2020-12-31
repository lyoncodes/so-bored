<template lang="pug">
  b-container.card-container.p-0
    //- array iteration
    b-col.col-12.card.ml-0(v-for="card in rules" :key="card.title")
      //- card template
      .pt-3.pt-lg-3.pl-4.pr-4.pb-2
        //- CARD HEADING ----------
        b-row.justify-content-end
          b-button.icon-trigger.p-0.pr-3(@click="handleDelete(card)"
          :disabled="card.updating"
          )
            img.card-icon-sm(src='../assets/delete.svg')
        b-row
          b-col.col-10.text-left.pl-0
            p.caption.mb-1 {{card.userName}}
        b-row
          h3.mb-0(v-if="!card.updating") {{card.title}}
          b-col.p-0
            b-form.title-form(@submit.prevent="submitUpdate(card, updateData)" v-if="card.updating")
              b-form-textarea.mt-3(
                id="title-text"
              v-model="updateData.title"
              @keyup="validateCharCount()"
              :placeholder="updateData.title"
              )
              a.validation-char {{updateData.title.length}} / {{validation.titleLimit}}
        b-row
          b-card-text.pl-0.pr-0(v-if="!card.updating") {{card.text}}
        //- CARD BODY ----------
          //- title form ------------
        b-row
          b-col.p-0
            //- If rule locked, display lock
            //- text form ------------
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
              button.mb-1#submit-annotation.neu-c-button.mt-2(type="submit" variant="primary" :disabled="!updateData.text.length && !updateData.title.length") edit
        b-row.mb-2
          //- handle update & cancel
          b-button.icon-trigger(@click="handleUpdate(card)" v-if="!card.locked")
            img.card-icon(src='../assets/editPencil.svg')
          //- activate (show)
          b-button.icon-trigger.pt-0(@click="handleShow(card)"
          :disabled="card.updating")
            img.card-icon#show-more(src='../assets/show-more.svg')
        b-col.p-0(v-if="card.active")
          //- comments component ------------
          b-col.col-12.p-0
            postComments(
              :rule="card"
              :show="card.displayComments"
              v-on:toggleCommentFormEvent="toggleCommentForm(card)"
            )
          //- links comp ----------
          b-col.col-12.p-0.mb-4
            postLinks(
              :rule="card"
              :show="card.displayLinks"
            )
        b-row.mb-3.justify-content-center(v-if="card.active")
          //- annotate
          b-button.icon-trigger(@click="toggleComments(card)")
            img.card-icon(src='../assets/comment.svg')
          //- add link
          b-button.icon-trigger(@click="toggleLinks(card)")
            img.card-icon(src='../assets/link.svg')
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
    toggleCommentForm (card) {
      card.payload = 'toggleCommentForm'
      this.mother(card)
    },
    toggleLinks (card) {
      card.payload = 'toggleLinks'
      this.mother(card)
    },
    clearForm (card) {
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
