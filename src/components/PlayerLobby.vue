<template>

  <p class=".font-weight-black, headline" style="text-decoration: underline">
    {{ game.name }}
  </p>
  <div v-if='game' style='display: flex'>
    <v-table class='boxPlayerList elevation-8' style='border-radius: 4px'>
      <thead>
      <tr>
        <th class="text-left">Player Name</th>
        <th class="text-left">Punktzahl</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="player in game.spieler" :key="player.id" >
          <td :class='getPlayerHighlightClass(player)'>{{ creatorDisplayName(player)}}</td>
          <td>{{ player.punktzahl }}</td>
      </tr>
      </tbody>
    </v-table>
  <div class='chatBox'>
    <v-btn class="chatOutput" @click="getAnswer">Get Answer</v-btn>
    <v-card style='margin-top: 1rem'>
      <v-card-text>
        {{game.currentQuestion}}
      </v-card-text>
    </v-card>
    <div class="timer chatOutput" v-if="remainingTime > 0">
      Time: {{ remainingTime }} seconds
    </div>
  </div>
    <ul style='display:flex; flex-direction: column; justify-content: center; flex-wrap: wrap; margin-right: 5%'>
      <v-btn style='margin: 0.5rem' v-for="(answer, index) in game.possibleAnswers" :key="index" @click="checkAnswer(answer)">
        {{ answer }}
      </v-btn>
    </ul>
  </div>
  <DeleteGameButton v-if="isGameCreator" @click="deleteGame" />

</template>


<style>
.headline {
  display: flex;
  font-size: xxx-large;
  color: #181818;
  font-weight: bold;
  margin-bottom: 5%;
  justify-content: center;
}
.boxPlayerList {
  padding-top: 20px;
  padding-bottom: 40px;
  margin-left: 5%;
  margin-right: 5%;
  padding-left: 1%;
  padding-right: 1%;
}
.highlightedCreator {
  color: blue;
}

.highlightedSelf {
  color: black;
}

.highlightedHighestScorer {
  color: red;
}
.chatOutput {
  color: #181818;
  font-weight: bold;
}
.chatBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 5%;
}
</style>

<script>
import { RouterLink } from 'vue-router'
import DeleteGameButton from '@/components/DeleteGameButton.vue'
import JoinGameButton from '@/components/JoinGameButton.vue'
import OpenAI from 'openai'
import { readonly } from 'vue'

