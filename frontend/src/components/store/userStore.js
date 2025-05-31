import { ref } from 'vue';

const user = ref(JSON.parse(localStorage.getItem('user_data') || null));

export function useUser() {
  const setUser = (userData) => {
    user.value = userData;
    localStorage.setItem('user_data', JSON.stringify(userData));
  };

  const clearUser = () => {
    user.value = null;
    localStorage.removeItem('user_data');
    localStorage.removeItem('token');
  };

  return {
    user,
    setUser,
    clearUser
  };
}
