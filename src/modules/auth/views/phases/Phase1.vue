<template>
  <div class="phase1-container">
    <div class="phase1-header">
      <img src="@/assets/logos/logo.png" alt="Dommus Logo" class="logo" />
    </div>
    <form @submit.prevent="handleSubmit" class="phase1-content">
      <div class="phase1-group">
        <input type="text" placeholder="Nombres *" v-model="user.names" required />
        <input type="text" placeholder="Apellidos *" v-model="user.lastnames" required />
      </div>
      <div class="phase1-group">
        <input type="email" placeholder="Correo Universitario *" v-model="user.email" @input="validateEmail" required />
        <input type="tel" placeholder="Número de Celular *" v-model="user.phone" required />
      </div>
      <p v-if="emailError" class="error">{{ emailError }}</p>
      <div class="phase1-group">
        <input type="password" placeholder="Ingrese su contraseña *" v-model="user.password" required />
        <input type="password" placeholder="Confirme su contraseña *" required />
      </div>
      <div class="phase1-group">
        <select v-model="selectedUniversity" @change="onUniversityChange" required style="height: 52px;">
          <option v-for="university in universities" :key="university.id" :value="university">{{ university.name }}</option>
        </select>
        <select v-model="selectedDegree" required style="height: 52px;">
          <option v-for="degree in degrees" :key="degree.id" :value="degree">{{ degree.name }}</option>
        </select>
      </div>
      <div class="phase1-group">
        <input type="date" placeholder="Fecha de Nacimiento *" v-model="user.birth_date" required />
        <select v-model="user.genre" required style="height: 52px;">
          <option value="">Sexo</option>
          <option v-for="g in genders" :key="g.value" :value="g.value">{{ g.name }}</option>
        </select>
      </div>
      <p>¿Ya tienes una cuenta? <router-link to="/login">Inicia Sesión</router-link></p>
      <div class="button-container">
        <button type="submit" class="submit-button">Continuar</button>
      </div>    
    </form>
  </div>
</template>

<script>
import { ref, onMounted, getCurrentInstance } from 'vue';
import usePhase from '../../composables/usePhase';
import useStudies from '../../composables/useStudies';

export default {
  name: 'Phase1',
  setup() {
    const { updateUser } = usePhase();
    const { universities, degrees, getUniversities, getDegrees } = useStudies();
    const user = ref({
      names: '',
      lastnames: '',
      email: '',
      phone: '',
      password: '',
      university: null,
      degree: null,
      birth_date: '',
      genre: ''
    });

    const selectedUniversity = ref(null);
    const selectedDegree = ref(null);
    const { ctx } = getCurrentInstance();

    const genders = [
      { name: 'Masculino', value: 'M' },
      { name: 'Femenino', value: 'F' }
    ];

    const emailError = ref('');

    const validateEmail = () => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(user.value.email)) {
        emailError.value = 'Por favor, introduce un correo electrónico válido.';
      } else {
        emailError.value = '';
      }
    };

    const onUniversityChange = () => {
      const university = selectedUniversity.value;
      getDegrees(university.id);
    };

    const formatDateToISO = (date) => {
      const d = new Date(date);
      const formattedDate = d.toISOString().split('.')[0];
      return formattedDate;
    };

    const handleSubmit = async () => {
      if (emailError.value) {
        return;
      }
      user.value.university = selectedUniversity.value;
      user.value.degree = selectedDegree.value;
      user.value.birth_date = formatDateToISO(user.value.birth_date);
      updateUser(user.value);
      ctx._.emit('goToNextPhase');
    };

    onMounted(() => {
      getUniversities();
    });

    return {
      user,
      selectedUniversity,
      selectedDegree,
      genders,
      universities,
      degrees,
      emailError,
      validateEmail,
      handleSubmit,
      onUniversityChange
    };
  }
};
</script>

<style scoped>
.phase1-container {
  background: url('@/assets/backgrounds/global-background.png') no-repeat center center;
  background-size: cover;  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(100vw - 400px);
  padding: 10px;
  box-sizing: border-box;
  border-radius: 15px;
  border: 2px solid white;
}

.phase1-header {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 30px;
}

.logo {
  width: 250px;
  height: auto;
  margin-bottom: 10px; 
}

.phase1-content {
  margin-left: 110px;
  width: 80%;
}

.phase1-group {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.phase1-group input,
.phase1-group select {
  background-color: #d7d7d7;
  color: #fff;
  width: 45%;
  padding: 17px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.phase1-group input::placeholder,
.phase1-group select::placeholder {
  color: #fff;
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
  text-decoration: underline;
  margin-top: 10px;
  width: 100px;
  align-self: flex-end; 
}

button:hover {
  background-color: #5e35b1;
}

p {
  color: white;
}

a {
  color: white;
  text-decoration: underline; 
}

a:hover {
  color: #f0f0f0;
}

.error {
  color: red;
  font-size: 14px;
  margin-bottom: 5px;
}
</style>
