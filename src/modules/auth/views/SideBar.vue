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
  padding: 30px; /* Ajuste del padding para más espacio alrededor */
  width: 400px; /* Aumentado el ancho a 400px */
  display: flex;
  flex-direction: column;
  align-items: center; /* Centrando horizontalmente */
  justify-content: center; /* Centrando verticalmente */
  height: 100vh; /* Ocupa toda la altura del viewport */
  box-sizing: border-box; /* Asegura que el padding se incluya en el ancho total */
}

.sidebar h2 {
  margin-top: 0;
  margin-bottom: 40px; /* Añadido espacio debajo del título */
  font-size: 24px; /* Ajuste del tamaño de fuente para mayor legibilidad */
  text-align: left; /* Alinea el texto del título a la izquierda */
  width: 100%; /* Asegura que el texto se alinee a la izquierda del contenedor */
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
  width: 100%;
}

.sidebar ul li {
  padding: 15px 0; /* Ajuste del padding para más espacio entre elementos */
  cursor: pointer;
  font-size: 18px; /* Ajuste del tamaño de fuente para mayor legibilidad */
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Alinea el texto a la izquierda */
}

.sidebar ul li.active {
  background-color: #5e35b1;
  border-radius: 25px; /* Añadir bordes redondeados para que coincida con el diseño de la imagen */
}

.sidebar ul li::before {
  content: '';
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #fff;
  border-radius: 50%;
  margin-right: 15px; /* Espacio entre el círculo y el texto */
}

.sidebar ul li.active::before {
  background-color: #fff;
}
</style>