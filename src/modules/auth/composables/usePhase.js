import { useStore } from 'vuex';
import { computed } from 'vue';

const usePhase = () => {
  const store = useStore()

  const getUniversities = async () => {
    await store.dispatch('auth/getUniversities');
  };

  const getDegrees = async (universityId) => {
    await store.dispatch('auth/getDegrees', universityId);
  };

  const getRegions = async () => {
    await store.dispatch('auth/getRegions');
  };

  const getProvinces = async (regionId) => {
    await store.dispatch('auth/getProvinces', regionId);
  };

  const getDistricts = async (provinceId) => {
    await store.dispatch('auth/getDistricts', provinceId);
  };

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
    getUniversities,
    getDegrees,
    getRegions,
    getProvinces,
    getDistricts,
    updateUser,
    createUser,
    loginUser,
    universities: computed(() => store.getters['auth/universities']),
    degrees: computed(() => store.getters['auth/degrees']),
    regions: computed(() => store.getters['auth/regions']),
    provinces: computed(() => store.getters['auth/provinces']),
    districts: computed(() => store.getters['auth/districts']),
    user: computed(() => store.getters['auth/user']),
  }
}

export default usePhase;