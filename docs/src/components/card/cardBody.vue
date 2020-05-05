<template lang="pug">
  h1 added tag proto
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'menu-row',
  data () {
    return {
      switchesActive: false,
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
      const cardId = card.id
      const { title, text, updating } = this.updateData
      const updateData = {
        title,
        text,
        cardId,
        updating
      }
      this.updateCard(updateData)
      this.clearForm()
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
    handleHide (card) {
      this.hidePin(card)
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
