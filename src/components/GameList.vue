<template>
  <v-card class="mx-auto" max-width="650">
    <v-toolbar color="#131818" class ="center-sum">
      <img alt="Vue logo" class="logo" src="@/assets/gptLogo.png" width="80" height="80" />
      <img alt="Vue logo" class="logo" src="@/assets/gptLogo.png" width="40" height="40" style="margin-bottom: 15px; margin-right: 20px" />
      <img alt="Vue logo" class="logo" src="@/assets/gptLogo.png" width="30" height="30" style="margin-top: 30px; opacity: 0.6  " />
      <p class="custom-font center-text" style="flex: 1; text-align: center;">Spiele</p>
      <img alt="Vue logo" class="logo" src="@/assets/gptLogo.png" width="100" height="100" style="opacity: 0.0" />
      <img alt="Vue logo" class="logo" src="@/assets/gptLogo.png" width="50" height="50" style="margin-bottom: 15px; opacity: 0.4  " />
      <img alt="Vue logo" class="logo" src="@/assets/gptLogo.png" width="20" height="20" style="margin-top: 15px; opacity: 0.7  " />
    </v-toolbar>
  </v-card>
  <v-chip-group class="listForm" v-for="game in items" :key="game.id">
    <RouterLink :to="`/game/${game.id}`" >
      <v-chip style="width: 600px">{{ game.name }}</v-chip>
    </RouterLink>
  </v-chip-group>


  <div style="display: flex;justify-content: center">
    <CreateGameButton/>
  </div>
</template>

<script>
import {RouterLink} from "vue-router";
import CreateGameButton from "@/components/CreateGameButton.vue";

export default {
  name: 'DynamicForm',
  components: {CreateGameButton, RouterLink},
  props: [],
  data() {
    return {
      items: [],
      idField: '',
      playerNameField: ''
    }
  },
  created() {
    this.listGames();
  },
  methods: {
    listGames() {
      const endpoint = 'http://localhost:8080/game';
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      }
      fetch(endpoint, requestOptions)
          .then(response => response.json())
          .then(result => result.forEach(game => {
            this.items.push(game)
          }))
          .catch(error => console.log('error', error))
    }
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
;
  font-size: 40px;
}

.center-sum {
  display: flex;
  justify-content: center;
  align-items: center;
}
.listForm{
  display: flex;
  justify-content: center;
  max-width: 100%;
  &:hover{
    background: transparent;
  }
}
</style>