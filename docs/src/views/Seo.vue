<template>
    <b-card-group class="card-grid">
        <template v-for="card in cards">
        <!-- card component goes here eventually -->
          <b-col md="4" class="card-container" :key="card">
            <b-card bg-variant="dark" text-variant="white">
                <h3>
                  {{card.title}}
                </h3>
                <b-card-text>
                    {{card.text}}
                </b-card-text>
                <b-button href="#" variant="primary">Go somewhere</b-button>
            </b-card>
          </b-col>
        </template>
    </b-card-group>
</template>
<script>
import cards from '@/data/cards'
export default {
  data () {
    return {
      cards
    }
  }
}
</script>
<style scoped>

</style>
