<template>
  <div class="home-container">
    <OtherProfile :profileId="profileId" :compatibility="compatibility" v-if="showProfile" @close="closeProfile"></OtherProfile>
    <Match :otherId="otherId" v-if="showMatch" @close="closeMatch"></Match>

    <!-- Mensaje de carga si no hay perfiles -->
    <div v-if="profiles.length === 0" class="loading-container">
      <img src="@/assets/logos/loading-robot.png" alt="Cargando..." class="loading-img"/>
      <p class="loading-text">Estamos trabajando para encontrar a tu compañero ideal</p>
    </div>

    <div class="profiles" v-else>
      <!-- Texto explicativo sobre los perfiles -->
      <div class="profiles-info">
        <p class="info-title">2000 Roomies Registrados</p>
        <p class="info-sub-title">Los roomies están clasificados en 3 categorías según su compatibilidad</p>
      </div>

      <div class="profiles-scroll-container">
      <div class="profiles-scroll">
        <div v-for="profile in profiles" :key="profile.id"
             :class="['profile-card', getCardColor(profile)]" @click="openProfile(profile.id, profile.compatibility)">
          <img 
            :src="profile.genre === 'M' ? require('@/assets/profiles/men-profile.png') : require('@/assets/profiles/women-profile.png')"
            alt="User Image" class="profile-img"/>
          <div class="compatibility-circle">
            <span>{{ profile.compatibility }}%</span>
          </div>
          <div class="profile-info">
            <h2>{{ profile.names + ' ' + profile.lastnames }}</h2>
            <div class="tags-container">
              <p class="profile-tag1">{{ profile.personality.tag }}</p>
              <p class="profile-tag2">{{ profile.district_name }}</p>
            </div>
            <p class="profile-tag3">{{ profile.degree_name }}</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import OtherProfile from './modals/OtherProfile.vue'; 
import Match from './modals/Match.vue'; 

import useProfile from '../composables/useProfile';
import usePhase from '@/modules/auth/composables/usePhase';

export default {
  name: 'Home',
  components: { 
    OtherProfile,
    Match
  },
  props: {
    notificationProfileId: {
      type: Number,
      required: false,
    },
  },
  setup(props) {
    const { profiles, getProfiles } = useProfile();
    const { userId } = usePhase();
    const profileId = ref(null);
    const compatibility = ref(null);

    const showProfile = ref(false);
    const showMatch = ref(false);
    const otherId = ref(null);

    onMounted(() => {
      getProfiles(userId.value, {});
    });

    watch(() => props.notificationProfileId, (newProfileId) => {
      if (newProfileId) {
        showProfile.value = true;
        profileId.value = newProfileId;
      }
    });

    const openProfile = (id, profileCompatibility) => {
      profileId.value = id;
      compatibility.value = profileCompatibility;
      showProfile.value = true;
    };

    const closeProfile = (isMatch) => {
      console.log(isMatch);
      showProfile.value = false;
      if (isMatch) {
        otherId.value = profileId.value;
        showMatch.value = true;
      }
    };

    const getCardColor = (profile) => {
      const { compatibility } = profile;
      if (compatibility >= 80) return 'card-green';
      if (compatibility >= 40) return 'card-blue';
      return 'card-red';
    };

    const closeMatch = () => {
      showMatch.value = false;
    };

    return {
      openProfile,
      closeProfile,
      showMatch,
      closeMatch,

      showProfile,
      getCardColor,
      otherId,

      profiles,
      profileId,
      compatibility
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
  position: absolute;
  top: 100px;
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

.info-title {
  font-size: 1.6em;
  color: #1E1E1E;
  font-weight: bold;
}

.info-sub-title {
  font-size: 1.2em;
  color: #6441A4;
}

.loading-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 50px;
}

.loading-img {
  width: 250px;
  height: 150px;
}

.loading-text {
  font-size: 1.2em;
  color: #6441A4;
  text-align: center;
}

.profiles-scroll-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 50px;
  overflow-x: hidden; /* Esconde los perfiles fuera del contenedor */
}

.profiles-scroll {
  display: flex;
  gap: 20px;
  overflow-x: scroll;
  overflow-y:auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  height: 100%;
  max-width: 1080px;
}

.profile-card {
  position: relative;
  background-color: white;
  padding: 20px;
  border-radius: 15px;
  width: 250px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  flex-shrink: 0; /* No permitir que los perfiles se encojan */
  scroll-snap-align: start; /* Alinea cada perfil en el inicio del contenedor */
  overflow: visible; 
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
  top: -3px;
  right: -10px;
  background-color: white;
  border-radius: 60%;
  border: 3px solid #ccc;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
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
  justify-content: space-between;
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
  width: 48%;
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
