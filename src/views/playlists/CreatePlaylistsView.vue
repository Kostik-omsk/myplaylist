<template>
  <form @submit.prevent="handelSubmit">
    <h4>Создай Плей-лист</h4>
    <input type="text" required placeholder="Заголовок" v-model="title" />
    <textarea
      required
      placeholder="Описание плей-листа"
      v-model="description"
    ></textarea>
    <label>Загрузи обложку</label>
    <input type="file" @change="uploadFile" />

    <div class="error">{{ fileError }}</div>
    <div class="error">{{ error }}</div>
    <button v-if="!isPending">Создать</button>
    <button v-else disabled>Загружаю...</button>
  </form>
</template>

<script>
  import { ref } from 'vue';
  import useCollection from '../../composable/useCollection';
  import useStorage from '../../composable/useStorage';
  import getUser from '../../composable/getUser';
  import { serverTimestamp } from 'firebase/firestore';
  import { useRouter } from 'vue-router';

  export default {
    setup() {
      const { url, filePath, uploadImage, error } = useStorage();
      const { addDocument } = useCollection('playlist');
      const { user } = getUser();
      const router = useRouter();

      const title = ref('');
      const description = ref('');
      const file = ref(null);
      const fileError = ref(null);
      const isPending = ref(false);

      //тип файла
      const types = ['image/png', 'image/jpeg'];
      const uploadFile = (e) => {
        let [files] = e.target.files;
        if (files && types.includes(files.type)) {
          file.value = files;
          fileError.value = null;
        } else {
          file.value = null;
          fileError.value = 'Используйте изображения (png или jpeg)';
        }
      };

      //отправка
      const handelSubmit = async () => {
        if (file.value) {
          isPending.value = true;
          await uploadImage(file.value);
          const res = await addDocument({
            title: title.value,
            description: description.value,
            userId: user.value.uid,
            userName: user.value.displayName,
            coverUrl: url.value,
            filePach: filePath.value,
            souds: [],
            createdAt: serverTimestamp(),
          });
          isPending.value = false;
          if (!error.value) {
            console.log('Фаил добавлен!');
            router.push({
              name: 'PlaylistDetails',
              params: { id: res.id },
            });
          }
        }
      };

      return {
        title,
        description,
        handelSubmit,
        isPending,
        error,
        uploadFile,
        fileError,
      };
    },
  };
</script>

<style lang="scss" scoped>
  form {
    input[type='file'] {
      border: 0;
      padding: 0;
    }
    label {
      font-style: 12px;
      display: block;
      margin-top: 30px;
    }
    button {
      margin-top: 20px;
    }
  }
</style>
