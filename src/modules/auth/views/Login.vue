<template>
  <Header></Header>
  <div class="login-container">
    <div class="form-section">
      <h1 class="welcome-title">Bienvenido de nuevo!</h1>
      <form @submit.prevent="handleSubmit">
        <p class="input-label">Email:</p>
        <input type="text" placeholder="Email" v-model="user.email" @input="validateEmail" required />
        <p v-if="emailError" class="error">{{ emailError }}</p>
        
        <p class="input-label">Contraseña:</p>
        <div class="password-container">
          <input :type="showPassword ? 'text' : 'password'" placeholder="Contraseña" v-model="user.password" required />
          <span class="toggle-password" @click="showPassword = !showPassword">
            <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </span>
        </div>
        <p class="register-link"> ¿No tienes cuenta? 
          <router-link to="/register" class="link-title">
            Regístrate
          </router-link>
        </p>
        <button type="submit" class="btn">INGRESAR</button>
      </form>
    </div>
    <div class="image-section">
      <img src="@/assets/backgrounds/partners.png" alt="Roommates Partners" class="roommates-image" />
    </div>
  </div>
  <Footer></Footer>
  <NoLogin v-if="showModal" @close="closeModal"></NoLogin>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import usePhase from '../composables/usePhase';
import NoLogin from './modals/NoLogin.vue';
import Header from './commons/Header.vue';
import Footer from './commons/Footer.vue';

export default {
  name: 'Login',
  components: { NoLogin, Header, Footer },
  setup() {
    const { loginUser } = usePhase();
    const router = useRouter();
    const showModal = ref(false);

    const user = ref({
      email: '',
      password: ''
    });
    const showPassword = ref(false);
    const emailError = ref('');

    const validateEmail = () => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(user.value.email)) {
        emailError.value = 'Por favor, introduce un correo electrónico válido.';
      } else {
        emailError.value = '';
      }
    };

    const handleSubmit = async () => {
      if (emailError.value) {
        return;
      }
      const authenticated = await loginUser(user.value);
      if (authenticated) {
        router.push({ name: 'home' });
      } else {
        showModal.value = true;
      }
    };

    const closeModal = () => {
      showModal.value = false;
    };

    return {
      user,
      showPassword,
      emailError,
      validateEmail,
      handleSubmit,
      showModal,
      closeModal
    };
  }
};
</script>

<style>
.login-container {
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: space-between;
  background-color: white;
}

.form-section {
  width: 60%; /* Aumentado de 50% a 60% */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 7%; /* Aumentado el padding horizontal */
}

.image-section {
  width: 40%; /* Reducido de 50% a 40% */
  background-size: cover;
  background-position: center;
}

.welcome-title {
  font-size: 38px; /* Aumentado el tamaño de la fuente */
  font-weight: bold;
  color: #6441A4; /* Color púrpura */
  margin-bottom: 25px; /* Aumentado el margen inferior */
}

.input-label {
  margin-bottom: 8px; /* Aumentado el margen inferior */
  font-size: 18px; /* Aumentado el tamaño de la fuente */
  color: #1E1E1E;
}

input {
  width: 110%; /* Aumentado el ancho del input */
  padding: 14px; /* Aumentado el padding */
  margin-bottom: 25px; /* Aumentado el margen inferior */
  border-radius: 10px; /* Aumentado el radio de los bordes */
  border: 1px solid #ccc;
  font-size: 18px; /* Aumentado el tamaño de la fuente */
}

.password-container {
  position: relative;
  width: 110%; /* Aumentado el ancho del contenedor de la contraseña */
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.btn {
  width: 110%; /* Aumentado el ancho del botón */
  padding: 14px; /* Aumentado el padding */
  border: none;
  border-radius: 20px; /* Aumentado el radio de los bordes */
  background-color: #8C52FF;
  color: white;
  font-size: 20px; /* Aumentado el tamaño de la fuente */
  cursor: pointer;
}

.btn:hover {
  background-color: #7A42D8;
}

.register-link {
  color: #1E1E1E;
  margin-bottom: 25px; /* Aumentado el margen inferior */
}

.link-title {
  color: #6441A4;
  margin-bottom: 20px;
}

.error {
  color: red;
  font-size: 15px; /* Aumentado ligeramente el tamaño de la fuente */
}


</style>