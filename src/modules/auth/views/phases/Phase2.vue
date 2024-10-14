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
        <div class="tags-container">
          <div v-for="(row, rowIndex) in fortalezasRows" :key="rowIndex" class="tag-row">
            <div
              v-for="fortaleza in row"
              :key="fortaleza"
              class="tag"
              :class="{ selected: isSelected(fortaleza) }"
              @click="toggleTag(fortaleza)"
            >
              {{ fortaleza }}
            </div>
          </div>
        </div>
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
    const tagsSeleccionados = ref([]);

    const handleSubmit = () => {
      updateUser({ ...user.value, fortalezas: tagsSeleccionados.value });
      emit('setOption', { option: 'Phase3' });
    };

    onMounted(() => {
      user.value = { ...user.value, ...userInfo.value };
    });

    const fortalezas = [
      'Responsabilidad', 'Empatía', 'Adaptabilidad', 'Honestidad',
      'Paciencia', 'Creatividad', 'Autodisciplina', 'Generosidad'
    ];

    const fortalezasRows = computed(() => {
      const rows = [];
      for (let i = 0; i < fortalezas.length; i += 4) {
        rows.push(fortalezas.slice(i, i + 4));
      }
      return rows;
    });

    const toggleTag = (fortaleza) => {
      const index = tagsSeleccionados.value.indexOf(fortaleza);
      if (index === -1) {
        tagsSeleccionados.value.push(fortaleza);
      } else {
        tagsSeleccionados.value.splice(index, 1);
      }
    };

    const isSelected = (fortaleza) => {
      return tagsSeleccionados.value.includes(fortaleza);
    };

    return {
      user,
      handleSubmit,
      fortalezasRows,
      toggleTag,
      isSelected
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

.tags-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tag-row {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 15px;
}

.tag {
  width: 23%; /* Ancho fijo para que todos los tags tengan el mismo tamaño */
  display: block;
  color: black;
  background-color: #F0F0FF;
  border-radius: 20px;
  padding: 12px 20px;
  font-size: 16px;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.tag.selected {
  background-color: #6F41E2; /* Cambiar color si está seleccionada */
  color: white;
}

.tag:hover {
  background-color: #5334B7;
  color: white;
}
</style>
