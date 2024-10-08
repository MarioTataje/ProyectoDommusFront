<template>
  <header class="header-container">
    <img src="@/assets/logos/logo.png" alt="Dommus Logo" class="logo" />
    <div class="spacer"></div>
    <button @click="goPlans" class="dommus-pro-button">DOMMUS PRO</button>
    <img src="@/assets/icons/notification-icon.png" alt="Notificaciones" class="notification-icon" />
    <img :src="profileImage" @click="goProfile" alt="Perfil" class="profile-picture" />
  </header>
</template>

<script>
import { onMounted, computed } from 'vue';
import useProfile from '../../composables/useProfile';
import usePhase from '@/modules/auth/composables/usePhase';

export default {
  name: 'Header',
  setup(props, { emit }) {
    const { userId } = usePhase();
    const { profile, getUserProfile } = useProfile();

    onMounted(async () => {
      const id = userId.value;
      await getUserProfile(id);
    });

    const profileImage = computed(() => {
      return profile.value?.genre === 'M'
        ? require('@/assets/profiles/men-profile.png')
        : require('@/assets/profiles/women-profile.png');
    });

    const goPlans = () => {
      emit('setOption', { option: 'Plans' });
    };

    const goProfile = () => {
      emit('setOption', { option: 'Profile' });
    };

    return {
      profileImage,
      goPlans,
      goProfile
    };
  },
};
</script>

<style scoped>
.header-container {
  width: 100%;
  background-color: white;
  padding: 10px 20px;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  z-index: 1000;
}

.logo {
  height: 40px;
  margin-left: 20px;
}

.spacer {
  flex-grow: 1;
}

.dommus-pro-button {
  background-color: #7e57c2;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-weight: bold;
  cursor: pointer;
  margin-right: 20px;
}

.dommus-pro-button:hover {
  background-color: #5e3c8e;
}

.notification-icon {
  height: 24px;
  margin-right: 20px;
  cursor: pointer;
}

.profile-picture {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
}
</style>
