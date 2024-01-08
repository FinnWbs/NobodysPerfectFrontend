<template>
  <v-card class="mx-auto" max-width="450">
    <v-toolbar color="red" class ="center-sum">
      <img alt="Vue logo" class="logo" src="@/assets/gptLogo.png" width="80" height="80" />
      <img alt="Vue logo" class="logo" src="@/assets/gptLogo.png" width="40" height="40" style="margin-bottom: 15px; margin-right: 20px" />
      <img alt="Vue logo" class="logo" src="@/assets/gptLogo.png" width="30" height="30" style="margin-top: 30px; opacity: 0.6  " />
      <p class="custom-font center-text" style="flex: 1; text-align: center;">Spiele</p>
      <img alt="Vue logo" class="logo" src="@/assets/gptLogo.png" width="100" height="100" style="opacity: 0.0" />
      <img alt="Vue logo" class="logo" src="@/assets/gptLogo.png" width="50" height="50" style="margin-bottom: 15px; opacity: 0.4  " />
      <img alt="Vue logo" class="logo" src="@/assets/gptLogo.png" width="20" height="20" style="margin-top: 15px; opacity: 0.7  " />


      <!--      <v-toolbar-title class = "custom-font" style="flex: 1; text-align: center; padding-top: 5px; padding-bottom: 5px;">Spiele</v-toolbar-title>-->

      <!--      <v-spacer></v-spacer>-->
    </v-toolbar>
    <v-list :items="items" item-props lines="three">
      <v-list-item v-for="game in items" :key="game.id">
        <RouterLink :to="`/game/${game.id}`">
          <v-list-item-content>
            <v-list-item-title>{{ game.name }}</v-list-item-title>
            <v-list-item-subtitle v-for="player in game.players" :key="player.id">
              {{ player.playerName }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </RouterLink>
      </v-list-item>
    </v-list>
  </v-card>
  <v-col cols="12" sm="6" md="4" class="mx-auto d-flex align-center">
    <v-btn block rounded="lg" size="x-large" elevation="8">
      <RouterLink to="/game/create" class="router-link-custom">
      Create Game
    </RouterLink>
    </v-btn>
  </v-col>


</template>

<script>
import {RouterLink} from "vue-router";

export default {
  // Todo verstehen was die felder name, components, props bedeuten
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
/* Add a scoped style block to apply styles to this component only */
.center-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.router-link-custom {
  text-decoration: none; /* Remove the underline */
  color: inherit; /* Use the default text color */
}

.custom-font {
  font-family: Geneva, Verdana, sans-serif;
;
  font-size: 30px;
}

.center-sum {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>