<template>
  <div class="login">
    <div class="login-box">
      <img src="@/assets/logo.png" alt="Dommus Logo" class="logo" />
      <h1 class="title">Login</h1>
      <form @submit.prevent="login">
        <input type="text" placeholder="Email" v-model="email" required />
        <div class="password-container">
          <input :type="showPassword ? 'text' : 'password'" placeholder="Contraseña" v-model="password" required />
          <span class="toggle-password" @click="showPassword = !showPassword">
            <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </span>
        </div>
        <button type="submit" class="btn">Iniciar Sesión</button>
      </form>
      <p class="register-link">¿Aún no tienes una cuenta? <router-link to="/register">Regístrate</router-link></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
    };
  },
  methods: {
    login() {
      // Lógica de inicio de sesión
      console.log('Iniciando sesión con', this.email, this.password);
    },
  },
};
</script>

<style>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: 
    url('@/assets/background.png') no-repeat center center, 
    url('@/assets/background2.png') no-repeat center center;
  background-size: cover, cover;
  position: relative;
  overflow: hidden;
}

.login-box {
  background-color: #BB9FFF;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;
  z-index: 2;
}

.logo {
  max-width: 150px;
  margin-bottom: 20px;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #4b4b4b;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.password-container {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.toggle-password i {
  font-size: 16px;
  color: #888;
}

.btn {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #7f3fbf;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #6a32a5;
}

.register-link {
  margin-top: 20px;
  color: #888;
}

.register-link a {
  color: #7f3fbf;
  text-decoration: none;
}
</style>