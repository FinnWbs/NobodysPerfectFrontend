<template>
  <div v-if="game">
    <p>Name: {{ game.name }}</p>
    <br/>
    <ul>
      <div class="text-h5">
        <p>Spieler</p>
      </div>
      <li v-for="player in game.spieler" :key="player.id">
        {{ player.playerName }}
        <form @submit.prevent="joinGame">
          <label for="newPlayer">Spielername:</label>
          <input type="text" id="newPlayer" v-model="newPlayer" />
          <button type="submit">join</button>
        </form>
      </li>
    </ul>
    <DeleteGameButton @click="deleteGame"/>
  </div>
</template>

<script>
import {RouterLink} from "vue-router";
import DeleteGameButton from "@/components/DeleteGameButton.vue";
import JoinGame from "@/components/JoinGame.vue";
import JoinGameButton from "@/components/JoinGameButton.vue";

export default {
  name: 'DynamicForm',
  components: {JoinGameButton, JoinGame, DeleteGameButton, RouterLink},
  props: ['title'],
  data () {
    return {
      game: null,
      gameId: '',
      newPlayer: ''
    }
  },
  created() {
    this.getGameById(this.$route.params.id);
  },
  methods: {
    getGameById (id) {
      const endpoint= `http://localhost:8080/game/${id}`;
      const requestOptions = {
        method: 'GET',
      }
      fetch(endpoint, requestOptions)
          .then(response => response.json())
          .then((result)  => {
            this.game = result;
          })
          .catch(error => console.log('error', error))
    },
    deleteGame() {
      const endpoint = `http://localhost:8080/game/${this.$route.params.id}`
      const requestOptions = {
        method: 'DELETE',
      }
      fetch(endpoint, requestOptions)
          .then(() => this.$router.push("/"))
          .catch(error => console.log('error', error))
    },
    joinGame() {
      const endpoint = 'http://localhost:8080/game/join';
      const data = {
        gameId: this.$route.params.id,
        spielerName: this.newPlayer
      };
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      };
      fetch(endpoint, requestOptions)
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
            // Reset form or handle success
            this.$router.push(`/game/${this.game.id}/spieler/${data.id}`);
          })
          .catch(error => console.log('error', error));
    },
    showJoinForm() {
      return this.game && this.game.spieler.length === 0;
    }
  },

}

</script>
