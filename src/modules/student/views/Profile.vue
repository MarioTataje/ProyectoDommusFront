<template>
  <div class="profile-content">
    <div class="profile-header">
      <div class="profile-img-wrapper">
        <img :src="profileImage" alt="Profile Image" class="profile-img" />
      </div>
      <div class="profile-info">
        <p class="profile-name">{{ profile.names }}</p>
        <p class="profile-email">{{ profile.email }}</p>
      </div>
    </div>

    <div class="profile-tabs">
      <div class="tab" :class="{ active: activeTab === 'configuracion' }" 
        @click="activeTab = 'configuracion'">
        Configuración
      </div>
      <div class="tab" :class="{ active: activeTab === 'datos' }"
        @click="activeTab = 'datos'">
        Mis Datos
      </div>
      <div class="tab" :class="{ active: activeTab === 'vivienda' }"
        @click="activeTab = 'vivienda'">
        Vivienda
      </div>
      <div class="tab" :class="{ active: activeTab === 'habitos' }"
        @click="activeTab = 'habitos'">
        Hábitos
      </div>
    </div>

    <div v-if="activeTab === 'configuracion'" class="profile-configuracion">
      <div class="form-group">
        <label for="plan">Plan:</label>
        <input id="plan" type="text" class="input-configuration"
          v-model="profile.plan.plan_name" placeholder="Plan" disabled/>
      </div>

      <div class="form-group">
        <label for="frequency">Frecuencia:</label>
        <input id="frequency" type="text" class="input-configuration"
          v-model="profilePlan" placeholder="Frecuencia" disabled/>
      </div>

      <div class="form-group">
        <label for="amount">Monto:</label>
        <input id="amount" type="number" class="input-configuration"
          v-model="profile.plan.amount" placeholder="Monto" disabled/>
      </div>
    </div>

    <div v-if="activeTab === 'datos'" class="profile-datos">
      <div class="form-row">
        <div class="form-group">
          <label for="name">Nombre:</label>
          <input id="name" type="text" class="input-datos"
            v-model="fullName" placeholder="Nombre Completo" disabled/>
        </div>

        <div class="form-group">
          <label for="description">Descripcion:</label>
          <input id="description" type="text" class="input-datos"
            v-model="profile.description" placeholder="Descripcion" disabled/>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="birthDate">Fecha de Nacimiento:</label>
          <input id="birthDate" type="text" class="input-datos"
            v-model="birthDate" placeholder="Fecha de Nacimiento" disabled/>
          </div>

        <div class="form-group">
          <label for="degree">Carrera:</label>
          <input id="degree" type="text" class="input-datos"
            v-model="fullDegree" placeholder="Carrera" disabled/>
        </div>
      </div>
    </div>

    <div v-if="activeTab === 'vivienda'" class="profile-vivienda">
      <div class="form-group">
        <label for="district">Distrito:</label>
        <input id="district" type="text" class="input-vivienda"
          v-model="profile.district_name" placeholder="Distrito" disabled/>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="budget_min">Presupuesto Minimo:</label>
          <input id="budget_min" type="text" class="input-datos"
            v-model="profile.budget_min" placeholder="Presupuesto Minimo" disabled/>
        </div>

        <div class="form-group">
          <label for="budget_max">Presupuesto Maximo:</label>
          <input id="budget_max" type="text" class="input-datos"
            v-model="profile.budget_max" placeholder="Presupuesto Maximo" disabled/>
        </div>
      </div>
    </div>

    <div v-if="activeTab === 'habitos'" class="profile-habitos">
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
</template>

