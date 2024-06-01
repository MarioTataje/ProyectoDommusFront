import { useStore } from 'vuex';
import { computed } from 'vue';

const useProfile = () => {
  const store = useStore()

  const getProfiles = async (userId) => {
    await store.dispatch('student/getProfiles', userId);
  };

  return {
    getProfiles,
    profiles: computed(() => store.getters['student/profiles']),
  }
}

export default useProfile;