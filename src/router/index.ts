import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameList from "@/components/GameList.vue";
import GameLobby from "@/components/GameLobby.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: GameList
    },
    { path: '/game/:id', component: GameLobby },
  ]
})

export default router
