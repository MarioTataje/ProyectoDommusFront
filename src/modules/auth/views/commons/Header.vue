<template>
  <header class="header-container">
    <img src="@/assets/logos/logo.png" alt="Dommus Logo" class="logo" />
  </header>
</template>

<script>
export default {
  name: 'Header'
};
</script>

<style scoped>
.header-container {
  width: 100%;
  background-color: white; /* Fondo blanco */
  padding: 10px 20px; /* Reducimos el padding para que sea más chico */
  position: fixed;
  top: 0; /* Fijar en la parte superior */
  left: 0;
  display: flex;
  align-items: center; /* Alinear los elementos verticalmente */
  border-bottom: 1px solid #ccc; /* Agregamos un borde inferior */
  z-index: 1000; /* Asegura que el header esté por encima de otros elementos */
}

.logo {
  height: 40px; /* Tamaño de la imagen reducido */
  margin-left: 20px; /* Espacio en el lado izquierdo */
}
</style>
