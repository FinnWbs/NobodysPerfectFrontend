<template>
  <p class=".font-weight-black, headline" style="text-decoration: underline">
    {{ game.name }}

  </p>
  <br/>
  <br/>
  <br/>
  <div class='boxPlayerList'>
    <div class="form" v-for="player in game.spieler" :key="player.id">
      <span :class="getPlayerHighlightClass(player)">
        {{ player.playerName }} - Punktzahl: {{ player.punktzahl }}
      </span>
      <div class="input-container">
        <input v-model="updatedPunktzahl" type="number" placeholder="Neue Punktzahl" style="width: 40px; border: solid 1px white"/>
        <v-btn @click="updatePunktzahl(player.id)">confirm</v-btn>
      </div>
    </div>
  </div>
  <DeleteGameButton v-if="isGameCreator" @click="deleteGame" />

</template>

<style>
.headline {
  font-size: xxx-large;
  color: #181818;
  font-weight: bold;
}
.boxPlayerList {
  border: 2px solid #181818;
  margin-left: 10%;
  margin-right: 70%;
  padding-top: 20px;
  padding-bottom: 40px;
}
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px white;
  margin: 1rem 2rem;
}

.highlightedPlayer {
  color: black; /* Take all available space, pushing the input-container to the right */
}

.input-container {
  display: flex;
  align-items: center;
}
.highlightedCreator {
  color: blue;
}

.highlightedSelf {
  color: black;
}

.highlightedHighestScorer {
  color: red;
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
      PlayerID: '',
      Spieler: null,
      updatedPunktzahl: 0, // Neu hinzugefügt
      highestScorer: null,
      gameCreatorName: '',
    }
  },
  created() {
    this.getGameById(this.$route.params.id)
    this.PlayerID = this.$route.params.playerid
  },
  computed: {
    isGameCreator() {
      return this.PlayerID === this.gameCreatorName;
    },
  },
  methods: {
    getPlayerHighlightClass(player) {
      if (player.playerName === this.gameCreatorName) {
        return 'highlightedCreator';
      } else if (player.playerName === this.PlayerID) {
        return 'highlightedSelf';
      } else if (player.id === this.highestScorer.id) {
        return 'highlightedHighestScorer';
      } else {
        return ''; // No specific highlighting
      }
    },
    getHighestScorer() {
      if (this.game && this.game.spieler && this.game.spieler.length > 0) {
        this.highestScorer = this.game.spieler.reduce((prev, current) => {
          return (prev.punktzahl > current.punktzahl) ? prev : current;
        });
      }
    },
    updatePunktzahl(playerId) {
      const endpoint = `http://localhost:8080/game/increaseScore/${playerId}`;
      const data = { punktzahl: this.updatedPunktzahl };
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      };
      // updates local player punktzahl before server request is handled but error handling might have to be implemented
      const updatedPlayerIndex = this.game.spieler.findIndex(player => player.id === playerId);
      if (updatedPlayerIndex !== -1) {
        this.game.spieler[updatedPlayerIndex].punktzahl = this.updatedPunktzahl;
      }
      fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          // Refresh player data after updating the score
          this.getGameById(this.$route.params.id);
        })
        .catch(error => console.log('error', error));
    },
    getGameById(id) {
      const endpoint = `http://localhost:8080/game/${id}`
      const requestOptions = {
        method: 'GET',
      }
      fetch(endpoint, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          this.game = result
          if (this.game && this.game.spieler && this.game.spieler.length > 0) {
            this.gameCreatorName = this.game.spieler[0].playerName;
          }
          this.getHighestScorer(); // Hinzugefügt, um den höchsten Scorer zu aktualisieren
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
          this.$router.push(`/game/${this.game.id}/join`)
        })
        .catch((error) => console.log('error', error))
    },
  },
}
</script>
