<template>
  <form @submit.prevent="handeleSubmit">
    <h2>Регистрация</h2>
    <input type="text" placeholder="Имя" v-model="displayName" />
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Пароль" v-model="password" />
    <div class="error" v-if="error">{{ error }}</div>
    <button v-if="!isPending">Отправить</button>
    <button v-if="isPending" disabled>Загрузка</button>
  </form>
</template>

<script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import useSignup from '../../composable/useSignup';
  export default {
    setup() {
      const { signup, error, isPending } = useSignup();
      const displayName = ref('');
      const email = ref('');
      const password = ref('');
      const router = useRouter();

      const handeleSubmit = async () => {
        const res = await signup(
          email.value,
          password.value,
          displayName.value
        );
        if (!error.value) {
          console.log('данные отправленны');
          router.push({ name: 'UserPlaylists' });
        }
      };

      return { password, email, error, isPending, handeleSubmit, displayName };
    },
  };
</script>

<style lang="scss" scoped></style>
