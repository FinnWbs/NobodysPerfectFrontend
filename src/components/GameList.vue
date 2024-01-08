<template>
  <v-card class="mx-auto" max-width="450" min-height="500">
    <v-toolbar color= #C0C0C0 >
      <v-btn variant="text" icon="mdi-menu"></v-btn>
      <v-toolbar-title>Spiele</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn variant="text" icon="mdi-magnify"></v-btn>
    </v-toolbar>
    <v-list :items="items" item-props lines="three">
      <v-list-item v-for="game in items" :key="game.id">
        <RouterLink :to="`/game/${game.id}`" style="text-underline: none">
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

/**
1. Tests schreiben
2. Gamepage-Eingabe Spieler
          - Weiterleritung auf Spielerpage
                - Jeder hat einheitliche Seite, mit eiunheitlichen Tabellenabfragen


3. Spielerliste - daneben die Punktezahl anzeigen
      und den mit den meisten Punkten highlighten
*/

