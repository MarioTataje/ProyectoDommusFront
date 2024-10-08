<template>
  <div v-if="profile" class="profile-container">
    <div class="profile-content">
      <div class="profile-header">
        <img :src="profileImage" alt="Profile Image" class="profile-img" />
        <div class="profile-details">
          <h2 class="profile-name">{{ profile.names }}</h2>
          <span class="profile-personality">{{ profile.personality.tag }}</span>
          <div class="profile-info">
            <span class="profile-tag1">{{ profile.university_name }}</span>
            <span class="profile-tag2">{{ profile.degree_name }}</span>
            <span class="profile-tag3">{{ profile.district_name }}</span>
            <span class="profile-tag4">{{ profile.budget_min }} - {{ profile.budget_max }} S/.</span>
          </div>
        </div>
      </div>
      <div class="profile-description">
        <p>{{ profile.description }}</p>
      </div>
      <div class="profile-habits">
        <div class="habits-section">
          <div class="habits-heading">
            <div class="habits-text">Mis hábitos</div>
          </div>
          <ul>
            <li v-for="habit in habitsArray" :key="habit">{{ habit }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="loading-message">Cargando perfil...</div>
</template>

<script>
import { onMounted, computed } from 'vue';
import useProfile from '../composables/useProfile';
import usePhase from '@/modules/auth/composables/usePhase';

export default {
  name: 'Profile',
  setup() {
    const { userId } = usePhase();
    const { profile, getUserProfile } = useProfile();

    onMounted(async () => {
      const id = userId.value;
      await getUserProfile(id);
    });

    const habitsArray = computed(() => {
      return profile.value?.habits ? profile.value.habits.split(',').map(habit => habit.trim()) : [];
    });

    const activeTab = ref('configuracion');

    const profileImage = computed(() => {
      return profile.value?.genre === 'M'
        ? require('@/assets/profiles/men-profile.png')
        : require('@/assets/profiles/women-profile.png');
    });

    return {
      profile,
      habitsArray,
      profileImage,
      activeTab
    };
  }
};
</script>

<style scoped>
.profile-container {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(100vw - 400px);
  height: 100vh;
  padding: 20px;
  border-radius: 15px;
  overflow: hidden;
  box-sizing: border-box;
}

.profile-content {
  background-color: #fff;
  border: 2px solid #8C52FF;
  border-radius: 15px;
  padding: 20px;
  box-sizing: border-box;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading-message {
  font-size: 1.5em;
  color: #777;
  text-align: center;
  margin-top: 50px;
}

.profile-header {
  display: flex;
  align-items: center;
  width: 100%;
}

.profile-img {
  border-radius: 15px;
  width: 250px;
  height: 250px;
  object-fit: cover;
  margin-right: 20px;
}

.profile-details {
  display: flex;
  flex-direction: column;
  width: 80%;
  align-items: center;
}

.profile-name {
  font-size: 1.5em;
  margin: 0;
  color: #8C52FF;
  text-align: center;
  width: 100%;
}

.profile-personality {
  background-color: #BB9FFF;
  color: white;
  border-radius: 12px;
  padding: 5px 10px;
  margin: 5px 0;
  text-align: center;
  width: 60%;
}

.profile-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 60%;
}

.profile-tag1,
.profile-tag2,
.profile-tag3,
.profile-tag4 {
  color: white;
  border-radius: 12px;
  padding: 5px 10px;
  margin: 5px 0;
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

.profile-tag4 {
  background-color: #7AD67E;
}

.profile-description {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid #8C52FF;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: white;
  margin-top: 20px;
}

.profile-description p {
  margin: 0;
}

.profile-habits {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.profile-habits h3 {
  margin-bottom: 10px;
}

.habits-section {
  display: flex;
  align-items: flex-start;
}

.habits-heading {
  align-items: center;
  justify-content: center;
  margin-right: 100px;
}

.habits-text {
  font-size: 1.2em;
  color: #8C52FF;
  align-items: center;
  margin-bottom: 0;
}

.habits-img {
  width: 150px;
  height: 150px;
  margin-left: 20px;
  margin-top: 20px;
  margin-bottom: 0;
}

.profile-habits ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.profile-habits li {
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 5px;
}
</style>
