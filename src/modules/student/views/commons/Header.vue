<template>
  <header class="header-container">
    <img src="@/assets/logos/logo.png" @click="goHome" alt="Dommus Logo" class="logo" />
    <div class="spacer"></div>
    <button @click="goPlans" class="dommus-pro-button">DOMMUS PRO</button>

    <button v-if="isPro" class="dommus-pro-button">COMUNIDAD</button>

    <!-- Filter Pro Icon -->
    <img v-if="isPro" src="@/assets/icons/filter-pro-icon.png" alt="Filtros Pro" class="filter-pro-icon" @click="toggleFilterPro" />

    <!-- Dropdown menu for Filter Pro -->
    <div v-if="showFilterPro" class="filter-pro-dropdown">
      <h3>Filtros</h3>
      <div class="filter-item">
        <span>Género</span>
        <div class="filter-options">
          <span>Fem</span>
          <span>Masc</span>
          <span>Ambos</span>
        </div>
      </div>
  
      <div class="filter-item">
        <span>Edad</span>
        <div class="filter-options">
          <span>17</span>
          <span>27</span>
        </div>
      </div>

      <div class="filter-item">
        <span>Universidad</span>
        <div class="filter-options">
          <!-- Add university filter options here -->
        </div>
      </div>
    </div>

    <!-- Notification Icon -->
    <div class="notification-wrapper">
      <img src="@/assets/icons/notification-icon.png" alt="Notificaciones" class="notification-icon" @click="toggleNotifications" />
      
      <!-- Dropdown menu for notifications -->
      <div v-if="showNotifications" class="notification-dropdown">
        <h3>Notificaciones</h3>
        <div v-for="(notification, index) in notifications.slice(0, 4)" :key="index" class="notification-item">
          <span>{{ notification.sender.names }} {{ notification.sender.lastnames}} quiere contactarte!</span>
        </div>
      </div>
    </div>

    <img :src="profileImage" @click="goProfile" alt="Perfil" class="profile-picture" />
  </header>
</template>

<script>
import { onMounted, computed, ref } from 'vue';
import useProfile from '../../composables/useProfile';
import useMatch from '../../composables/useMatch';
import usePhase from '@/modules/auth/composables/usePhase';

export default {
  name: 'Header',
  setup(props, { emit }) {
    const { userId } = usePhase();
    const { profile, getUserProfile } = useProfile();
    const { receivedLikes: notifications, getReceivedLikes } = useMatch();

    onMounted(async () => {
      const id = userId.value;
      await getUserProfile(id);
      getReceivedLikes(id);
    });

    const profileImage = computed(() => {
      return profile.value?.genre === 'M'
        ? require('@/assets/profiles/men-profile.png')
        : require('@/assets/profiles/women-profile.png');
    });

    const isPro = computed(() => {
      return profile.value?.plan.plan_name === 'Pro';
    });

    const showNotifications = ref(false);
    const toggleNotifications = () => {
      showNotifications.value = !showNotifications.value;
    };

    const showFilterPro = ref(false);
    const toggleFilterPro = () => {
      showFilterPro.value = !showFilterPro.value;
    };

    const goHome = () => {
      emit('setOption', { option: 'Home' });
    };

    const goPlans = () => {
      emit('setOption', { option: 'Plans' });
    };

    const goProfile = () => {
      emit('setOption', { option: 'Profile' });
    };

    return {
      profileImage,
      notifications,
      isPro,

      goHome,
      goPlans,
      goProfile,

      showNotifications,
      toggleNotifications,

      showFilterPro,
      toggleFilterPro
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

.filter-pro-icon {
  height: 24px;
  margin-right: 20px;
  cursor: pointer;
}

.notification-wrapper {
  position: relative;
}

.notification-icon {
  height: 24px;
  margin-right: 20px;
  cursor: pointer;
}

.notification-dropdown {
  position: absolute;
  top: 40px;
  right: 0;
  width: 250px;
  background-color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 10px;
  z-index: 1001;
}

.notification-dropdown h3 {
  margin: 0;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
}

.notification-item {
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}

.notification-item:last-child {
  border-bottom: none;
}

.profile-picture {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
}

.filter-pro-dropdown {
  position: absolute;
  top: 40px;
  right: 0;
  width: 250px;
  background-color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 10px;
  z-index: 1001;
}

.filter-pro-dropdown h3 {
  margin: 0;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
}

.filter-item {
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}

.filter-item:last-child {
  border-bottom: none;
}

.filter-options {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
}
</style>
