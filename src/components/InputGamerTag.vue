<template>
  <div v-if="game">
    <p class=".font-weight-black, text-lg-h6, headline" style="text-decoration: underline">{{ game.name }}</p>
  </div>
    <br/>
    <p class="headline2">ENTER YOUR GAMERTAG</p>
        <form @submit.prevent="joinGame" class="gamertagInput">
          <input type="text" style="justify-content: center" id="newPlayer" v-model="newPlayer"/>
          <v-btn type="submit">join</v-btn>
        </form>
  <div class="joinButton">
            <DeleteGameButton @click="deleteGame"/>
  </div>

</template>

<style>
.headline{
  font-size: xxx-large;
  color: #181818;
  font-weight: bold;
  display: flex;
  justify-content: center;
}
.headline2{
  font-size: x-large;
  color: #181400;
  font-weight: bold;
  display: flex;
  justify-content: center;
}
.gamertagInput{
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: x-large;
  border: solid 1px black;
}
.joinButton{
  font-size: x-large;
  color: #181400;
  font-weight: bold;
  display: flex;
  justify-content: center;
}
 input[type="text"] {
   text-align: center;
 }

</style>

<script>
import {RouterLink} from "vue-router";
import DeleteGameButton from "@/components/DeleteGameButton.vue";
import JoinGame from "@/components/GameLobby.vue";
import JoinGameButton from "@/components/JoinGameButton.vue";

export default {
  name: 'DynamicForm',
  components: {JoinGameButton, JoinGame, DeleteGameButton, RouterLink},
  props: ['title'],
  data () {
    return {
      game: null,
      gameId: '',
      newPlayer: '',
      playerID:''
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
            this.$router.push(`/game/${this.$route.params.id}/${this.newPlayer}`);
          })
          .catch(error => console.log('error', error));
    }
  },

}

</script>
