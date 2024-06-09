<template>
  <div class="sidebar">
    <h2>Crea tu Cuenta de Roommie</h2>
    <ul>
      <li :class="{ active: activeStep === 'Detalles de cuenta' }">Detalles de cuenta</li>
      <li :class="{ active: activeStep === 'Editar Perfil' }">Editar Perfil</li>
      <li :class="{ active: activeStep === 'Test de Personalidad' }">Test de Personalidad</li>
      <li :class="{ active: activeStep === 'Vivienda' }">Vivienda</li>
      <li :class="{ active: activeStep === 'Hábitos' }">Hábitos</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  props: {
    activeStep: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.sidebar {
  color: #fff;
  padding: 30px; 
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; 
  height: 100vh;
  box-sizing: border-box;
}

.sidebar h2 {
  margin-top: 0;
  margin-bottom: 40px; 
  font-size: 24px; 
  text-align: left; 
  width: 100%; 
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
  width: 100%;
}

.sidebar ul li {
  padding: 15px 0;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.sidebar ul li.active {
  background-color: #5e35b1;
  border-radius: 25px;
}

.sidebar ul li::before {
  content: '';
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #fff;
  border-radius: 50%;
  margin-right: 15px;
}

.sidebar ul li.active::before {
  background-color: #fff;
}
</style>