<template>
    <footer class="footer-container">
      <p>© 2024 Dommus - Contacto Soporte</p>
    </footer>
</template>
  
  <script>
  export default {
    name: 'Footer'
  };
  </script>
  
  <style scoped>
  .footer-container {
    width: 100%;
    background-color: white; /* Fondo blanco */
    text-align: center;
    padding: 20px 0;
    position: fixed;
    bottom: 0;
    left: 0;
    border-top: 1px solid #ccc; /* Agregamos un borde superior ligero */
  }
  
  p {
    margin: 0;
    font-size: 18px;
    font-weight: bold;
  }
  </style>
  