import { createRouter, createWebHistory } from 'vue-router'
import GameList from '@/components/GameList.vue'
import InputGamerTag from '@/components/InputGamerTag.vue'
import CreateGameForm from '@/components/CreateGameForm.vue'
import PlayerLobby from '@/components/PlayerLobby.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: GameList,
    },
    { path: '/game/create', component: CreateGameForm },
    { path: '/game/:id', component: InputGamerTag },
    { path: '/game/:id/:playerid', component: PlayerLobby },
  ],
})

export default router
