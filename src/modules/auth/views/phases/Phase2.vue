<template>
  <div class="phase2-container">
    <h2 class="centered-title">Editar Perfil</h2>
    <div class="profile-header">
      <img src="@/assets/logos/logo.png" alt="Profile Logo" class="profile-logo" />
      <div class="profile-info">
        <p><strong>{{ user.names }} {{ user.lastnames }}</strong></p>
        <p>{{ userAge }}</p>
        <p>{{ user.degree?.name }}</p>
        <p>{{ user.university?.name }}</p>
      </div>
    </div>
    <div class="profile-description">
      <label for="description">Mi Descripción</label>
      <textarea id="description" v-model="user.description"></textarea>
    </div>
    <div class="budget-container">
      <div class="budget-input">
        <label for="min-budget">Presupuesto Mínimo</label>
        <input type="number" id="min-budget" v-model.number="user.min_budget" step="0.1" @change="formatBudget('min_budget')" placeholder="Min" />
      </div>
      <div class="budget-input">
        <label for="max-budget">Presupuesto Máximo</label>
        <input type="number" id="max-budget" v-model.number="user.max_budget" step="0.1" @change="formatBudget('max_budget')" placeholder="Max" />
      </div>
    </div>
    <div class="button-container">
      <button @click="handleSubmit">Continuar</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed, getCurrentInstance } from 'vue';
import usePhase from '../../composables/usePhase';

export default {
  name: 'Phase2',
  setup() {
    const { user: userInfo, updateUser } = usePhase();
    const user = ref({
      min_budget: 0.0,
      max_budget: 0.0
    });

    const { ctx } = getCurrentInstance();

    const handleSubmit = () => {
      updateUser(user.value);
      ctx.$emit('goToNextPhase');
    };

    onMounted(() => {
      user.value = { ...user.value, ...userInfo.value };
    });

    const formatBudget = (key) => {
      if (user.value[key] !== null && user.value[key] !== undefined) {
        user.value[key] = parseFloat(user.value[key]).toFixed(1);
      }
    };

    const userAge = computed(() => {
      if (!user.value.birth_date) return '';
      const birthDate = new Date(user.value.birth_date);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    });

    return {
      user,
      handleSubmit,
      userAge,
      formatBudget
    };
  }
};
</script>

<style scoped>
.phase2-container {
  background: url('@/assets/backgrounds/global-background.png') no-repeat center center;
  background-size: cover;  
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(100vw - 400px);
  padding: 20px;
  border-radius: 15px;
  box-sizing: border-box;
}


.centered-title {
  color: #7e57c2;
  text-align: center;
  width: 100%;
  margin-top: 60px;
  margin-bottom: 40px;
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}

.profile-logo {
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
  border-radius: 50%;
  border: 2px solid #ccc;
}

.profile-info p {
  margin: 0;
  color: #333;
  font-size: 18px; 
  text-align: center; 
}

.profile-description {
  width: 100%;
  margin-bottom: 10px;
}

.profile-description label {
  display: block;
  margin-bottom: 10px;
  color: #333;
  font-weight: bold;
}

.profile-description textarea {
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 10px;
  box-sizing: border-box;
  resize: none;
}

.budget-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
}

.budget-input {
  display: flex;
  flex-direction: column;
  width: 48%;
}

.budget-input label {
  margin-bottom: 5px;
  color: #333;
  font-weight: bold;
}

.budget-input input {
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

button {
  background-color: #7e57c2;
  color: #fff;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  text-decoration: underline;
  width: 100px;
}

button:hover {
  background-color: #5e35b1;
}
</style>