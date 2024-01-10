import { RouterLink, RouterView } from 'vue-router'
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <Button>
      <v-btn a href="/" style="text-decoration: none" height="50" width="100">
        Home
      </v-btn>
  </Button>

  <RouterView />
</template>

<style scoped>
Button {
  font-weight: bold;
  font-size: xx-large;
  display: flex;
  margin-left: 200px;
  text-decoration: none;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}



nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>