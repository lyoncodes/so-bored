<template lang="pug">
  b-card-group.card-grid
    b-container.card-container
      b-row
        b-col(md="4" v-for="card in pinnedCards" :key="card.active")
          b-card(bg-variant="dark" text-variant="white")
            //- card title -------
            h3(v-if="!updateData.title.length || updateData.title.length && !card.updating") {{card.title}}
            h3(v-if="updateData.title.length && card.updating") {{updateData.title}}
            //-------------
            b-form(@submit.prevent="submitUpdate(card, updateData)" v-if="card.updating")
              b-form-textarea(
                id="card-title"
                v-model="updateData.title"
                :placeholder="card.title"
              )
            //- card text ------
            b-card-text(v-if="!updateData.text.length || updateData.text.length && !card.updating") {{card.text}}
            b-card-text(v-if="updateData.text.length && card.updating") {{updateData.text}}
            //-----------
            b-form(@submit.prevent="submitUpdate(card, updateData)" v-if="card.updating")
              b-form-textarea(
                id="card-text"
                v-model="updateData.text"
                :placeholder="card.text"
              )
              b-button(type="submit" variant="primary" v-if="card.updating" :disabled="!updateData.text.length && !updateData.title.length") {{templateText.updateBtn}}
            b-button(@click="handleUpdate(card)" variant="primary" v-if="!card.updating" :disabled="updateData.updating") {{templateText.updateRule}}
            b-button(@click="handleCancel(card)" variant="primary" v-if="card.updating") {{templateText.cancelBtn}}
            b-button(@click="handleHide(card)" variant="primary" v-if="!card.updating") {{templateText.hideBtn}}
            cardBody
</template>
<script>
import { mapActions, mapState } from 'vuex'
import cardBody from '../components/card/cardBody'
export default {
  name: 'menu-row',
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
    cardBody
  },
  computed: {
    ...mapState([
      'Cards',
      'pinnedCards'
    ])
  },
  methods: {
    ...mapActions([
      'showUpdateField',
      'updateCard',
      'hidePin'
    ]),
    handleUpdate (card) {
      this.updateData.updating = !this.updateData.updating
      card.updating = true
      const payload = this.cardFormat(card)
      this.$emit('cardUpdate', payload)
      this.showUpdateField(payload)
    },
    submitUpdate (card) {
      const id = card.id
      const { title, text, updating } = this.updateData
      const updateData = {
        title,
        text,
        id,
        updating
      }
      this.updateCard(updateData)
      card.updating = false
      this.clearForm()
    },
    handleCancel (card) {
      this.updateData.updating = !this.updateData.updating
      card.updating = false
      const payload = this.cardFormat(card)
      this.showUpdateField(payload)
      this.clearForm()
    },
    handleHide (card) {
      this.hidePin(card)
    },
    clearForm () {
      this.updateData = {
        title: '',
        text: '',
        updating: false
      }
    },
    cardFormat (card) {
      const { type, title, text, id, active, updating } = card
      const cardPayload = {
        type,
        title,
        text,
        id,
        active,
        updating
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
<style scoped>

</style>
