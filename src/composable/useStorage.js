import { ref } from 'vue';
import { storage } from '../firebase/config';
import {
  ref as fbRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import getUser from '../composable/getUser';
const { user } = getUser();

const useStorage = () => {
  const error = ref(null);
  const url = ref(null);
  const filePath = ref(null);

  const uploadImage = async (file) => {
    try {
      filePath.value = `cover/${user.value.uid}/${file.name}`;
      const storageRef = fbRef(storage, filePath.value);
      await uploadBytes(storageRef, file).then(async (snapshot) => {
        url.value = await getDownloadURL(snapshot.ref);
      });
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  };

  const deleteImage = async (path) => {
    const storageRef = fbRef(storage, path);
    try {
      await deleteObject(storageRef);
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  };

  return { error, url, filePath, uploadImage, deleteImage };
};
export default useStorage;
