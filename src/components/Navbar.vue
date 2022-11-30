<template>
  <div class="navbar">
    <nav>
      <img src="@/assets/kote.png" alt="kote" />
      <h1><router-link :to="{ name: 'home' }">Muso</router-link></h1>

      <div class="links">
        <div v-if="user">
          <span>Привет, {{ user.displayName }}</span>
          <router-link :to="{ name: 'Playlists' }"
            >Создать плейлист
          </router-link>
          <router-link :to="{ name: 'UserPlaylists' }"
            >Мои плейлисты
          </router-link>
          <button @click="clickLogout">Выход</button>
        </div>
        <div v-else>
          <router-link class="btn" :to="{ name: 'Signup' }"
            >Регистрация</router-link
          >
          <router-link class="btn" :to="{ name: 'Login' }">Вход</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  import useLogout from '../composable/useLogout';
  import getUser from '../composable/getUser';
  import { useRouter } from 'vue-router';
  export default {
    setup() {
      const { logout, error, isPending } = useLogout();
      const { user } = getUser();
      const router = useRouter();

      const clickLogout = async () => {
        await logout();
        if (!error.value) {
          console.log('Пока');
        }
        router.push({ name: 'Login' });
      };

      return { clickLogout, user };
    },
  };
</script>

<style lang="scss" scoped>
  .navbar {
    padding: 16px 10px;
    margin-bottom: 60px;
    background: white;
    nav {
      display: flex;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
      img {
        max-height: 60px;
      }
      h1 {
        margin-left: 20px;
      }
      .links {
        margin-left: auto;
        a,
        button {
          margin-left: 16px;
          font-size: 14px;
        }
        span {
          font-size: 14px;
          display: inline-block;
          margin-right: 16px;
          padding-right: 16px;
          border-right: 1px solid #eee;
        }
      }
    }
  }
</style>