export default {
  name: 'DynamicForm',
  components: { JoinGameButton, DeleteGameButton, RouterLink },
  props: ['title'],
  data() {
    return {
      game: null,
      gameId: '',
      PlayerID: '',
      Spieler: null,
      updatedPunktzahl: 0, // Neu hinzugefügt
      highestScorer: null,
      gameCreatorName: '',
      inputText: "",
      answer: '',
      givenSongName: '',
      description: '',
      possibleAnswers: [],
      timer: null,
      remainingTime: 30,
      playerAttributes: [
        { text: 'Player Name', value: 'playerName' },
        { text: 'Punktzahl', value: 'punktzahl' },
      ],
      loading: false,
    }
  },
  created() {
    this.getGameById(this.$route.params.id);
    setInterval(() => {
      this.getGameById(this.$route.params.id);
    }, 2000);
    this.PlayerID = this.$route.params.playerid
  },
  computed: {
    isGameCreator() {
      return this.PlayerID === this.gameCreatorName;
    },
  },
  methods: {
    checkAnswer(selectedAnswer) {
      clearInterval(this.timer);

      if (selectedAnswer === this.game.givenSongName) {
        this.updatePunktzahl(this.PlayerID)
        console.log('Correct answer!');
        // Handle correct answer logic here
      } else {
        console.log('Incorrect answer!');
        // Handle incorrect answer logic here
      }
    },
    async getAnswer() {
      // if (this.songInput.trim() === '') {
      //   // Handle empty song input
      //   return;
      // }

      const randomLetter = this.generateRandomLetter();
      const prompt = `
      Imagine you are a funny game master of a quiz.
      Your task is it to ask one question.
      The question is about the name of a song.

      Your will rewrite the lyrics of a random Song that starts with the letter ${randomLetter} you have chosen as the game master and within 8 sentences max, without using the lyrics and the name of the artist. The description shouldn't contain the name of the song or any words used in the title of the song.
      In addition to that you should give 4 possible answers and provide the name of the songs and the artist names. On a scale of 1-10 in terms of how specific the description should be, it should be a 7. Also, you should always pick a new song each time this prompt is written.
      Your output should be in the following parsable JSON format:

      {
         "givenSongName": "name of the song and artist of song",
         "description": "this should be the description of the song",
         "possibleAnswers": ["givenSongName and artist of givenSongName", "other song and artist 2", "other song and artist 3", "other song and artist 4"]
      }
    `;

      await this.getGptCompletition(prompt);
      this.remainingTime = 30;

      // Start the timer for 30 seconds
      this.timer = setInterval(() => {
        // Decrease the remaining time
        this.remainingTime--;

        // Check if the time has run out
        if (this.remainingTime < 0) {
          clearInterval(this.timer);
          console.log("No one found the right answer");
          // You can add additional logic here if needed
        }
      }, 1000);



    },
    async getGptCompletition(input) {
      const openai = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true });

      const conversation = [
        { role: 'system', content: 'You are a funny game master of a quiz.' },
        // Add more conversation history as needed
      ];

      // Add the user's prompt to the conversation
      conversation.push({ role: 'user', content: input });


        // Generate completions using the conversation
        const completion = await openai.chat.completions.create({
          messages: conversation,
          model: 'gpt-3.5-turbo-1106',
        });


      const response = completion.choices[0].message.content;
      const parsedResponse = JSON.parse(response)

      // Extract the relevant parts
      const givenSongName = parsedResponse.givenSongName;
      const description = parsedResponse.description;
      const possibleAnswers = parsedResponse.possibleAnswers;

      // Now you can use these variables as needed
      console.log("Given Song Name:", parsedResponse.givenSongName);
      console.log("Description:", parsedResponse.description);
      console.log("Possible Answers:", parsedResponse.possibleAnswers);

      // Store the values in your component's data
      this.givenSongName = givenSongName;
      this.description = description;
      this.possibleAnswers = this.shuffleArray(possibleAnswers);

      if (description.trim() !== '') {
        this.updateQuestion();
      }
    },
    shuffleArray(array) {
      // Fisher-Yates shuffle algorithm
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    creatorDisplayName(player) {
      if (player.playerName === this.gameCreatorName) {
        return `Creator: ${player.playerName}`;
      } else {
        return player.playerName;
      }
    },
    getPlayerHighlightClass(player) {
      if (player.playerName === this.gameCreatorName) {
        return 'highlightedCreator';
      } else if (player.playerName === this.PlayerID) {
        return 'highlightedSelf';
      } else if (player.id === this.highestScorer.id) {
        return 'highlightedHighestScorer';
      } else {
        return ''; // No specific highlighting
      }
    },
    getHighestScorer() {
      if (this.game && this.game.spieler && this.game.spieler.length > 0) {
        this.highestScorer = this.game.spieler.reduce((prev, current) => {
          return (prev.punktzahl > current.punktzahl) ? prev : current;
        });
      }
    },
    updatePunktzahl(playerName) {

      console.log("player", playerName);
      const endpoint = `http://localhost:8080/game/increaseScore/${playerName}`;
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      };
      // updates local player punktzahl before server request is handled but error handling might have to be implemented
      const updatedPlayerIndex = this.game.spieler.findIndex(player => player.id === playerName);
      if (updatedPlayerIndex !== -1) {
        this.game.spieler[updatedPlayerIndex].punktzahl = this.updatedPunktzahl;
      }
      fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          // Refresh player data after updating the score
          this.getGameById(this.$route.params.id);
        })
        .catch(error => console.log('error', error));
    },
    getGameById(id) {
      const endpoint = `http://localhost:8080/game/${id}`
      const requestOptions = {
        method: 'GET',
      }
      fetch(endpoint, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          this.game = result
          if (this.game && this.game.spieler && this.game.spieler.length > 0) {
            this.gameCreatorName = this.game.spieler[0].playerName;
          }
          this.getHighestScorer(); // Hinzugefügt, um den höchsten Scorer zu aktualisieren
        })
        .catch((error) => console.log('error', error))
    },
    deleteGame() {
      const endpoint = `http://localhost:8080/game/${this.$route.params.id}`
      const requestOptions = {
        method: 'DELETE',
      }
      fetch(endpoint, requestOptions)
        .then(() => this.$router.push('/'))
        .catch((error) => console.log('error', error))
    },
    joinGame() {
      const endpoint = 'http://localhost:8080/game/join'
      const data = {
        gameId: this.$route.params.id,
        spielerName: this.newPlayer,
      }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }
      fetch(endpoint, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data)
          // Reset form or handle success
          this.$router.push(`/game/${this.game.id}/join`)
        })
        .catch((error) => console.log('error', error))
    },
    updateQuestion() {
      const endpoint = `http://localhost:8080/game/updateQuestion/${this.game.id}`;

      const data = {
        currentQuestion: this.description,
        possibleAnswers: this.possibleAnswers,
        givenSongName: this.givenSongName
      };
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      };
      fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          // Refresh player data after updating the score
          this.getGameById(this.$route.params.id);
        })
        .catch(error => console.log('error', error));
    },
    generateRandomLetter() {
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      return alphabet.charAt(randomIndex);
    },
  },
}
</script>
