import { useStore } from 'vuex';
import { computed } from 'vue';

const usePhase = () => {
  const store = useStore();

  const updateUser = async(data) => {
    await store.dispatch('auth/updatePhaseUser', data);
  };

  const createUser = async(data) => {
    await store.dispatch('auth/createUser', data);
  };
  
  const loginUser = async(data) => {
    await store.dispatch('auth/loginUser', data);
  };

  return {
    updateUser,
    createUser,
    loginUser,
    user: computed(() => store.getters['auth/user']),
    userId: computed(() => store.getters['auth/userId']),
  }
}

export default usePhase;