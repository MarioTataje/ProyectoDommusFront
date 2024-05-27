<template>
  <div class="phase4-container">
    <h2 class="centered-title">Vivienda</h2>
    <div class="centered-content">
      <form @submit.prevent="submitForm" class="centered-form">
        <div class="form-group">
          <label for="departamento">Departamento</label>
          <select v-model="region" id="departamento" required>
            <option disabled value="">Departamento</option>
            <option v-for="region in regions" :key="region" :value="region">
              {{ region }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="provincia">Provincia</label>
          <select v-model="province" id="provincia" required>
            <option disabled value="">Provincia</option>
            <option v-for="province in provinces" :key="province" :value="province">
              {{ province }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="distrito">Distrito</label>
          <select v-model="district" id="distrito" required>
            <option disabled value="">Distrito</option>
            <option v-for="district in districts" :key="district" :value="district">
              {{ district }}
            </option>
          </select>
        </div>
        <div class="icon-container">
          <img src="@/assets/ubigeo.png" alt="Mapa" />
        </div>
        <div class="button-container">
          <button type="submit" @click="$emit('goToNextPhase')">Continuar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Phase4',
  data() {
    return {
      region: '',
      province: '',
      district: '',
      regions: ['Lima', 'Cuzco', 'Cajamarca'],
      provinces: ['Lima', 'Huaral', 'Huacho'],
      districts: ['San Miguel', 'Pueblo Libre', 'Jesus Maria']
    };
  },
  methods: {
    submitForm() {
      console.log('Region:', this.region);
      console.log('Provincia:', this.provincia);
      console.log('Distrito:', this.distrito);
    }
  }
};
</script>

<style scoped>
.phase4-container {
  background-color: #fff;
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

.centered-content {
  margin: 0 auto;
  width: 100%;
  max-width: 40%;
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

