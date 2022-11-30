import { ref } from 'vue';
import { auth } from '../firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const error = ref(null);
const isPending = ref(false);
const signup = async (email, password, displayName) => {
  error.value = null;
  isPending.value = true;
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(user, { displayName });
    isPending.value = false;
    return user;
  } catch (err) {
    console.log('ERROR: ' + err.message);
    error.value = err.message;
    isPending.value = false;
  }
};

const useSignup = () => {
  return { error, signup, isPending };
};
export default useSignup;
