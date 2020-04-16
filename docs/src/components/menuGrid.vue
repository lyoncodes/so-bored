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
                b-form(@submit.prevent="submitUpdate(card)" v-if="updateData.updating")
                  b-form-input(
                    id="card-title"
                    v-model="updateData.title"
                    required
                    :placeholder="card.title"
                  )
                //- card text ------
                b-card-text(v-if="!updateData.text.length || updateData.text.length && !card.updating") {{card.text}}
                b-card-text(v-if="updateData.text.length && card.updating") {{updateData.text}}
                //-----------
                b-form(@submit.prevent="submitUpdate(card)" v-if="updateData.updating")
                  b-form-input(
                    id="card-text"
                    v-model="updateData.text"
                    required
                    :placeholder="card.text"
                  )
                  //- UPDATE rule
                  b-button(type="submit" variant="primary" v-if="updateData.updating") Update!
                //- Update Rule
                b-button(@click="handleUpdate(card)" variant="primary" v-if="!updateData.updating") Update Rule
                //- Cancel
                b-button(@click="handleCancel(card)" variant="primary" v-if="updateData.updating") Nvm
                //- DELETE rule
                b-button(@click="handleDelete(card.id)" variant="primary" v-if="!updateData.updating") Delete Card
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'menu-row',
  data () {
    return {
      showCards: false,
      fieldShow: false,
      cardUpdating: false,
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
      'clearForm',
      'eraseCard'
    ]),
    handleSwitch (card, index) {
      // only active if card is not being updated
      if (!this.cardUpdating) {
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
      this.cardUpdating = !this.cardUpdating
      this.updating = !this.updateData.updating
      this.updateData.updating = !this.updateData.updating
      const { id, updating } = card
      const updatePayload = {
        id,
        updating
      }
      this.showUpdateField(updatePayload)
    },
    submitUpdate (card) {
      const cardId = card.id
      const { title, text, updating } = this.updateData
      const updateData = {
        title,
        text,
        cardId,
        updating
      }
      this.updateCard(updateData)
      this.updateData = {
        title: '',
        text: '',
        updating: false
      }
      // turns card back to not updating
      this.cardUpdating = !this.cardUpdating
    },
    handleCancel (card) {
      this.cardUpdating = !this.cardUpdating
      this.updateData.updating = !this.updateData.updating
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
