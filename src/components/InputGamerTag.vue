<template>
  <form @submit.prevent="joinGame">
    <v-card class="mx-auto px-6 py-8" max-width="344">
      <v-card-title class="text-h6 text-md-h5 text-lg-h4"></v-card-title>
      <v-form v-model="form" @submit.prevent="joinGame">
      <v-text-field
        v-model="newPlayer"
        :readonly="loading"
        :rules="[rules.validatePlayerName]"
        clearable
        label="Enter your Gamertag"
        id="newPlayer"
      ></v-text-field>
        <v-btn style='margin-top: 10px' type="submit">join</v-btn>
        </v-form>
      <div v-if='error'>
        <iframe style="border: none;"
                src="https://lottie.host/embed/15dab88b-5f7e-402c-9f1d-d28643e48a19/uIraBm2sqD.json">
        </iframe>
      </div>

    </v-card>
  </form>


</template>

<style>
input[type='text'] {
  text-align: center;
}
</style>

<script>
import { RouterLink } from 'vue-router'
import DeleteGameButton from '@/components/DeleteGameButton.vue'
import JoinGameButton from '@/components/JoinGameButton.vue'

export default {
  name: 'DynamicForm',
  components: { JoinGameButton, DeleteGameButton, RouterLink },
  props: ['title'],
  data() {
    return {
      game: null,
      gameId: '',
      newPlayer: '',
      playerID: '',
      error: null,
      rules: {
        validatePlayerName: (value) => {
          if (!value) {
            return 'Field is required';
          }

          const playerNameExists = this.game && this.game.spieler && this.game.spieler.some(player => player.playerName === value);

          if (playerNameExists) {
            return 'Player with the same name already exists in the game';
          }

          if (value.length < 3 || value.length > 12) {
            return 'Player name must be between 3 and 12 characters';
          }

          return true; // Validation passed
        },
      }
    }
  },
  created() {
    this.getGameById(this.$route.params.id)
  },
  methods: {
    getGameById(id) {
      const endpoint = `http://localhost:8080/game/${id}`
      const requestOptions = {
        method: 'GET',
      }
      fetch(endpoint, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          this.game = result
        })
        .catch((error) => console.log('error', error))
    },
    deleteGame() {
      const endpoint = `http://localhost:8080/game/${this.$route.params.id}`
      const requestOptions = {
        method: 'DELETE',
      }
      fetch(endpoint, requestOptions)
        .then(() => this.$router.push('/'))
        .catch((error) => console.log('error', error))
    },
    joinGame() {
      const endpoint = 'http://localhost:8080/game/join'
      const playerNameExists = this.game && this.game.spieler && this.game.spieler.some(player => player.playerName === this.newPlayer);

      if (playerNameExists) {
        this.error = 'Player with the same name already exists in the game';
        return;
      }

      const validationMessage = this.rules.validatePlayerName(this.newPlayer);

      if (validationMessage !== true) {
        this.error = validationMessage;
        return;
      }
      const data = {
        gameId: this.$route.params.id,
        spielerName: this.newPlayer,
      }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }
      fetch(endpoint, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data)
          // Reset form or handle success
          this.$router.push(`/game/${this.$route.params.id}/${this.newPlayer}`)
        })
        .catch((error) => console.log('error', error))
    },
  },
}
</script>
