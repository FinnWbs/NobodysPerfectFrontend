<template>
  <div>
    <h1>{{ title }}</h1>
    <form @submit.prevent="save">
      <div>
        <label for="gameName">Game Name:</label>
        <input type="text" id="gameName" v-model="gameName" />
      </div>
      <div>
        <label for="gameCreatorName">Creator Name:</label>
        <input type="text" id="gameCreatorName" v-model="gameCreatorName" />
      </div>
      <button type="submit">Create Game</button>
    </form>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
  name: 'DynamicForm',
  components: { RouterLink },
  props: ['title'],
  data() {
    return {
      gameName: '',
      gameCreatorName: ''
    }
  },
  methods: {
    save() {
      const endpoint = 'http://localhost:8080/game';
      const data = {
        gameName: this.gameName,
        gameCreatorName: this.gameCreatorName
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
            this.$router.push(`/game/${data.id}`);
          })
          .catch(error => console.log('error', error));
    }
  }
}
</script>
