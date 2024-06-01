import { useStore } from 'vuex';
import { computed } from 'vue';

const useMatch = () => {
  const store = useStore()

  const sendLike = async (senderId, receivedId) => {
    await store.dispatch('student/sendLike', { senderId, receivedId });
  };

  const sendDislike = async (senderId, receivedId) => {
    await store.dispatch('student/sendDislike', { senderId, receivedId });
  };

  const getMatches = async (userId) => {
    await store.dispatch('student/getMatches', userId);
  };

  const getReceivedLikes = async (userId) => {
    await store.dispatch('student/getReceivedLikes', userId);
  };

  return {
    sendLike,
    sendDislike,
    getMatches,
    getReceivedLikes,
    matches: computed(() => store.getters['student/matches']),
    receivedLikes: computed(() => store.getters['student/receivedLikes']),
  }
}

export default useMatch;