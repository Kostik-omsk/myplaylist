<template>
  <div class="home">
    <div class="error" v-if="error">Нет данных</div>

    <div class="playlist" v-if="documents">
      <Playlist :playlists="documents" />
    </div>
  </div>
</template>

<script>
  import getCollection from '../composable/getCollection';
  import Playlist from '../components/Playlist.vue';
  export default {
    name: 'Home',
    components: {
      Playlist,
    },
    setup() {
      const { documents, error } = getCollection('playlist');
      return { error, documents };
    },
  };
</script>

<style lang="scss" scoped></style>
