<template>
  <div style='padding-top: 10%'>
    <v-card class="mx-auto px-6 py-8" max-width="344">
      <v-form v-model="form" @submit.prevent="save">
        <v-text-field
          v-model="gameName"
          :readonly="loading"
          :rules="[rules.required]"
          class="mb-2"
          clearable
          label="Game Name"
          id="gameName"
        ></v-text-field>

        <v-text-field
          v-model="gameCreatorName"
          :readonly="loading"
          :rules="[rules.required]"
          clearable
          label="Creator Name"
          id="gameCreatorName"
          placeholder="Enter your password"
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