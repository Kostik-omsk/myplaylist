<template>
  <div class="add-song">
    <button @click="showForm = true" v-if="!showForm">Добавить Трек</button>
    <form v-if="showForm" @submit.prevent="handelSubmit">
      <h4>Допавить новую песню</h4>
      <input type="text" placeholder="Название" required v-model="title" />
      <input type="text" placeholder="Артист" required v-model="artist" />
      <button>Добавить</button>
    </form>
  </div>
</template>

<script>
  import { ref } from 'vue';
  import useDocument from '../composable/useDocument';

  export default {
    props: ['playlist'],
    setup(props) {
      const title = ref('');
      const artist = ref('');
      const showForm = ref(false);
      const { myUpdateDoc } = useDocument('playlist', props.playlist.id);

      const handelSubmit = async () => {
        const newSong = {
          title: title.value,
          artist: artist.value,
          id: Math.floor(Math.random() * 10000000),
        };
        await myUpdateDoc({
          souds: [...props.playlist.souds, newSong],
        });
        title.value = '';
        artist.value = '';
      };

      return { title, artist, showForm, handelSubmit };
    },
  };
</script>

<style lang="scss" scoped>
  .add-song {
    text-align: center;

    margin-top: 40px;
    form {
      max-width: 100%;
      text-align: left;
    }
  }
</style>
