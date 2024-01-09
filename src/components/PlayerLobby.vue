<template>

  <p class=".font-weight-black, headline" style="text-decoration: underline">{{ game.name }}</p>

  <br/>
  <br/>
  <div1 class="boxPlayerList">
    <div2 class="boxPlayerListItems">
      <div3 class="playerHighlight">{{PlayerID}}</div3>
  <br/>
      <div v-for="player in game.spieler" :key="player.id">
        {{ player.playerName }}
      </div>
         </div2>
  </div1>
    <DeleteGameButton @click="deleteGame"/>

</template>

<style>
.headline{
  font-size: xxx-large;
  color: #181818;
  font-weight: bold;
}
.playerHighlight{
  font-size: large;
  color: #181818;
  border-color: #181400;
  border: 4px;

}
.boxPlayerList{
  display: flex;
  justify-content: center;
  border: solid 2px;
  border-color:  #181818;
  margin-left: 100px;
  margin-right: 1600px;
  padding-top: 20px;
  padding-bottom: 40px;
}
.boxPlayerListItems{
  flex-direction: column;
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
      PlayerID: ''
    }
  },
  created() {
    this.getGameById(this.$route.params.id);
    this.PlayerID = this.$route.params.playerid;
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
      const endpoint = `http://localhost:8080/game/${this.gameId}`
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
            this.$router.push(`/game/${this.game.id}/join`);
          })
          .catch(error => console.log('error', error));
    }
  },

}

</script>
