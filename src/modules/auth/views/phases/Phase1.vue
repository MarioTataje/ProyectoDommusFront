<template>
  <div class="register-container">
    <div class="form-section">
      <form @submit.prevent="handleSubmit">
        <h1 class="register-title">Regístrate</h1>
        <div class="form-group-inline">
          <div class="input-group">
            <label for="names">Nombre:</label>
            <input type="text" id="names" placeholder="Nombre" v-model="user.names" @input="validateName" required />
            <span v-if="nameError" class="error-message">{{ nameError }}</span>
          </div>
          <div class="input-group">
            <label for="lastnames">Apellido:</label>
            <input type="text" id="lastnames" placeholder="Apellido" v-model="user.lastnames" @input="validateLastName" required />
            <span v-if="lastNameError" class="error-message">{{ lastNameError }}</span>
          </div>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" placeholder="Email" v-model="user.email" @input="validateEmail" required />
          <span v-if="emailError" class="error-message">{{ emailError }}</span>
        </div>
        <div class="form-group">
          <label for="password">Contraseña:</label>
          <input type="password" id="password" placeholder="Contraseña" v-model="user.password" @input="validatePassword" required />
          <span v-if="passwordError" class="error-message">{{ passwordError }}</span>
        </div>
        <div class="form-group-inline">
          <div class="input-group">
            <label for="birthdate">Fecha de nac.:</label>
            <input type="date" id="birthdate" v-model="user.birth_date" :min="minDate" :max="maxDate" required />
          </div>
          <div class="input-group">
            <label for="gender">Sexo:</label>
            <select id="gender" v-model="user.genre" required>
              <option value="">Seleccionar</option>
              <option v-for="g in genders" :key="g.value" :value="g.value">{{ g.name }}</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label for="university">Universidad:</label>
          <select id="university" v-model="selectedUniversity" @change="onUniversityChange" required>
            <option v-for="university in universities" :key="university.id" :value="university">{{ university.name }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="degree">Facultad Universitaria:</label>
          <select id="degree" v-model="selectedDegree" required>
            <option v-for="degree in degrees" :key="degree.id" :value="degree">{{ degree.name }}</option>
          </select>
        </div>
        <div class="form-group button-container">
          <button type="submit" class="submit-button">Continuar</button>
        </div>    
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import usePhase from '../../composables/usePhase';
import useStudies from '../../composables/useStudies';

export default {
  name: 'Register',
  setup(props, { emit }) {
    const { updateUser, verifyEmail } = usePhase();
    const { universities, degrees, getUniversities, getDegrees } = useStudies();
    const user = ref({
      names: '',
      lastnames: '',
      email: '',
      password: '',
      university: null,
      degree: null,
      birth_date: '',
      genre: ''
    });

    const selectedUniversity = ref(null);
    const selectedDegree = ref(null);

    const genders = [
      { name: 'Masculino', value: 'M' },
      { name: 'Femenino', value: 'F' }
    ];

    const nameError = ref('');
    const lastNameError = ref('');
    const emailError = ref('');
    const passwordError = ref('');
    const minDate = '1985-01-01';
    const maxDate = '2007-12-31';

    const validateName = async () => {
      const namePattern = /^[A-Za-z\s\p{L}]+$/u;
      if (!namePattern.test(user.value.names)) {
        nameError.value = 'Por favor, introduce un nombre válido.';
      } else {
        nameError.value = '';
      }
    };

    const validateLastName = async () => {
      const lastNamePattern = /^[A-Za-z\s\p{L}]+$/u;
      if (!lastNamePattern.test(user.value.lastnames)) {
        lastNameError.value = 'Por favor, introduce un apellido válido.';
      } else {
        lastNameError.value = '';
      }
    };

    const validateEmail = async () => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const eduDomainPattern = /\.edu.pe$/;

      if (!emailPattern.test(user.value.email)) {
        emailError.value = 'Por favor, introduce un correo electrónico válido.';
      } else if (!eduDomainPattern.test(user.value.email)) {
        emailError.value = 'El correo debe terminar en .edu.pe';
      } else {
        emailError.value = '';
        try {
          const response = await verifyEmail( { email: user.value.email } );
          if (response.message != 'Email disponible para utilizar') {
            emailError.value = response.message;
          }
        } catch (error) {
          console.error('Error al verificar el correo electrónico:', error);
        }
      }
    };

    const validatePassword = () => {
      const hasUpperCase = /[A-Z]/.test(user.value.password);
      const hasLowerCase = /[a-z]/.test(user.value.password);
      const hasNumber = /\d/.test(user.value.password);
      const hasSpecialChar = /[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/.test(user.value.password);

      if (!hasUpperCase) {
        passwordError.value = 'La contraseña debe contener al menos una letra mayúscula.';
      } else if (!hasLowerCase) {
        passwordError.value = 'La contraseña debe contener al menos una letra minúscula.';
      } else if (!hasNumber) {
        passwordError.value = 'La contraseña debe contener al menos un número.';
      } else if (!hasSpecialChar) {
        passwordError.value = 'La contraseña debe contener al menos un carácter especial (!"#$%&/.-()).';
      } else {
        passwordError.value = '';
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
      if (nameError.value || lastNameError.value || emailError.value || passwordError.value) {
        return;
      }
      user.value.university = selectedUniversity.value;
      user.value.degree = selectedDegree.value;
      user.value.birth_date = formatDateToISO(user.value.birth_date);
      updateUser(user.value);
      emit('setOption', { option: 'Phase2' });
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
      
      nameError,
      lastNameError,
      emailError,
      passwordError,

      validateName,
      validateLastName,
      validateEmail,
      validatePassword,

      minDate,
      maxDate,
      handleSubmit,
      onUniversityChange
    };
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  width: 100%;
  height: auto;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
  background-color: white;
}

.form-section {
  width: 100%;
  height: 90%;
  padding: 40px;
}

.register-title {
  font-size: 32px;
  color: #6441A4;
  margin-bottom: 20px;
}

.form-group-inline {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
}

.input-group {
  width: 100%;
}

.form-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

input {
  width: 100%;
  padding: 14px;
  margin-top: 10px;
  margin-bottom: 0px;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

select {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: white;
  font-size: 14px;
  color: #333;
  transition: border-color 0.3s;
  appearance: none;
}

.button-container {
  display: flex;
  justify-content: flex-end;
}

.submit-button {
  background-color: #7e57c2;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 150px;
}

.submit-button:hover {
  background-color: #5e35b1;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

</style>
