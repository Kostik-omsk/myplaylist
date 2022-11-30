import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { ref } from 'vue';

const error = ref(null);
const isPending = ref(false);
const login = async (email, password) => {
  error.value = null;
  isPending.value = true;
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    isPending.value = false;
    return user;
  } catch (err) {
    error.value = err.message;
    isPending.value = false;
  }
};
const useLogin = () => {
  return {
    login,
    error,
    isPending,
  };
};
export default useLogin;
