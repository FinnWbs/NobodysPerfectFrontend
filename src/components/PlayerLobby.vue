<template>
  <p class=".font-weight-black, headline" style="text-decoration: underline">
    {{ game.name }}
  </p>

  <br />
  <br />
  <div1 class="boxPlayerList">
    <div2 class="boxPlayerListItems">
      <br/>
      <div class="form" v-for="player in game.spieler" :key="player.id">
        <span :class="{ highlightedPlayer: player.playerName === PlayerID }">
          {{ player.playerName }} - Punktzahl: {{ player.punktzahl }}
          <input v-model="updatedPunktzahl" type="number" placeholder="Neue Punktzahl" />
        <v-btn @click="updatePunktzahl(player.id)">Aktualisieren</v-btn>
        </span>
      </div>
    </div2>
  </div1>
  <DeleteGameButton @click="deleteGame" />
  <v-btn @click="updatePunktzahl">+1</v-btn>
</template>

<style>
.form {
  margin-bottom: 1rem;
  border-bottom: solid 1px white;
  width: 200px;
}
.headline {
  font-size: xxx-large;
  color: #181818;
  font-weight: bold;
}
.playerHighlight {
  font-size: large;
  color: #181818;
  border-color: #181400;
  border: 4px;
}
.boxPlayerList {
  display: flex;
  justify-content: center;
  border: 2px solid #181818;
  margin-left: 100px;
  margin-right: 1600px;
  padding-top: 20px;
  padding-bottom: 40px;
}
.boxPlayerListItems {
  flex-direction: column;
}
.highlightedPlayer {
  color: black;
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
    }
  },
  created() {
    this.getGameById(this.$route.params.id)
    this.PlayerID = this.$route.params.playerid
  },
  methods: {
    // updatePunktzahl(player) {
    //   const endpoint = `http://localhost:8080/player/updatePunktzahl/${player.id}`
    //   const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ punktzahl: player.punktzahl + 1 }),
    //   }
    //
    //   fetch(endpoint, requestOptions)
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log('Success:', data)
    //       this.getGameById(this.$route.params.id)
    //     })
    //     .catch((error) => console.log('error', error))
    // },
    updatePunktzahl(playerId) {
      const endpoint = `http://localhost:8080/increaseScore/${playerId}`;
      const data = { punktzahl: this.updatedPunktzahl };
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      };
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
        })
        .catch((error) => console.log('error', error))
    },
    getSpielerById(id) {
      const endpoint = `http://localhost:8080/${id}`
      const requestOptions = {
        method: 'GET',
      }
      fetch(endpoint, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          this.Spieler = result
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
