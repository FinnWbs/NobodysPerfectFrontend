<template>
  <div v-if="game">
    <p class=".font-weight-black" style="display: flex; justify-content: center">{{ game.name }}</p>
    <br/>
    <ul>
      <div>
        <p>Spieler</p>
      </div>
      <li v-for="player in game.spieler" :key="player.id">
        {{ player.playerName }}
      </li>
    </ul>
    <DeleteGameButton @click="deleteGame"/>
  </div>
</template>

<script>
import {RouterLink} from "vue-router";
import DeleteGameButton from "@/components/DeleteGameButton.vue";

export default {
  name: 'DynamicForm',
  components: {DeleteGameButton, RouterLink},
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
      const endpoint = 'http://localhost:8080/game/lobby';
      const data = {
        gameId: this.$route.params.id,
        spielerName: this.newPlayera
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
            console.log(this.$route.params.id);
            this.$router.push(`/game/${this.$route.params.id}`);
          })
          .catch(error => console.log('error', error));
    }
  }

}

</script>
