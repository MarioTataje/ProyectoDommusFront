import { useStore } from 'vuex';
import { computed } from 'vue';

const useProfile = () => {
  const store = useStore()

  const getUserProfile = async (userId) => {
    await store.dispatch('student/getUserProfile', userId);
  };

  const getProfiles = async (userId) => {
    await store.dispatch('student/getProfiles', userId);
  };

  return {
    getUserProfile,
    getProfiles,
    profile: computed(() => store.getters['student/profile']),
    profiles: computed(() => store.getters['student/profiles']),
  }
}

export default useProfile;