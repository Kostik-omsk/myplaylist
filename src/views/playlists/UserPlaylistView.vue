<template>
  <div class="user-playlist">
    <h2>Мои плейлисты</h2>
    <div v-if="playlist">
      <Playlist :playlists="playlist" />
    </div>
    <router-link :to="{ name: 'Playlists' }" class="btn"
      >Создать плейлист
    </router-link>
  </div>
</template>

<script>
  import getCollection from '../../composable/getCollection';
  import getUser from '../../composable/getUser';
  import Playlist from '../../components/Playlist.vue';
  export default {
    components: {
      Playlist,
    },
    setup() {
      const { user } = getUser();
      const { documents: playlist } = getCollection('playlist', [
        'userId',
        '==',
        user.value.uid,
      ]);

      return { playlist };
    },
  };
</script>

<style lang="scss" scoped></style>
