<template lang="pug">
  b-container
    b-container(class="menu-row")
      b-row
        b-button-group(size="sm")
          a(@click="showAllCards") {{toggleMsg}}
    b-container(class="menu-row" v-if="showCards")
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
                b-button(type="submit" variant="primary" v-if="updateData.updating") Update!
              b-button(@click="handleUpdate(card)" variant="primary" v-if="!card.updating") Update Rule
              b-button(@click="handleCancel(card)" variant="primary" v-if="updateData.updating") Nvm
              b-button(@click="handleDelete(card.id)" variant="primary" v-if="!card.updating") Delete Card
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'menu-row',
  data () {
    return {
      showCards: true,
      switchesActive: false,
      updateData: {
        title: '',
        text: '',
        updating: false
      },
      toggleMsg: 'Show All Switches'
    }
  },
  computed: {
    ...mapState([
      'Menu',
      'Cards',
      'pinnedCards'
    ])
  },
  methods: {
    ...mapActions([
      'pinCard',
      'showUpdateField',
      'updateCard',
      'hidePin'
    ]),
    showAllCards (card, index) {
      this.showCards = !this.showCards
      if (this.showCards && this.showFilterCards) {
        this.showFilterCards = !this.showFilterCards
      }
    },
    handleSwitch (card, index) {
      if (!this.switchesActive) {
        const { title, text, id, active } = card
        const pinnedCard = {
          title,
          text,
          id,
          active
        }
        return (!this.pinnedCards.length || (this.pinnedCards.length && !this.Cards[index].active)) ? this.pinCard(pinnedCard)
          : (this.Cards[index].active) ? this.hidePin(pinnedCard) : null
      }
    },
    handleUpdate (card) {
      this.switchesActive = !this.switchesActive
      this.updateData.updating = !this.updateData.updating
      const { id, updating } = card
      const updatePayload = {
        id,
        updating
      }
      this.showUpdateField(updatePayload)
    },
    submitUpdate (card) {
      console.log(this.updateData)
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
      this.switchesActive = !this.switchesActive
    },
    handleCancel (card) {
      this.switchesActive = !this.switchesActive
      this.updateData.updating = !this.updateData.updating
      const id = card.id
      const updating = false
      const blankPayload = {
        id,
        updating
      }
      this.showUpdateField(blankPayload)
      this.clearForm()
    },
    handleDelete (id) {
      const cardId = id
      this.$delete(this.Cards, cardId)
      this.$delete(this.pinnedCards, cardId)
      this.showCards = !this.showCards
    },
    clearForm () {
      this.updateData = {
        title: '',
        text: '',
        updating: false
      }
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
