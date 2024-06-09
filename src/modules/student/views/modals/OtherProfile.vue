<template>
  <div class="modal" v-if="isOpen" @click="closeModal">
    <div class="modal-content" @click.stop>
      <!-- Contenido del perfil -->
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
                <img src="@/assets/logos/habitos.png" alt="Habits" class="habits-img" />
              </div>
              <ul>
                <li v-for="habit in habitsArray" :key="habit">{{ habit }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="loading-message">Cargando perfil...</div>
      <!-- Fin del contenido del perfil -->
      <button class="continue-button" @click="confirmAccept">Continuar</button>
    </div>
  </div>
</template>

<script>
  import { ref, computed, onMounted, getCurrentInstance } from 'vue';
  import useProfile from '../../composables/useProfile';

  export default {
    props: {
      profileId: {
        type: Number,
        required: true
      }
    },
    setup(props) {
      const { ctx } = getCurrentInstance();
      const { profile, getUserProfile } = useProfile();
      const isOpen = ref(false);
  
      const openModal = () => {
        isOpen.value = true;
      };
  
      const closeModal = () => {
        isOpen.value = false;
        ctx.$emit('close');
      };
  
      const confirmAccept = () => {
        closeModal();
      };
  
      onMounted(async () => {
        openModal();
        await getUserProfile(props.profileId);
      });

      const habitsArray = computed(() => {
        return profile.value?.habits ? profile.value.habits.split(',').map(habit => habit.trim()) : [];
      });

      const profileImage = computed(() => {
        return profile.value?.genre === 'M'
          ? require('@/assets/profiles/men_profile.png')
          : require('@/assets/profiles/women_profile.png');
      });
  
      return {
        isOpen,
        profile,
        habitsArray,
        profileImage,
        openModal,
        closeModal,
        confirmAccept
      };
    }
  };
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background: url('@/assets/backgrounds/global-background.png') no-repeat center center;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  max-width: 700px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.loading-message {
  font-size: 1.2em;
  color: #777;
  text-align: center;
  margin-top: 20px;
}

.profile-container {
  background-color: transparent;
  width: 100%;
  padding: 0;
  margin: 10px;
}

.profile-content {
  background-color: transparent; 
  border: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-header {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
}

.profile-img {
  border-radius: 50%;
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin-left: 25px;
}

.profile-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.profile-name {
  font-size: 1.2em;
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
  align-items: center;
  width: 100%;
}

.profile-tag1,
.profile-tag2,
.profile-tag3,
.profile-tag4 {
  color: white;
  border-radius: 12px;
  width: 40%;
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
  width: 90%;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin-bottom: 20px;
  text-align: left;
}

.profile-description p {
  margin: 0;
}

.profile-habits {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
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
  font-size: 20px;
  color: #8C52FF;
  align-items: center;
  margin-bottom: 0;
}

.habits-img {
  width: 100px;
  height: 100px;
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

.continue-button {
  background-color: #8F6EE0;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 0px;
  font-size: 14px;
  padding: 12px 20px;
}
</style>
