<template>
  <v-card class="mx-auto" max-width="1000">
    <v-toolbar style="border: 3px solid red" color="cyan-lighten-1">

      <v-toolbar-title >Spiele</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn variant="text" icon="mdi-magnify"></v-btn>
    </v-toolbar>
    <v-list :items="items" item-props lines="three">
      <template v-slot:subtitle="{ subtitle }">
        <div v-html="subtitle"></div>
      </template>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        subtitle:
            `
<tr v-if="items.length === 0">
          <td colspan="2">Keine Spiele</td>
        </tr>
        <tr v-for="item in items" :key="item.id">
          <td>{{}}</td>
</tr>

`,
      }
    ],
  }),
}
</script>

<style>
.Box-Überschrift {
  display: flex;
  justify-items: center;
}

</style>


