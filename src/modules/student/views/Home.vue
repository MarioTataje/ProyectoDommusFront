<template>
  <div class="home-container">
    <Match :otherId="otherId" v-if="showModal" @close="closeModal"></Match>
    <OtherProfile :profileId="profileId" v-if="showProfile" @close="closeProfile"></OtherProfile>

    <!-- Texto explicativo sobre los perfiles -->
    <div class="profiles-info">
      <p class="info-title">2000 Roomies Registrados</p>
      <p class="info-sub-title">Los roomies están clasificados en 3 categorías según su compatibilidad</p>
    </div>

    <div class="profiles">
      <div v-for="profile in profiles" :key="profile.id"
        :class="['profile-card', getCardColor(profile)]" @click="openProfile(profile.id)">
        <img 
          :src="profile.genre === 'M' ? require('@/assets/profiles/men-profile.png') : require('@/assets/profiles/women-profile.png')"
          alt="User Image" class="profile-img"/>
        <div class="compatibility-circle">
          <span>{{ profile.compatibility }}%</span>
        </div>
        <div class="profile-info">
          <h2>{{ profile.names + ' ' + profile.lastnames }}</h2>
          <!-- Contenedor para los dos primeros tags -->
          <div class="tags-container">
            <p class="profile-tag1">{{ profile.personality.tag }}</p>
            <p class="profile-tag2">{{ profile.district_name }}</p>
          </div>
          <p class="profile-tag3">{{ profile.degree_name }}</p>
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

    const getCardColor = (profile) => {
      const { compatibility } = profile;
      if (compatibility >= 80) return 'card-green';
      if (compatibility >= 40) return 'card-blue';
      return 'card-red';
    };

    return {
      openProfile,
      closeProfile,
      closeModal,
      showProfile,
      showModal,
      getCardColor,

      profiles,
      profileId,
      otherId
    };
  }
};
</script>

<style scoped>
.home-container {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.profiles-info {
  text-align: center;
  margin-bottom: 20px;
  position: absolute; /* Para moverlo a una posición más arriba */
  top: 100px; /* Controla la separación desde el margen superior */
}

.info-title {
  font-size: 1.6em;
  color: #1E1E1E;
  font-weight: bold;
}

.info-sub-title {
  font-size: 1.2em;
  color: #6441A4;
}

.profiles {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 100%;
  padding: 10px;
  margin-top: 50px; /* Ajustar para compensar el desplazamiento hacia arriba del texto */
}

.profile-card {
  position: relative;
  background-color: white;
  padding: 40px 20px 20px;
  border-radius: 15px;
  padding: 20px;
  width: 250px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.profile-card.card-red {
  border: 3px solid #f44336;
}

.profile-card.card-blue {
  border: 3px solid #2196f3;
}

.profile-card.card-green {
  border: 3px solid #4caf50;
}

.compatibility-circle {
  position: absolute;
  top: -15px;
  right: -15px;
  background-color: white;
  border-radius: 60%;
  border: 3px solid #ccc;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-img {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-bottom: 15px;
}

.profile-info h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.tags-container {
  display: flex;
  justify-content: space-between; /* Distribuye el espacio entre los dos tags */
  margin-bottom: 10px;
}

.profile-info p {
  font-size: 1em;
  margin: 5px 0;
}

.profile-tag1, .profile-tag2, .profile-tag3 {
  display: block;
  color: black;
  background-color: #F0F0FF;
  border-radius: 12px;
  padding: 5px;
}

.profile-tag1, .profile-tag2 {
  width: 48%; /* Ajustar el ancho para que ambos tags ocupen el espacio horizontal */
}

.profile-actions {
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
}

.accept-btn,
.reject-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.accept-btn {
  color: #4caf50;
}

.reject-btn {
  color: #f44336;
}
</style>
