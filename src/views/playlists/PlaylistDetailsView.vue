<template>
  <div v-if="error" class="error">{{ error }}</div>
  <div v-if="playlist" class="playlist-detail">
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl" alt="" />
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="userName">автор: {{ playlist.userName }}</p>
      <p class="description">{{ playlist.description }}</p>
      <button @click="handelDelete">Удалить</button>
    </div>
    <div class="soun-list">
      <div v-if="!playlist.souds.length">В этом списке нет песен</div>
      <div v-for="song in playlist.souds" :key="song.id" class="single-song">
        <div class="details">
          <h3>{{ song.title }}</h3>
          <p>{{ song.artist }}</p>
        </div>
        <button v-if="ownership" @click="handleClick(song.id)">Удалить</button>
      </div>
      <AddSong v-if="ownership" :playlist="playlist" />
    </div>
  </div>
</template>

<script>
  import AddSong from '../../components/AddSong.vue';
  import { computed } from 'vue';
  import getDocument from '../../composable/getDocument';
  import getUser from '../../composable/getUser';
  import useDocument from '../../composable/useDocument';
  import useStorage from '../../composable/useStorage';
  import { useRouter } from 'vue-router';

  export default {
    props: ['id'],
    components: {
      AddSong,
    },
    setup(props) {
      const { user } = getUser();
      const { error, document: playlist } = getDocument('playlist', props.id);
      const { deletDoc, myUpdateDoc } = useDocument('playlist', props.id);
      const { deleteImage } = useStorage();
      const router = useRouter();
      const ownership = computed(() => {
        return (
          playlist.value &&
          user.value &&
          user.value.uid == playlist.value.userId
        );
      });

      const handelDelete = async () => {
        await deleteImage(playlist.value.filePach);
        await deletDoc();
        router.push({ name: 'home' });
      };

      const handleClick = async (id) => {
        await myUpdateDoc({
          souds: playlist.value.souds.filter((item) => item.id !== id),
        });
      };

      return { error, playlist, ownership, handelDelete, handleClick };
    },
  };
</script>

<style lang="scss" scoped>
  .playlist-detail {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 80px;

    .playlist-info {
      text-align: center;
      .cover {
        overflow: hidden;
        border-radius: 20px;
        position: relative;
        padding: 160px;
        img {
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          min-width: 100%;
          min-height: 100%;
          max-width: 200%;
          max-height: 200%;
        }
      }
      h2 {
        text-transform: capitalize;
        font-size: 28px;
        margin-top: 20px;
      }
      p {
        margin-bottom: 20px;
      }
      .userName {
        color: #999;
      }
      .description {
        text-align: left;
      }
    }
  }
  .single-song {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed var(--secondary);
    margin-bottom: 20px;
  }
  // .details {
  //   display: flex;
  //   align-items: center;
  //   padding: 20px;
  // }
</style>
