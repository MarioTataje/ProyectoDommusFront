<template>
  <header class="header-container">
    <img
      src="@/assets/logos/logo.png"
      @click="goHome"
      alt="Dommus Logo"
      class="logo"
    />
    <div class="spacer"></div>
    <button @click="goPlans" class="dommus-pro-button">DOMMUS PRO</button>

    <button v-if="isPro" class="dommus-pro-button">COMUNIDAD</button>

    <!-- Filter Pro Icon -->
    <img
      v-if="isPro"
      src="@/assets/icons/filter-pro-icon.png"
      alt="Filtros Pro"
      class="filter-pro-icon"
      @click="toggleFilterPro"
    />

    <!-- Dropdown menu for Filter Pro (only appears when showFilterPro is true) -->
    <div v-if="showFilterPro" class="filter-pro-dropdown">
      <h3>Filtros</h3>

      <!-- Gender Filter -->
      <div class="filter-item">
        <span>Género</span>
        <div class="filter-options">
          <button
            class="filter-option"
            :class="{ selected: selectedGender === 'F' }"
            @click="selectGender('F')"
          >
            Fem
          </button>
          <button
            class="filter-option"
            :class="{ selected: selectedGender === 'M' }"
            @click="selectGender('M')"
          >
            Masc
          </button>
          <button
            class="filter-option"
            :class="{ selected: selectedGender === 'A' }"
            @click="selectGender('A')"
          >
            Ambos
          </button>
        </div>
      </div>

      <!-- Age Filter -->
      <div class="filter-item">
        <span>Edad</span>
        <div class="slider-wrapper">
          <vue-slider
            v-model="ageRange"
            min=16
            max=45
            style="width: 300px;"
          ></vue-slider>
        </div>
      </div>

      <!-- University Filter -->
      <div class="filter-item">
        <span>Universidad</span>
        <div class="filter-options">
          <select v-model="selectedUniversity" class="university-dropdown">
            <option
              v-for="university in universities"
              :key="university.id"
              :value="university.id"
            >
              {{ university.name }}
            </option>
          </select>
        </div>
      </div>
      <button @click="applyFilters" class="filter-button">
        Filtrar
      </button>
    </div>

    <!-- Notification Icon -->  
    <div class="notification-wrapper">
      <img
        src="@/assets/icons/notification-icon.png"
        alt="Notificaciones"
        class="notification-icon"
        @click="toggleNotifications"
      />

      <!-- Dropdown menu for notifications -->
      <div v-if="showNotifications" class="notification-dropdown">
        <h3>Notificaciones</h3>
        <div v-for="(notification, index) in notifications.slice(0, 4)" :key="index" class="notification-item">
          <span>
            {{ notification.sender.names }}
            {{ notification.sender.lastnames }} quiere contactarte!
          </span>
        </div>
      </div>
    </div>

    <div class="profile-wrapper">
      <img
        :src="profileImage"
        @click="toggleProfileMenu"
        alt="Perfil"
        class="profile-picture"
      />

      <!-- Dropdown menu for profile -->
      <div v-if="showProfileMenu" class="profile-dropdown">
        <button @click="goProfile" class="profile-dropdown-item">Mi Perfil</button>
        <button class="profile-dropdown-item">
          <router-link to="/" class="link-title">
            Cerrar Sesión
          </router-link>
        </button>
      </div>
    </div>

  </header>
</template>

<script>
import { onMounted, computed, ref } from "vue";
import VueSlider from "vue-slider-component"; 
import 'vue-slider-component/theme/default.css'

import useProfile from "../../composables/useProfile";
import useMatch from "../../composables/useMatch";
import useStudies from "../../../auth/composables/useStudies";
import usePhase from "@/modules/auth/composables/usePhase";

export default {
  name: "Header",
  components: {
    VueSlider,
  },
  setup(props, { emit }) {
    const { userId } = usePhase();
    const { profile, getUserProfile, getProfiles } = useProfile();
    const { receivedLikes: notifications, getReceivedLikes } = useMatch();
    const { universities, getUniversities } = useStudies();

    onMounted(async () => {
      const id = userId.value;
      await getUserProfile(id);
      getReceivedLikes(id);
      getUniversities();
    });

    const profileImage = computed(() => {
      return profile.value?.genre === "M"
        ? require("@/assets/profiles/men-profile.png")
        : require("@/assets/profiles/women-profile.png");
    });

    const isPro = computed(() => {
      return profile.value?.plan.plan_name === "Pro";
    });

    const showNotifications = ref(false);
    const toggleNotifications = () => {
      showNotifications.value = !showNotifications.value;
    };

    const selectedGender = ref(null);
    const selectGender = (gender) => {
      selectedGender.value = gender;
    };

    const selectedUniversity = ref(null);
    const ageRange = ref([20, 30]);

    const showFilterPro = ref(false);
    const toggleFilterPro = () => {
      showFilterPro.value = !showFilterPro.value;
    };

    const showProfileMenu = ref(false);
    const toggleProfileMenu = () => {
      showProfileMenu.value = !showProfileMenu.value;
    };

    const goHome = () => {
      emit("setOption", { option: "Home" });
    };

    const goPlans = () => {
      emit("setOption", { option: "Plans" });
    };

    const goProfile = () => {
      emit("setOption", { option: "Profile" });
    };

    const applyFilters = () => {
      const bothGender = selectedGender.value === 'A';
      const filters = {
        sex: bothGender ? undefined : selectedGender.value,
        age_min: ageRange.value[0],
        age_max: ageRange.value[1],
        university_id: selectedUniversity.value
      }
      getProfiles(userId.value, filters)
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
      toggleFilterPro,

      showProfileMenu,
      toggleProfileMenu,

      selectedGender,
      selectGender,
      universities,
      selectedUniversity,
      ageRange,
      applyFilters
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
  border-radius: 12px;
  padding: 20px;
  z-index: 1001;
}

.filter-item {
  margin-bottom: 20px;
}

.filter-options {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.filter-option {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 20px;
  background-color: #f5f5f5;
  cursor: pointer;
}

.filter-option:hover {
  background-color: #e0e0e0;
}

.filter-option.selected {
  background-color: #7e57c2;
  color: white;
  border: none;
}

.university-dropdown {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 20px;
  background-color: #f5f5f5;
  cursor: pointer;
  width: 100%;
  font-size: 14px;
}

.university-dropdown:hover {
  background-color: #e0e0e0;
}

.university-dropdown:focus {
  outline: none;
  border-color: #7e57c2;
}
.slider-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  flex-wrap: nowrap; /* Asegura que los elementos no se bajen a una nueva fila */
}

.filter-button {
  background-color: #7e57c2;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
  width: 100%;
}

.filter-button:hover {
  background-color: #5e3c8e;
}

.profile-wrapper {
  position: relative;
}

.profile-picture {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
}

.profile-dropdown {
  position: absolute;
  top: 50px;
  right: 0;
  width: 150px;
  background-color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 10px;
  z-index: 1001;
  display: flex;
  flex-direction: column;
}

.profile-dropdown-item {
  padding: 10px 0;
  border: none;
  background: none;
  cursor: pointer;
  text-align: left;
  font-size: 14px;
}

.profile-dropdown-item:hover {
  background-color: #f0f0f0;
}

.link-title {
  text-decoration: none;
  color: inherit;
}

.link-title:hover {
  text-decoration: none; 
}
</style>
