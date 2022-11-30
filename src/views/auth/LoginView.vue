<template>
  <form @submit.prevent="handeleSubmit">
    <h2>Вход</h2>
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <div class="error" v-if="error">{{ error }}</div>
    <button v-if="!isPending">Войти</button>
    <button v-if="isPending" disabled>Загрузка</button>
  </form>
</template>

<script>
  import { ref } from 'vue';
  import useLogin from '../../composable/useLogin';
  import { useRouter } from 'vue-router';
  export default {
    setup() {
      const { login, error, isPending } = useLogin();

      const email = ref('');
      const password = ref('');
      const router = useRouter();

      const handeleSubmit = async () => {
        const res = await login(email.value, password.value);
        if (!error.value) {
          console.log('user logged in');
        }
        router.push({ name: 'UserPlaylists' });
      };

      return { email, password, handeleSubmit, error, isPending };
    },
  };
</script>

<style lang="scss" scoped></style>
