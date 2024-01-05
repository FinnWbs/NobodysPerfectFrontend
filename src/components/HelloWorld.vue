<template>
  <v-card class="mx-auto" max-width="450">
    <v-toolbar color="cyan-lighten-1">
      <v-btn variant="text" icon="mdi-menu"></v-btn>

      <v-toolbar-title>Spiele</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn variant="text" icon="mdi-magnify"></v-btn>
    </v-toolbar>

    <v-list :items="items" item-props lines="three">
      <v-list-item v-for="game in items" :key="game.id">
        <v-list-item-content>
          <v-list-item-title>{{ game.name }}</v-list-item-title>
          <v-list-item-subtitle v-for="player in game.players" :key="player.id">
            {{ player.playerName }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>

</template>

<script>
export default {
  name: 'DynamicForm',
  props: ['title'],
  data () {
    return {
      items: [],
      idField: '',
      playerNameField: ''
    }
  },
  created() {
    this.loadThings();
  },
  methods: {
    loadThings () {
      const endpoint= 'http://localhost:8080/game';
      const requestoptions = {
        method: 'GET',
        redirect: 'follow'
      }
      fetch(endpoint, requestoptions)
          .then(response => response.json())
          .then(result => result.forEach(game => {
            this.items.push(game)
          }))
          .catch(error => console.log('error', error))
    },
    save () {
      const endpoint= 'http://localhost:8080/game';
      const data = {
        id: this.idField,
        playerName: this.playerNameField
      }
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
      fetch(endpoint, requestOptions)
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data)
          })
          .catch(error => console.log('error', error))
    }

  },

}

</script>


