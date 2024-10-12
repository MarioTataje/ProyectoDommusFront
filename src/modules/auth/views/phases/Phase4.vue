<template>
  <div class="phase4-container">
    <div class="form-section">
      <h2 class="centered-title">Vivienda</h2>
      <div class="centered-content">
        <p>Descripción del lugar donde desea vivir</p>
        <form @submit.prevent="handleSubmit" class="centered-form">
          <div class="form-group">
            <select v-model="selectedDistrict" id="distrito" required>
              <option disabled value="">Distrito</option>
              <option v-for="district in districts" :key="district.id" :value="district">
                {{ district.name }}
              </option>
            </select>
          </div>
          <div class="budget-section-inline">
            <div class="budget-input">
              <label for="min-budget">Presupuesto Mínimo</label>
              <input type="number" id="min-budget" v-model.number="user.min_budget" @change="formatBudget('min_budget')" placeholder="Min" />
            </div>
            <div class="budget-input">
              <label for="max-budget">Presupuesto Máximo</label>
              <input type="number" id="max-budget" v-model.number="user.max_budget" @change="formatBudget('max_budget')" placeholder="Max" />
            </div>
          </div>
          <div class="icon-container">
            <img src="@/assets/logos/ubigeo.png" alt="Mapa" />
          </div>

          <div class="button-container">
            <button type="submit">Continuar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import { ref, onMounted } from 'vue';
import usePhase from '../../composables/usePhase';
import useLocations from '../../composables/useLocations';

export default {
  name: 'Phase4',
  setup(props, { emit }) {
    const { user: userInfo, updateUser } = usePhase();
    const { districts, getDistricts } = useLocations();

    const user = ref({
      min_budget: 0.0,
      max_budget: 0.0
    });

    const selectedDistrict = ref(null);
    
    const handleSubmit = async () => {
      user.value.district = selectedDistrict.value;
      updateUser(user.value);
      emit("setOption", { option: "Phase5" });
    };

    const formatBudget = (key) => {
      if (user.value[key] !== null && user.value[key] !== undefined) {
        user.value[key] = parseFloat(user.value[key]).toFixed(1);
      }
    };

    onMounted(() => {
      user.value = { ...user.value, ...userInfo.value };
      getDistricts(1);
    });

    return {
      selectedDistrict,
      districts,
      handleSubmit,
      formatBudget,
      user
    };
  }
};
</script>

<style scoped>
.phase4-container {
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: space-between;
  background-color: white;
}

.form-section {
  width: 95%;
  padding: 20px;
  overflow-y: auto;
}

.centered-title {
  color: #6441A4;
  text-align: start;
  margin-top: 30px;
  margin-bottom: 30px;
}

.centered-content {
  width: 100%;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group select {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: white;
  font-size: 15px;
  color: #333;
  transition: border-color 0.3s;
  appearance: none;
}

.budget-section-inline {
  display: flex;
  justify-content: space-between; /* Los inputs estarán en línea */
  margin-bottom: 20px;
}

.budget-input {
  width: 48%; /* Cada input ocupará casi la mitad */
}

.budget-input label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.budget-input input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.icon-container {
  margin: 20px 0;
  text-align: center;
}

.icon-container img {
  width: 200px;
  height: 200px;
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

