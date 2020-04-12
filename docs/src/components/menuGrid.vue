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
                  b-form-input(
                    id="card-title"
                    v-model="updateData.title"
                    :placeholder="card.title"
                  )
                //- card text ------
                b-card-text(v-if="!updateData.text.length || updateData.text.length && !card.updating") {{card.text}}
                b-card-text(v-if="updateData.text.length && card.updating") {{updateData.text}}
                //-----------
                b-form(@submit.prevent="submitUpdate(card)" v-if="card.updating")
                  b-form-input(
                    id="card-text"
                    v-model="updateData.text"
                    :placeholder="card.text"
                  )
                  //- UPDATE rule
                  b-button(type="submit" variant="primary" v-if="updateData.updating") Update!
                //- Cancel
                b-button(@click="handleCancel(card)" variant="primary" v-if="updateData.updating") Nvm
                //- Update Rule
                b-button(@click="handleUpdate(card)" variant="primary" v-if="!updating") Update Rule
                //- DELETE rule
                b-button(@click="handleDelete(card.id)" variant="primary") Delete Card
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'menu-row',
  data () {
    return {
      showCards: false,
      fieldShow: false,
      updating: false,
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
      'pinnedCards'
    ])
  },
  methods: {
    ...mapActions([
      'pinCard',
      'showUpdateField',
      'updateCard',
      'hidePin',
      'eraseCard'
    ]),
    handleSwitch (card, index) {
      if (!this.updating) {
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
      this.updating = !this.updating
      this.updateData.updating = true
      const selected = card.updating
      const { id, updating } = card
      const updatePayload = {
        id,
        updating,
        selected
      }
      this.showUpdateField(updatePayload)
      updatePayload.selected = false
    },
    submitUpdate (card) {
      const updating = card.updating
      const cardId = card.id
      const { title, text } = this.updateData
      const updateData = {
        title,
        text,
        cardId,
        updating
      }
      console.log(updateData)
      // Only title updated
      if (updateData.title.length && !updateData.text.length) {
        this.card.title = updateData.title
        this.updateCard(updateData)
      }
      // Only text updated
      if (updateData.text.length && !updateData.title.length) {
        this.card.text = updateData.text
        this.updateCard(updateData)
      }
      // Both fields updated
      if (updateData.title.length && updateData.text.length) {
        this.card.title = updateData.title
        this.card.text = updateData.text
        this.updateCard(updateData)
      }
      // No fields
      if (!updateData.title.length && !updateData.text.length) {
        this.updateCard(card)
      }
      updateData.updating = false
      console.log(updateData)
      this.updateData = {
        title: '',
        text: ''
      }
      this.updating = !this.updating
      this.fieldShow = !this.fieldShow
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
