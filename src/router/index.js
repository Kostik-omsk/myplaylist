import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/Home.vue';
import LoginView from '../views/auth/LoginView.vue';
import SignupView from '../views/auth/SignupView.vue';
import CreatePlaylistsView from '../views/playlists/CreatePlaylistsView.vue';
import PlaylistDetailsView from '../views/playlists/PlaylistDetailsView.vue';
import UserPlaylists from '../views/playlists/UserPlaylistView.vue';

//  riuter guard
import { auth } from '../firebase/config';
const requireAuth = (tp, from, next) => {
  let user = auth.currentUser;
  if (!user) {
    next({ name: 'Login' });
  } else {
    next();
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: requireAuth,
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/signup',
      name: 'Signup',
      component: SignupView,
    },
    {
      path: '/playlists/create',
      name: 'Playlists',
      component: CreatePlaylistsView,
    },
    {
      path: '/playlists/:id',
      name: 'PlaylistDetails',
      component: PlaylistDetailsView,
      beforeEnter: requireAuth,
      props: true,
    },
    {
      path: '/playlists/user',
      name: 'UserPlaylists',
      component: UserPlaylists,
      beforeEnter: requireAuth,
    },
  ],
});

export default router;
