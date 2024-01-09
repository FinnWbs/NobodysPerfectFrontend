<!-- SpielerDetailPage.vue -->
<template>
  <div>
    <h2>Spielerdetails</h2>
    <p>ID: {{ playerId }}</p>
    <!-- Weitere Details des Spielers anzeigen -->
  </div>
</template>

<script>
export default {
  name: 'SpielerDetailPage',
  props: ['playerid'],
  // Füge hier Methoden oder Lifecycle-Hooks hinzu, um die Spielerdetails abzurufen
};
</script>

<style scoped>
/* Füge hier Stilregeln hinzu */
</style>
