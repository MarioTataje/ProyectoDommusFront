<template>
  <footer class="footer-container">
    <p>© 2024 Dommus - <a href="https://outlook.office365.com/mail/" target="_blank" class="support-link">Contacto Soporte</a></p>
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
  background-color: white;
  text-align: center;
  padding: 20px 0;
  position: fixed;
  bottom: 0;
  left: 0;
  border-top: 1px solid #ccc;
}

p {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
}

.support-link {
  color: inherit;
  text-decoration: none;
}

.support-link:hover {
  text-decoration: underline;
}
</style>
