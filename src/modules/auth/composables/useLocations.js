import { useStore } from 'vuex';
import { computed } from 'vue';

const useLocations = () => {
  const store = useStore()

  const getRegions = async () => {
    await store.dispatch('auth/getRegions');
  };

  const getProvinces = async (regionId) => {
    await store.dispatch('auth/getProvinces', regionId);
  };

  const getDistricts = async (provinceId) => {
    await store.dispatch('auth/getDistricts', provinceId);
  };

  return {
    getRegions,
    getProvinces,
    getDistricts,
    regions: computed(() => store.getters['auth/regions']),
    provinces: computed(() => store.getters['auth/provinces']),
    districts: computed(() => store.getters['auth/districts'])
  }
}

export default useLocations;