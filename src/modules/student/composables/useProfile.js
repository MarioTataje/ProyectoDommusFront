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

  const getContacts = async (userId) => {
    await store.dispatch('student/getContacts', userId)
  };

  return {
    getUserProfile,
    getProfiles,
    getContacts,
    profile: computed(() => store.getters['student/profile']),
    profiles: computed(() => store.getters['student/profiles']),
    contacts: computed(() => store.getters['student/contacts']),
  }
}

export default useProfile;