<template>
  <div v-if="profile" class="profile-container">
    <div class="profile-header">
      <img :src="profile.genre === 'M' ? require('@/assets/men_profile.png') : require('@/assets/women_profile.png')" 
          alt="Profile Image" 
          class="profile-img"
      />
      <div class="profile-details">
        <h2 class="profile-name">{{ profile.names }}</h2>
        <span class="profile-personality">{{ profile.personality }}</span>
        <div class="profile-info">
          <span class="profile-tag">{{ profile.university }}</span>
          <span class="profile-tag">{{ profile.degree_name }}</span>
          <span class="profile-tag">{{ profile.district_name }}</span>
          <span class="profile-tag">{{ profile.budget }}</span>
        </div>
      </div>
    </div>
    <div class="profile-description">
      <h3>Mi descripción</h3>
      <p>{{ profile.description }}</p>
    </div>
    <div class="profile-habits">
      <h3>Mis hábitos</h3>
      <ul>
        <li v-for="habit in profile.habits" :key="habit">{{ habit }}</li>
      </ul>
    </div>
  </div>
  <div v-else class="loading-message">Cargando perfil...</div>
</template>

<script>
import { onMounted } from 'vue';
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

    return {
      profile
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
  box-sizing: border-box;
  overflow: hidden;
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
  border-radius: 50%;
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-right: 20px;
}

.profile-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.profile-name {
  font-size: 1.5em;
  margin: 0;
}

.profile-personality {
  background-color: #e0e0e0;
  border-radius: 12px;
  padding: 5px 10px;
  margin: 5px 0;
}

.profile-info {
  display: flex;
  flex-wrap: wrap;
}

.profile-tag {
  background-color: #ffc107;
  border-radius: 12px;
  padding: 5px 10px;
  margin: 5px 5px 5px 0;
}

.profile-description,
.profile-habits {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.profile-description h3,
.profile-habits h3 {
  margin-bottom: 10px;
}

.profile-habits ul {
  list-style-type: none;
  padding: 0;
}

.profile-habits li {
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 5px;
}
</style>
