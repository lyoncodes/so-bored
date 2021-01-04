<template lang="pug">
  //- CARD CONTAINER
  b-container.card-container.p-0
    //- array iteration (card in rules)
    b-col.col-12.card.ml-0(v-for="card in rules" :key="card.title")
      //- content-padding
      .pt-3.pl-2.pr-2.pt-lg-3.pr-lg-4.pb-lg-2.pl-lg-4
        //- CARD HEADING ----------
        b-row.justify-content-between
          b-col.p-0
            //- username
            span.caption.mb-1 {{card.userName}}
            //- time string
            span.caption.ml-2 {{ card.dateToFormat.toLocaleDateString() }}
          //- delete icon
          b-button.icon-trigger.p-0.pr-3(@click="handleDelete(card)"
          :disabled="card.updating"
          )
            img.card-icon-sm(src='../assets/delete.svg')
        //- CARD TTILE
        b-row.mt-1
          //- post title
          h3.mb-0(v-if="!card.updating") {{card.title}}
          //- edit/update title form
          b-col.p-0.mb-0
            b-form.title-form(@submit.prevent="submitUpdate(card, updateData)" v-if="card.updating")
              b-form-textarea(
              id="title-text"
              v-model="updateData.title"
              @keyup="validateCharCount()"
              :placeholder="updateData.title"
              )
              a.validation-char {{updateData.title.length}} / {{validation.titleLimit}}
        //- CARD TEXT
        b-row(v-if="!card.updating")
          //- card text
          b-card-text.pl-0.pr-0(v-if="!card.updating") {{card.text}}
        //- card text form
        b-row
          b-col.p-0
            b-form.mt-3(@submit.prevent="submitUpdate(card, updateData)" v-if="card.updating")
              b-row(v-if="validation.charCount > validation.charLimit")
                b-badge(variant="danger") {{validation.errorMsg}}
              b-form-textarea.mt-3(
                id="card-text"
                v-model="updateData.text"
                @keyup="validateCharCount()"
                :placeholder="updateData.text"
              )
              b-row.justify-content-between.ml-1.mr-1
                a.validation-char {{updateData.text.length}} / {{validation.charLimit}}
                button.mb-1#submit-annotation.neu-c-button.mt-2(type="submit" variant="primary" :disabled="!updateData.text.length && !updateData.title.length") edit
        b-row.mb-2
          //- handle update & cancel
          b-button.icon-trigger(@click="handleUpdate(card)" v-if="!card.locked")
            img.card-icon(src='../assets/editPencil.svg')
          //- activate (show)
          b-button.icon-trigger(@click="handleShow(card)"
          :disabled="card.updating")
            img#show-more(src='../assets/comment.svg')
            span.caption.pl-1 {{card.comments.length}}
        b-col.p-0(v-if="card.active")
          //- comments component ------------
          b-col.col-12.p-0
            postComments(
              :rule="card"
              :show="card.displayComments"
              v-on:toggleCommentFormEvent="toggleCommentForm(card)"
            )
          //- links component ----------
          b-col.col-12.p-0.mb-4
            postLinks(
              :rule="card"
              :show="card.displayLinks"
            )
        //- CARD FOOTER
        b-row.mb-3.justify-content-center(v-if="card.active")
          //- add comment
          b-button.icon-trigger(@click="toggleComments(card)")
            img.card-icon(src='../assets/add-post.svg')
          //- add link
          b-button.icon-trigger(@click="toggleLinks(card)")
            img.card-icon(src='../assets/link.svg')
        //- CARD TYPE
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
