<template>
  <v-card class="mx-auto" max-width="650">
    <v-toolbar color="#131818" class="center-sum">
      <img
        alt="Vue logo"
        class="logo"
        src="@/assets/gptLogo.png"
        width="80"
        height="80"
      />
      <img
        alt="Vue logo"
        class="logo"
        src="@/assets/gptLogo.png"
        width="40"
        height="40"
        style="margin-bottom: 15px; margin-right: 20px"
      />
      <img
        alt="Vue logo"
        class="logo"
        src="@/assets/gptLogo.png"
        width="30"
        height="30"
        style="margin-top: 30px; opacity: 0.6"
      />
      <p class="custom-font center-text" style="flex: 1; text-align: center">
        Spiele
      </p>
      <img
        alt="Vue logo"
        class="logo"
        src="@/assets/gptLogo.png"
        width="80"
        height="80"
        style="opacity: 0.7"
      />
      <img
        alt="Vue logo"
        class="logo"
        src="@/assets/gptLogo.png"
        width="50"
        height="50"
        style="margin-bottom: 15px; opacity: 0.4"
      />
      <img
        alt="Vue logo"
        class="logo"
        src="@/assets/gptLogo.png"
        width="20"
        height="20"
        style="margin-top: 15px; opacity: 0.7"
      />
    </v-toolbar>
  </v-card>
  <v-chip-group class="listForm" v-for="game in items" :key="game.id">
    <RouterLink :to="`/game/${game.id}`">
      <v-chip class="bg-grey-lighten-5" label style="width: 400px; height: 50px; margin: 4px 8px 4px 0">
        {{ game.name }}
      </v-chip>
    </RouterLink>
    <input v-model="updatedGameName" placeholder="Neuer Name" style="width: 100px; height: 50px; margin: 4px 8px 4px 0; border: solid 1px white; border-radius: 5px"/>
    <v-btn style="height: 50px; margin: 4px 8px 4px 0" @click="updateGameName(game.id)">Enter</v-btn>
  </v-chip-group>
  <div style="display: flex; justify-content: center">
    <CreateGameButton />
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'
import CreateGameButton from '@/components/CreateGameButton.vue'

export default {
  name: 'DynamicForm',
  components: { CreateGameButton, RouterLink },
  props: [],
  data() {
    return {
      items: [],
      idField: '',
      playerNameField: '',
      updatedGameName: "", // Neu hinzugefügt
    }
  },
  created() {
    this.listGames()
  },
  methods: {
    updateGameName(gameId) {
      const endpoint = `http://localhost:8080/game/updateName/${gameId}`;
      const data = { name: this.updatedGameName };
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      };
      fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          // Refresh the game list after updating the name
          this.listGames();
        })
        .catch(error => console.log('error', error));
    },
    listGames() {
      const endpoint = 'http://localhost:8080/game'
      const requestOptions = {
        method: 'GET',
        redirect: 'follow',
      }
      fetch(endpoint, requestOptions)
        .then((response) => response.json())
        .then((result) =>
          result.forEach((game) => {
            this.items.push(game)
          }),
        )
        .catch((error) => console.log('error', error))
    },
  },
}
</script>

<style scoped>
.center-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.router-link-custom {
  text-decoration: none;
  color: inherit;
}

.custom-font {
  font-family: Geneva, Verdana, sans-serif;
  font-size: 40px;
}

.center-sum {
  display: flex;
  justify-content: center;
  align-items: center;
}
.listForm {
  display: flex;
  justify-content: center;
  max-width: 100%;
  &:hover {
    background: transparent;
  }
}
.chipStyle {
  margin: 4px 8px 4px 0;
}
</style>
