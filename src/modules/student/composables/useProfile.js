import { useStore } from 'vuex';
import { computed } from 'vue';

const useProfile = () => {
  const store = useStore()

  const getUserProfile = async (userId) => {
    await store.dispatch('student/getUserProfile', userId);
  };

  const getProfiles = async (userId, data) => {
    await store.dispatch('student/getProfiles', { userId, data });
  };

  const getContacts = async (userId) => {
    await store.dispatch('student/getContacts', userId)
  };

  const updatePlan = async (userId, data) => {
    const response = await store.dispatch('student/updatePlan', { userId, data });
    return response;
  };

  return {
    getUserProfile,
    getProfiles,
    getContacts,
    updatePlan,
    profile: computed(() => store.getters['student/profile']),
    profiles: computed(() => store.getters['student/profiles']),
    contacts: computed(() => store.getters['student/contacts']),
  }
}

export default useProfile;