<template>
  <div class="formCreateContainer">

    <form @submit.prevent="save" class="formContainer">
      <div class="formRow">
        <label for="gameName">Game Name:</label>
        <input type="text" id="gameName" v-model="gameName" class="formInput" />
      </div>
      <div class="formRow">
        <label for="gameCreatorName">Creator Name:</label>
        <input type="text" id="gameCreatorName" v-model="gameCreatorName" class="formInput" />
      </div>
      <button type="submit" class="formButton">Create Game</button>
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

<style>
.formContainer {
  border: solid 1px white;
  max-width: 500px;
  border-radius: 16px;
  padding: 16px
}

.formRow {
  margin-bottom: 1rem;
  border-bottom: solid 1px white;
}

.formInput {
  color: white;
  margin-left: 15px;
}

.formButton {
  border: solid 1px white;
  padding: 8px;
  border-radius: 16px;
  &:hover {
    background: red;
  }
  width: 100%
}

.formCreateContainer {
  display: flex;
  justify-content: center;

}
</style>
