import { useStore } from 'vuex';
import { computed } from 'vue';

const useStudies = () => {
  const store = useStore()

  const getUniversities = async () => {
    await store.dispatch('auth/getUniversities');
  };

  const getDegrees = async (universityId) => {
    await store.dispatch('auth/getDegrees', universityId);
  };

  return {
    getUniversities,
    getDegrees,
    universities: computed(() => store.getters['auth/universities']),
    degrees: computed(() => store.getters['auth/degrees']),
  }
}

export default useStudies;