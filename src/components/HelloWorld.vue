<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input v-model="frageField" placeholder="Frage" type="text" ref="frageInput">
    <input v-model="antwortField" placeholder="Antwort" type="text" ref="antwortInput">
    <input v-model="playerIDField" placeholder="playerID" @keyup.enter="save()">
    <button type="button" @click="save()">Save</button>
  </div>
  <div style="display: flex; justify-content: center">
    <table>
      <txtContainer>
        <thead>
        <tr>
          <th>Frage</th>
          <th>Antwort</th>
          <th>playerID</th>
        </tr>
        </thead>
      </txtContainer>
      <tbody>
      <tr v-if="items.length === 0">
        <td colspan="2">Keine Fragen</td>
      </tr>
      <tr v-for="item in items" :key="item.id">
        <td>{{item.frage}}</td>
        <td>{{item.antwort}}</td>
        <td>{{item.playerid}}</td>
      </tr>
      <tr>
        <td>{{frageField}}</td>
        <td>{{antwortField}}</td>
        <td>{{playerIDField}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'DynamicForm',
  props: ['title'],
  data () {
    return {
      items: [],
      frageField: '',
      antwortField: '',
      playerIDField: ''
    }
  },
  methods: {
    loadThings () {
      const endpoint= 'http://localhost:8080/frage';
      const requestoptions = {
        method: 'GET',
        redirect: 'follow'
      }
      fetch(endpoint, requestoptions)
          .then(response => response.json())
          .then(result => result.forEach(frage => {
            this.items.push(frage)
          }))
          .catch(error => console.log('error', error))
    },
    save () {
      const endpoint= 'http://localhost:8080/frage';
      const data = {
        frage: this.frageField,
        antwort: this.antwortField,
        playerid: this.playerIDField
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
txtContainer {
  display: flex;
  align-content: center;
}
</style>
