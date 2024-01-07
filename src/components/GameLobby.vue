<template>
  <div v-if="game">
    <p>Name: {{ game.name }}</p>
    <br/>
    <ul>
      <li v-for="player in game.spieler" :key="player.id">
        <p>Spieler</p>
        ID: {{ player.id }}, Name: {{ player.playerName }}
      </li>
    </ul>
    <button @click="deleteGame">Delete Game</button>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
import {RouterLink} from "vue-router";

export default {
  name: 'DynamicForm',
  components: {RouterLink},
  props: ['title'],
  data () {
    return {
      game: null,
      idField: '',
      nameField: ''
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
    }
  },

}

</script>