<script>
  import { onMounted, ref, computed } from "vue";
  import useProfile from "../composables/useProfile";
  import usePhase from "@/modules/auth/composables/usePhase";

  export default {
    name: "Profile",
    setup() {
      const { userId } = usePhase();
      const { profile, getUserProfile } = useProfile();

      onMounted(async () => {
        const id = userId.value;
        await getUserProfile(id);
      });

      const habitsArray = computed(() => {
        return profile.value?.habits
          ? profile.value.habits.split(",").map((habit) => habit.trim())
          : [];
      });

      const activeTab = ref("configuracion");

      const profileImage = computed(() => {
        return profile.value?.genre === "M"
          ? require("@/assets/profiles/men-profile.png")
          : require("@/assets/profiles/women-profile.png");
      });

      const profilePlan = computed(() => {
        const { plan_name, frequency } = profile.value?.plan;
        const planMapping = {
          'Free': 'Libre',
          'Pro': {
            'M': 'Mensual',
            'T': 'Trimestral'
          }
        };
        return planMapping[plan_name]?.[frequency] ?? 3;
      });

      const fullName = computed(() => {
        const { names = '', lastnames = '' } = profile.value || {};
        return `${names} ${lastnames}`;
      });

      const birthDate = computed(() => {
        const { birth_date } = profile.value || {};

        if (!birth_date) return '';

        const date = new Date(birth_date);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Los meses en JS son 0-indexed
        const year = date.getUTCFullYear();

        return `${day}-${month}-${year}`;
      });

      const fullDegree = computed(() => {
        const { university_name = '', degree_name = '' } = profile.value || {};
        return `${degree_name} - ${university_name}`;
      });

      return {
        profile,
        habitsArray,
        profileImage,
        profilePlan,
        fullName,
        birthDate,
        fullDegree,
        activeTab,
      };
    },
  };
</script>

<style scoped>

  .profile-content {
    width: 80%;
    padding: 10px;
    background-color: #fff;
    margin-top: -100px;
  }

  .profile-header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 80px;
  }

  .profile-img-wrapper {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;
  }

  .profile-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .profile-info {
    margin-left: 20px;
  }

  .profile-name {
    font-size: 2em;
    color: #6441A4;
  }

  .profile-email {
    color: #888;
  }

  .profile-tabs {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;
    position: relative; /* Para posicionar el pseudo-elemento */
  }

  .tab {
    flex: 1;
    padding: 10px;
    cursor: pointer;
    text-align: center;
    background-color: #ffffff;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    color: #4f4f4f;
    transition: background-color 0.3s, color 0.3s;
    position: relative;
    z-index: 1;
  }

  .tab.active {
    background-color: #e3daf9;
    color: #6441A4;
  }

  .tab:hover {
    background-color: #e9e3fa;
    color: white;
  }

  .tab:first-child {
    border-top-left-radius: 30px;
    border-bottom-left-radius: 0;
  }

  .tab:last-child {
    border-top-right-radius: 30px;
    border-bottom-right-radius: 0;
  }

  .tab:not(:first-child) {
    margin-left: -1px;
  }

  .profile-configuracion {
    display: flex;
    flex-direction: column;
  }

  .profile-datos {
    display: flex;
    flex-direction: column;
  }

  .profile-vivienda {
    display: flex;
    flex-direction: column;
  }

  .profile-habitos {
    display: flex;
    flex-direction: column;
  }

  .form-row {
    display: flex;
    justify-content: space-between;
    gap: 5px;
    margin-bottom: 20px;
  }

  .form-group {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .input-configuration {
    padding: 10px 5px;
    margin-top: 5px;
    margin-bottom: 10px;
    border: none;
    border-bottom: 2px solid #ccc;
    background-color: transparent;
    width: 100%;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s;
    border-radius: 0;
  }

  .input-datos {
    padding: 10px 5px;
    margin-top: 5px;
    margin-bottom: 10px;
    border: none;
    border-bottom: 2px solid #ccc;
    background-color: transparent;
    width: 90%;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s;
    border-radius: 0;
  }

  .input-vivienda {
    padding: 10px 5px;
    margin-top: 5px;
    margin-bottom: 10px;
    border: none;
    border-bottom: 2px solid #ccc;
    background-color: transparent;
    width: 100%;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s;
    border-radius: 0;
  }

  .habits-section {
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .habits-heading {
    margin-bottom: 10px;
  }

  .habits-text {
    font-size: 1.5em;
    margin-bottom: 10px;
  }

  ul {
    list-style-type: disc;
    padding-left: 20px;
  }

  li {
    font-size: 1.1em;
    color: #4f4f4f;
    margin-bottom: 5px;
  }

  input:focus {
    border-bottom-color: #6441A4;
  } 
</style>
