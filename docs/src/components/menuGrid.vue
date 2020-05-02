<template lang="pug">
  b-container
    b-container(class="menu-row")
      b-row
        b-button-group(size="sm")
          b-button(
          v-for="(card, index) in Cards"
          :key="index"
          :class="{ selected: card === selectedCard }"
          @click="handleSwitch(card, index)"
          variant="primary") {{card.title}}
      b-row
        b-button-group(size="sm")
          b-button(
          v-for="(card, index) in type1"
          :key="index"
          :class="{ selected: card === selectedCard }"
          @click="handleSwitch(card, index)"
          variant="primary") {{card.title}}
      b-row
        b-button-group(size="sm")
          b-button(
          v-for="(card, index) in type2"
          :key="index"
          :class="{ selected: card === selectedCard }"
          @click="handleSwitch(card, index)"
          variant="primary") {{card.title}}
      b-card-group(class="card-grid")
        b-container(class="card-container")
          b-row
            b-col(md="4" v-for="card in pinnedCards" :key="card.active")
              b-card(bg-variant="dark" text-variant="white")
                //- card title -------
                h3(v-if="!updateData.title.length || updateData.title.length && !card.updating") {{card.title}}
                h3(v-if="updateData.title.length && card.updating") {{updateData.title}}
                //-------------
                b-form(@submit.prevent="submitUpdate(card)" v-if="card.updating")
                  b-form-textarea(
                    id="card-title"
                    v-model="updateData.title"
                    :placeholder="card.title"
                  )
                //- card text ------
                b-card-text(v-if="!updateData.text.length || updateData.text.length && !card.updating") {{card.text}}
                b-card-text(v-if="updateData.text.length && card.updating") {{updateData.text}}
                //-----------
                b-form(@submit.prevent="submitUpdate(card)" v-if="card.updating")
                  b-form-textarea(
                    id="card-text"
                    v-model="updateData.text"
                    :placeholder="card.text"
                  )
                  //- UPDATE rule
                  b-button(type="submit" variant="primary" v-if="updateData.updating") Update!
                //- Update Rule
                b-button(@click="handleUpdate(card)" variant="primary" v-if="!card.updating") Update Rule
                //- Cancel
                b-button(@click="handleCancel(card)" variant="primary" v-if="updateData.updating") Nvm
                //- DELETE rule
                b-button(@click="handleDelete(card.id)" variant="primary" v-if="!card.updating") Delete Card
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'menu-row',
  data () {
    return {
      showCards: false,
      fieldShow: false,
      switchesActive: false,
      updateData: {
        title: '',
        text: '',
        updating: false
      }
    }
  },
  computed: {
    ...mapState([
      'Cards',
      'pinnedCards',
      'type1',
      'type2'
    ])
  },
  methods: {
    ...mapActions([
      'pinCard',
      'showUpdateField',
      'updateCard',
      'hidePin',
      'clearForm',
      'eraseCard'
    ]),
    handleSwitch (card, index) {
      // only active if card is not being updated
      if (!this.switchesActive) {
        const { title, text, id, active } = card
        const pinnedCard = {
          title,
          text,
          id,
          active
        }
        // Conditions to handle juggling switches
        if (!this.pinnedCards.length || (this.pinnedCards.length && !this.Cards[index].active)) {
          return this.pinCard(pinnedCard)
        } else if (this.Cards[index].active) {
          return this.hidePin(pinnedCard)
        }
      }
    },
    // Toggles update card form fields
    handleUpdate (card) {
      // deactive switch
      this.switchesActive = !this.switchesActive
      // changes component state to true, toggling update & nvm buttons
      this.updateData.updating = !this.updateData.updating
      // format object for action/mutation
      const { id, updating } = card
      // name object updatePayload
      const updatePayload = {
        id,
        updating
      }
      // call action function and pass updatePayload
      this.showUpdateField(updatePayload)
    },
    submitUpdate (card) {
      // formats card with form field (validated in mutation)
      const cardId = card.id
      const { title, text, updating } = this.updateData
      const updateData = {
        title,
        text,
        cardId,
        updating
      }
      // calls updateCard and passes formatted card
      this.updateCard(updateData)
      // resets updateData after submitting to updateCard
      this.updateData = {
        title: '',
        text: '',
        updating: false
      }
      // reactivates switches after submission
      this.switchesActive = !this.switchesActive
    },
    handleCancel (card) {
      // reactivates switches
      this.switchesActive = !this.switchesActive
      // changes component state to true, toggling update & nvm buttons
      this.updateData.updating = !this.updateData.updating
      // format blank object for card
      const id = card.id
      const updating = false
      const blankPayload = {
        id,
        updating
      }
      // calls action function and passes blankPayload
      this.showUpdateField(blankPayload)
      // resets updateData after submitting balnkPayload
      this.updateData = {
        title: '',
        text: '',
        updating: false
      }
    },
    // we handle delete card outside the action/mutation system in order to utilize the $delete directive (it's just too easy)
    handleDelete (id) {
      const cardId = id
      this.$delete(this.Cards, cardId)
      this.$delete(this.pinnedCards, cardId)
      this.showCards = !this.showCards
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
