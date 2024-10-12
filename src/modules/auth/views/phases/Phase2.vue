<template>
  <div class="profile-container">
    <div class="form-section">
      <h1 class="profile-title">Edición de perfil</h1>
      <div class="input-group">
        <label for="description">Descripción</label>
        <textarea id="description" v-model="user.description" placeholder="Escriba su descripción"></textarea>
      </div>

      <div class="fortalezas-section">
        <label for="description">Fortalezas</label>
        <!-- code here -->
      </div>

      <div class="button-container">
        <button class="continue-button" @click="handleSubmit">Continuar</button>
      </div>
    </div>
  </div>
</template>


<script>
import { ref, onMounted, computed } from 'vue';
import usePhase from '../../composables/usePhase';

export default {
  name: 'Phase2',
  setup(props, { emit }) {
    const { user: userInfo, updateUser } = usePhase();
    const user = ref({});

    const handleSubmit = () => {
      updateUser(user.value);
      emit('setOption', { option: 'Phase3' });
    };

    onMounted(() => {
      user.value = { ...user.value, ...userInfo.value };
    });

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
      userAge    
    };
  }
};
</script>

<style scoped>
.profile-container {
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: space-between;
  background-color: white;
}

.form-section {
  width: 100%;
  height: 90%;
  padding: 40px;
}

.profile-title {
  color: #6441A4;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 20px;
}

input, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

input::placeholder, textarea::placeholder {
  color: #999;
}

textarea {
  resize: none;
  height: 100px;
}

.budget-section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.budget-input {
  width: 48%;
}

.budget-input label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.button-container {
  display: flex;
  justify-content: flex-end;
}

.continue-button {
  background-color: #6F41E2;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.continue-button:hover {
  background-color: #5334B7;
}

.back-button button {
  background: none;
  border: none;
  cursor: pointer;
}

.back-button img {
  width: 24px;
  height: 24px;
}
</style>
