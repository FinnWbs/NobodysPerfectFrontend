<template>
  <div style='padding-top: 10%'>
    <v-card class="mx-auto px-6 py-8" max-width="344">
      <v-form v-model="form" @submit.prevent="save">
        <v-text-field
          v-model="gameName"
          :readonly="loading"
          :rules="[rules.required, rules.validateGameName]"
          class="mb-2"
          clearable
          label="Game Name"
          id="gameName"
        ></v-text-field>

        <v-text-field
          v-model="gameCreatorName"
          :readonly="loading"
          :rules="[rules.required, rules.validateGameCreatorName]"
          clearable
          label="Creator Name"
          id="gameCreatorName"
        ></v-text-field>

        <br />

        <v-btn
          :loading="loading"
          block
          color="success"
          size="large"
          type="submit"
          variant="elevated"
        >
          Create Game
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  name: 'DynamicForm',
  components: { RouterLink },
  props: ['title'],
  data() {
    return {
      gameName: '',
      gameCreatorName: '',
      gameNamePlaceholder: 'Game Name',
      creatorNamePlaceholder: 'Creator Name',
      error: null,
      rules: {
        required: (value) => !!value || 'Field is required',
        validateGameName: (value) => {
          if (!value) {
            return 'Field is required';
          }

          if (value.length < 3 || value.length > 12) {
            return 'Game name must be between 3 and 12 characters';
          }

          return true; // Validation passed
        },
        validateGameCreatorName: (value) => {
          if (!value) {
            return 'Field is required';
          }
          // Check if the length is between 3 and 12 characters
          if (value.length < 3 || value.length > 12) {
            return 'Creator Name must be between 3 and 12 characters';
          }
          return true;
        },
      },
      loading: false,
    }
  },
  methods: {
    save() {
      this.loading = true
      const endpoint = 'http://localhost:8080/game'
      if (
        this.gameName === undefined ||
        this.gameName === '' ||
        this.gameName === null
      ) {
        this.error = 'please enter gameName'
        this.loading = false
        return
      }

      const validationMessage = this.rules.validateGameName(this.gameName);

      if (validationMessage !== true) {
        this.error = validationMessage;
        this.loading = false;
        return;
      }
      const validationMessage2 = this.rules.validateGameCreatorName(this.gameCreatorName);

      if (validationMessage2 !== true) {
        this.error = validationMessage2;
        this.loading = false;
        return;
      }

      const data = {
        gameName: this.gameName,
        gameCreatorName: this.gameCreatorName,
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
          this.$router.push(`/game/${data.id}/${this.gameCreatorName}`)
        })
        .catch((error) => {
          console.log('error', error)
          this.loading = false
        })
    },
  },
}
</script>

<style>
.formContainer {
  border: solid 1px white;
  max-width: 500px;
  border-radius: 16px;
  padding: 16px;
}

.formRow {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 1rem;
  border: solid 1px white;
  border-radius: 8px;
}


.formButton {
  border: solid 1px white;
  padding: 8px;
  border-radius: 16px;
  &:hover {
    background: dimgray;
  }
  width: 100%;
}

.formCreateContainer {
  max-width: inherit;
  display: flex;
  justify-content: center;
  color: #2c3e50;
  margin-top: 200px;
}
</style>