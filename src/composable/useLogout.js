import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { ref } from 'vue';
const error = ref(null);
const isPending = ref(false);
const logout = async () => {
  error.value = null;
  isPending.value = true;
  await signOut(auth)
    .then(() => {
      isPending.value = false;
    })
    .catch((err) => {
      // An error happened.
      error.value = err.message;
      isPending.value = false;
    });
};
const useLogout = () => {
  return { logout, error, isPending };
};
export default useLogout;
