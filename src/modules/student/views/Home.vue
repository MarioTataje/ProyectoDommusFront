<template>
  <div class="home-container">
    <h1 class="home-title">Roommies</h1>
    <Match :otherId="otherId" v-if="showModal" @close="closeModal"></Match>
    <OtherProfile :profileId="profileId" v-if="showProfile" @close="closeProfile"></OtherProfile>
    <div class="profiles">
      <div v-for="profile in profiles" :key="profile.id" class="profile-card" @click="openProfile(profile.id)">
        <img :src="profile.genre === 'M' ? require('@/assets/profiles/men-profile.png') : require('@/assets/profiles/women-profile.png')" 
          alt="User Image" 
          class="profile-img"
        />
        <div class="profile-info">
          <h2>{{ profile.names }}</h2>
          <p class="profile-tag1">{{ profile.personality.tag  }}</p>
          <p class="profile-tag2">{{ profile.district_name }}</p>
          <p class="profile-tag3">{{ profile.degree_name }}</p>
        </div>
        <div class="profile-actions">
          <button class="accept-btn" @click="acceptProfile(profile.id)">
            <span class="material-icons">check</span>
          </button>
          <button class="reject-btn" @click="rejectProfile(profile.id)">
            <span class="material-icons">close</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { onMounted, ref } from 'vue';
  import OtherProfile from './modals/OtherProfile.vue'; 
  import Match from './modals/Match.vue'; 
  import useProfile from '../composables/useProfile';
  import useMatch from '../composables/useMatch';
  import usePhase from '@/modules/auth/composables/usePhase';

  export default {
    name: 'Home',
    components: { 
      Match, 
      OtherProfile 
    },
    setup() {
      const { profiles, getProfiles } = useProfile();
      const { userId } = usePhase();
      const { sendLike, sendDislike } = useMatch();
      const profileId = ref(null);
      const otherId = ref(null);
      const showProfile = ref(false);
      const showModal = ref(false);

      onMounted(() => {
        getProfiles(userId.value);
      });

      const openProfile = (id) => {
        profileId.value = id;
        showProfile.value = true;
      };

      const closeProfile = () => {
        showProfile.value = false;
      };

      const closeModal = () => {
        showModal.value = false;
      };

      const acceptProfile = async (receiverId) => {
        const senderId = userId.value;
        const like = await sendLike(senderId, receiverId);
        if (like.flag_match){
          const id = like.sender.id !== senderId ? like.sender.id : like.receiver.id;
          otherId.value = id;
          showModal.value = true;
        }
        await getProfiles(senderId);
      };

      const rejectProfile = async (receiverId) => {
        const senderId = userId.value;
        await sendDislike(senderId, receiverId);
        await getProfiles(senderId);
      };

      return {
        profiles,
        acceptProfile,
        rejectProfile,
        openProfile,
        closeProfile,
        closeModal,
        showProfile,
        showModal,
        profileId,
        otherId
      };
    }
  };
</script>

<style scoped>
.home-container {
  background-color: #fff;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(100vw - 400px);
  height: 100%;
  padding: 20px;
  border-radius: 15px;
  box-sizing: border-box;
}

.home-title {
  margin-left: 20px;
  margin-top: 20px;
  margin-bottom: 30px;
}

h1 {
  color: #7b4fe3;
  font-size: 2em;
  margin-bottom: 20px;
}

h2 {
  color: #8C52FF;
  font-weight: bold;
}

.profiles {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 95%;
  overflow-x: auto;
  margin-left: 20px;
  margin-right: 20px;
  padding: 10px;
  box-sizing: border-box;
}

.profile-card {
  background-color: transparent;
  border-radius: 15px;
  padding: 20px;
  width: 250px;
  text-align: center;
  border: 1px solid #8C52FF;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  flex: 0 0 auto;
}

.profile-img {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-bottom: 15px;
}

.profile-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-info h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.profile-info p {
  color: white;
  font-size: 1em;
  margin: 5px 0;
}

.profile-actions {
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
}

.profile-tag1,
.profile-tag2,
.profile-tag3 {
  color: white;
  width: 60%;
  border-radius: 12px;
  padding: 5px 10px;
}

.profile-tag1 {
  background-color: #EDCE80;
}

.profile-tag2 {
  background-color: #9AC5EC;
}

.profile-tag3 {
  background-color: #FB7DEE;
}

.accept-btn,
.reject-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.accept-btn {
  color: #4caf50;
}

.reject-btn {
  color: #f44336;
}

.accept-btn:hover {
  background-color: #e8f5e9;
}

.reject-btn:hover {
  background-color: #ffebee;
}
</style>
