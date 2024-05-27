<template>
  <div class="phase1-container">
    <div class="phase1-header">
      <img src="@/assets/logo.png" alt="Dommus Logo" class="logo" />
    </div>
    <form @submit.prevent="handleSubmit" class="phase1-content">
      <div class="phase1-group">
        <input type="text" placeholder="Nombres *" v-model="firstName" required />
        <input type="text" placeholder="Apellidos *" v-model="lastName" required />
      </div>
      <div class="phase1-group">
        <input type="email" placeholder="Correo Universitario *" v-model="email" required />
        <input type="tel" placeholder="Número de Celular *" v-model="phoneNumber" required />
      </div>
      <div class="phase1-group">
        <input type="password" placeholder="Ingrese su contraseña *" v-model="password" required />
        <input type="password" placeholder="Confirme su contraseña *" v-model="confirmPassword" required />
      </div>
      <div class="phase1-group">
        <input type="text" placeholder="Ingrese su Universidad *" v-model="university" required />
        <input type="text" placeholder="Ingrese su Carrera Universitaria *" v-model="career" required />
      </div>
      <div class="phase1-group">
        <input type="date" placeholder="Fecha de Nacimiento *" v-model="birthDate" required />
        <select v-model="gender" required style="height: 52px;">
          <option value="">Sexo</option>
          <option value="male">Masculino</option>
          <option value="female">Femenino</option>
          <option value="other">Otro</option>
        </select>
      </div>
      <p >¿Ya tienes una cuenta? <router-link to="/login">Inicia Sesión</router-link></p>
      <div class="button-container">
        <button type="submit" class="submit-button" @click="$emit('goToNextPhase')">Continuar</button>
      </div>    
    </form>
  </div>
</template>

<script>
export default {
  name: 'Phase1',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      university: '',
      career: '',
      birthDate: '',
      gender: ''
    };
  },
  methods: {
    handleSubmit() {
      // Handle form submission
      console.log('Form submitted');
    },

    toPhase2() {
      console.log('Navigating to phase 2');
      this.$router.push('/phase2');
    }
  }
};
</script>

<style scoped>
.phase1-container {
  background-color: #BB9FFF;
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
  margin-bottom: 10px; /* Ajusta el margen inferior del logo */
}

.phase1-content {
  margin-left: 110px;
  width: 80%; /* Ajusta el ancho del formulario */
}

.phase1-group {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px; /* Aumenta el margen inferior entre grupos */
}

.phase1-group input,
.phase1-group select {
  background-color: #d7d7d7; /* Color de fondo gris */
  color: #fff;
  width: 45%;
  padding: 17px; /* Aumenta el espacio interno */
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.phase1-group input::placeholder,
.phase1-group select::placeholder {
  color: #fff; /* Cambia el color del placeholder a gris */
}

.button-container {
  display: flex;
  justify-content: flex-end; /* Alinea el botón a la derecha */
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
  color: white; /* Color blanco para la frase "Ya tienes una cuenta?" */
}

a {
  color: white; /* Color blanco para el enlace */
  text-decoration: underline; /* Subrayado para el enlace */
}

a:hover {
  color: #f0f0f0; /* Cambia el color al pasar el mouse */
}
</style>

