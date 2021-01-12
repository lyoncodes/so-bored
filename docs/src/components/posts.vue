<template lang="pug">
  //- CARD CONTAINER
  b-container.card-container.p-0
    //- array iteration (card in posts)
    b-col.card.col-12.ml-0(v-for="card in posts" :key="card.title")
      //- content-padding
      .pt-3.pl-2.pr-2.pt-lg-3.pr-lg-4.pb-lg-2.pl-lg-4
        //- CARD HEADING ----------
        b-row.justify-content-between.mb-3
          b-col.p-0.text-left
            //- username
            span.caption.mb-1 {{card.userName}}
            //- time string
            span.caption.ml-2 {{ card.dateToFormat.toLocaleDateString() }}
          //- delete button / icon
          b-button.icon-button.p-0.pr-3(@click="handleDelete(card)"
          :disabled="updateData.updating"
          )
            img#delete-card-icon(src='../assets/delete.svg')
        //- CARD TTILE
        b-row
          //- post title
          h3.card-title(v-if="!updateData.updating") {{card.title}}
          //- edit/update title form
          b-col.p-0.mb-0
            b-form#title-update-form(@submit.prevent="submitUpdateData(card, updateData)" v-if="updateData.updating")
              b-form-textarea(
              id="title-update-text"
              v-model="updateData.title"
              @keyup="validateCharCount()"
              @keydown.enter.prevent="submitUpdateData(card, updateData)"
              :placeholder="updateData.title"
              autofocus
              )
              b-row.justify-content-start
                a.validation-char(v-bind:class="errorObject") {{updateData.title.length}} / {{validation.titleLimit}}
        //- CARD TEXT
        b-row(v-if="!updateData.updating")
          //- card text
          b-card-text.card-text.pl-0.pr-0 {{card.text}}
        //- card text form
        b-row(v-if="updateData.updating")
          b-col.p-0
            b-form.mt-3(@submit.prevent="submitUpdateData(card, updateData)")
              //- dynamic error msg
              b-row(v-if="validation.charCount > validation.charLimit")
                b-badge(variant="danger") {{validation.errorMsg}}
              //- text area
              b-form-textarea.mt-3(
                id="card-text"
                v-model="updateData.text"
                @keyup="validateCharCount()"
                @keydown.enter.prevent="submitUpdateData(card, updateData)"
                :placeholder="updateData.text"
              )
              //- character counter and edit button
              b-row.justify-content-between.mr-1
                a.validation-char(v-bind:class="errorObject") {{updateData.text.length}} / {{validation.charLimit}}
                button.mb-1#submit-annotation.neu-c-button.mt-2(type="submit" variant="primary" :disabled="!updateData.text.length && !updateData.title.length") edit
        //- CARD NAVIGATION ROW
        b-row.mb-2
          //- handle update card data & cancel form update
          b-button.icon-button(@click="toggleUpdateForm(card)")
            img.inline-card-icon(src='../assets/editPencil.svg')
          //- sets card.active & displays comment component
          b-button.icon-button(@click="toggleCommentComponent(card)"
          :disabled="updateData.updating")
            img#show-more(src='../assets/comment.svg')
            span.caption.pl-1 {{card.comments.length}}
          //- sets card.showLinks & displays link component
          b-button.icon-button(@click="toggleLinkForm(card)"
          :disabled="updateData.updating")
            img#show-more(src='../assets/link.svg')
            span.caption.pl-1 {{card.links.length}}
        //- CARD.ACTIVE CONTENT
        b-col.p-0(v-if="card.active && !displayLinks")
          //- post comments component ------------
          b-col.col-12.p-0
            postComments(
              :rule="card"
              :user="userProfile.username"
              :validation="validation"
            )
        //- post links component ----------
        b-col.col-12.p-0.mb-2(v-if="displayLinks")
          postLinks(
            :rule="card"
            :show="displayLinks"
            v-on:toggleLinkForm="toggleLinkForm(card)"
          )
        //- CARD FOOTER
        //- b-row.mb-3.justify-content-center(v-if="card.active")
          //- add comment
          //- b-button.icon-button(@click="togglePostComments(card)")
          //-   img.inline-card-icon(src='../assets/add-post-red.svg')
</template>
<script>
import { mapActions, mapState } from 'vuex'
import postComments from '../components/card/postComments'
import postLinks from '../components/card/postLinks'
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
      displayLinks: false
    }
  },
  components: {
    postComments,
    postLinks
  },
  computed: {
    ...mapState([
      'posts',
      'userProfile'
    ]),
    // local error handling
    errorObject: function () {
      return {
        error: this.updateData.title.length > this.validation.titleLimit || this.updateData.text.length > this.validation.charLimit ? true : null
      }
    }
  },
  methods: {
    ...mapActions([
      'mother'
    ]),
    // Display / Hide Comment Section
    toggleCommentComponent (card) {
      this.displayLinks = false
      card.active = !card.active
      card.payload = 'toggleActive'
      this.mother(card)
    },
    toggleLinkForm (card) {
      this.displayLinks = !this.displayLinks
      card.active = false
    },
    toggleUpdateForm (card) {
      this.updateData.title = card.title
      this.updateData.text = card.text
      this.updateData.updating = !this.updateData.updating
    },
    // Update Title & Text
    submitUpdateData (card) {
      // decalre variables for update payload
      const payload = this.formatCard(card)
      const { id, updating, comments } = payload
      const { title, text } = this.updateData
      // format update payload
      const ruleUpdatePayload = {
        title,
        text,
        id,
        updating,
        comments
      }
      // error handling block
      if (ruleUpdatePayload.text.length > this.validation.charLimit || ruleUpdatePayload.title.length > this.validation.titleLimit) {
        return alert('Error handling: fix length')
      }
      // attach update payload & call mother()
      ruleUpdatePayload.payload = 'updateRule'
      this.mother(ruleUpdatePayload)
      // set card.updating to false and clear update form
      card.updating = false
      this.clearForm()
    },
    handleDelete (card) {
      card.payload = 'deleteRule'
      this.mother(card)
    },
    clearForm (card) {
      this.updateData = {
        title: '',
        text: '',
        updating: false
      }
    },
    // format card for passing data to actions
    formatCard (card) {
      const { title, text, id, active, updating, comments } = card
      const cardPayload = {
        title,
        text,
        id,
        active,
        updating,
        comments
      }
      return cardPayload
    },
    // Limit the input length of title and text
    validateCharCount () {
      this.validation.charCount = this.updateData.text.length
      this.validation.titleCount = this.updateData.title.length
      this.validation.errorMsg = this.updateData.title.length > this.validation.titleLimit || this.updateData.text.length > this.validation.charLimit ? 'Too many characters!' : null
    },
    redirect (link) {
      window.location.href = `https://${link.url}`
    }
  },
  mounted () {
    const card = this.posts
    this.card = card
  }

}
</script>
<style scoped lang="scss">
.error {
  color: $candy-red;
}
</style>
