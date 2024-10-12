<template>
  <div class="modal" v-if="isOpen" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div v-if="profile" class="profile-container">
        <div :class="['profile-content', getCardColor(profile)]">
          <div class="profile-header">
            <img :src="profileImage" alt="Profile Image" class="profile-img" />
            <div class="profile-details">
              <h2 class="profile-name">{{ profile.names + " " + profile.lastnames }}</h2>
              <span class="profile-location">{{ profile.district_name }}</span>
            </div>
          </div>

          <div class="profile-description">
            <p>{{ profile.description }}</p>
          </div>

          <div class="profile-tags">
            <span class="profile-tag">{{ profile.degree_name }}</span>
            <span class="profile-tag">{{ profile.personality.tag }}</span>
            <span class="profile-tag">{{ profile.budget_min }} - {{ profile.budget_max }} S/.</span>
            <span class="profile-tag">{{ profile.university_name }}</span>
          </div>

          <div class="profile-habits">
            <div v-for="(habit, index) in habitsArray" :key="habit" 
              :class="['habit-item', { 'habit-left': index % 2 === 0, 'habit-right': index % 2 !== 0 }]">
              "{{ habit }}"
            </div>
          </div>
        </div>

        <div class="action-buttons">
          <button @click="rejectProfile(profile.id)" class="reject-btn">
            <img src="@/assets/icons/reject-icon.png" alt="Dislike" class="button-icon" />
          </button>
          <button @click="acceptProfile(profile.id)" class="like-btn">
            <img src="@/assets/icons/match-icon.png" alt="Like" class="button-icon" />
          </button>
        </div>
      </div>
      <div v-else class="loading-message">Cargando perfil...</div>
    </div>
  </div>
</template>

<script>
  import { ref, computed, onMounted, getCurrentInstance } from 'vue';
  import usePhase from '@/modules/auth/composables/usePhase';
  import useProfile from '../../composables/useProfile';
  import useMatch from '../../composables/useMatch';

  export default {
    props: {
      profileId: {
        type: Number,
        required: true
      }
    },
    setup(props) {
      const { ctx } = getCurrentInstance();
      const { profile, getUserProfile, getProfiles } = useProfile();
      const { sendLike, sendDislike } = useMatch();
      const { userId } = usePhase();
      const isOpen = ref(false);
  
      const openModal = () => {
        isOpen.value = true;
      };
  
      const closeModal = () => {
        isOpen.value = false;
        ctx._.emit('close');
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
          ? require('@/assets/profiles/men-profile.png')
          : require('@/assets/profiles/women-profile.png');
      });

      const getCardColor = (profile) => {
        const compatibility = profile;
        if (compatibility >= 80) return 'card-green';
        if (compatibility >= 40) return 'card-blue';
        return 'card-red';
      };

      const acceptProfile = async (receiverId) => {
        const senderId = userId.value;
        const like = await sendLike(senderId, receiverId);
        if (like.flag_match){
          const id = like.sender.id !== senderId ? like.sender.id : like.receiver.id;
          console.log(id);
          // otherId.value = id;
          // showModal.value = true;
        }
        await getProfiles(senderId);
        closeModal();
      };

      const rejectProfile = async (receiverId) => {
        const senderId = userId.value;
        await sendDislike(senderId, receiverId);
        await getProfiles(senderId);
        closeModal();
      };
  
      return {
        isOpen,
        openModal,
        closeModal,

        profile,
        habitsArray,
        profileImage,
        getCardColor,
        acceptProfile,
        rejectProfile
      };
    }
  };
</script>

<style scoped>
/* Modal Styles */
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
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  max-width: 900px;
  max-height: 80%;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.loading-message {
  font-size: 1.2em;
  color: #777;
  text-align: center;
  margin-top: 20px;
}

/* Profile Styles */
.profile-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 15px;
  position: relative;
}

.profile-content.card-red {
  border: 3px solid #f44336;
}

.profile-content.card-blue {
  border: 3px solid #2196f3;
}

.profile-content.card-green {
  border: 3px solid #4caf50;
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 20px 10px 20px; 
}

.profile-img {
  border-radius: 50%;
  width: 120px;
  height: 120px;
  position: absolute;
  top: -60px;
  left: -30px; 
  border: 3px solid white; 
}

.profile-name {
  font-size: 1.8em;
  margin: 0;
}

.profile-location {
  color: #888;
  font-size: 1.2em;
}

/* Profile Info Tags */
.profile-tags {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.profile-tag {
  background-color: #F0F0FF;
  border-radius: 12px;
  padding: 5px 10px;
  font-size: 0.9em;
}

/* Profile Description */
.profile-description {
  background-color: white;
  padding: 10px;
  text-align: justify; 
}

/* Profile Habits */
.profile-habits {
  display: flex;
  flex-wrap: wrap; /* Stack habits vertically */
  padding: 10px;
  margin-top: 5px;
}

.habit-item {
  border-radius: 8px;
  padding: 8px 15px; /* Adjust padding for better appearance */
  font-size: 0.9em;
  margin: 0 10px; /* Margin for spacing between items */
  flex: 1 1 45%;
}

.habit-left {
  align-self: flex-start; 
}

.habit-right {
  align-self: flex-end;
}

/* Action Buttons */
.action-buttons {
  margin-top: 20px;
}

.reject-btn, .like-btn {
  background-color: transparent; 
  border: none;
  cursor: pointer;
  padding: 0;
}

.button-icon {
  width: 40px; 
  height: 40px;
}
</style>