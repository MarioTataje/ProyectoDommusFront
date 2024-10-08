<template>
  <div class="home">
    <div class="content">
      <img src="@/assets/logos/logo.png" alt="Dommus Logo" class="logo" />
      <h1 class="title">Descubre tu Roomie ideal con IA<br />Ajustado a tu Personalidad y Necesidades</h1>
      
      <div class="buttons">
        <button @click="login" class="btn login-btn">Iniciar Sesión</button>
        <button @click="register" class="btn register-btn">Regístrate</button>
      </div>

      <img src="@/assets/logos/robot.png" alt="Robot Mascot" class="robot-mascot" />
      
      <div class="benefits">
        <p class="benefit-title">¿Por qué usar Dommus?</p>
        <div class="benefit-items">
          <div class="benefit-item">
            <h4>Compatibilidad Personalizada</h4>
            <p>Dommus usa un test de personalidad para clasificar a los roomies en tres niveles de compatibilidad, asegurando una mejor convivencia.</p>
          </div>
          <div class="benefit-item">
            <h4>Matches Precisos</h4>
            <p>Nuestro sistema categoriza a los roomies según su afinidad contigo, permitiéndote enfocarte en las opciones más compatibles y ahorrar tiempo.</p>
          </div>
          <div class="benefit-item">
            <h4>Comunicación Directa</h4>
            <p>Una vez que encuentres a tu roomie ideal, puedes contactarlo fácilmente por WhatsApp o email para una conexión rápida y sencilla.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="image-section">
      <img src="@/assets/backgrounds/roommates.png" alt="Roommates Image" class="roommates-image" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LockScreen',
  methods: {
    login() {
      this.$router.push('/login');
    },
    register() {
      this.$router.push('/phase1');
    },
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: row;
  height: 100vh;
  background-color: #f9f9f9; /* Fondo blanco suave */
  padding: 0 80px;
  position: relative;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  position: relative;
}

.logo {
  position: absolute;
  top: 20px;  /* Mueve la imagen hacia arriba */
  left: 20px; /* Mueve la imagen hacia la izquierda */
  max-width: 160px;
}

.title {
  font-size: 42px;
  font-weight: bold;
  color: #4a4a4a;
  margin-top: 110px; /* Añadimos un margen superior para separar del logo */
  margin-bottom: 20px;
}

.robot-mascot {
  max-width: 120px;
  margin-top: 0px;
  position: absolute;
  right: 20px;
  top: 240px; /* Posición del robot a la derecha de los botones */
}

.buttons {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 200px; /* Para limitar el tamaño de los botones */
}

.btn {
  width: 100%; /* Botones toman el 100% del contenedor */
  padding: 12px 0;
  font-size: 18px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s;
  border-radius: 30px;
}

.login-btn {
  background-color: #6C5CE7;
  color: white;
  border: none;
  border-radius: 50px; /* Estilo ovalado */
  padding: 16px 0; /* Incrementar el padding para agrandar el botón */
  font-size: 20px; /* Aumentar el tamaño de la fuente */
}

.register-btn {
  background-color: transparent;
  color: #6C5CE7;
  border: none; /* Sin borde */
  text-decoration: underline; /* Subrayar el texto */
  font-size: 18px; /* Tamaño de fuente igual al botón de login */
  cursor: pointer; /* Cambiar el cursor al pasar el mouse */
  transition: color 0.3s;
}

.btn:hover {
  background-color: #8F6EE0;
}

.register-btn:hover {
  color: white; /* Cambia el color del texto al hacer hover */
}

.benefits {
  display: flex; /* Cambiado a flex para disposición vertical */
  flex-direction: column; /* Disposición en columna */
  align-items: center; /* Centra los elementos en el contenedor */
  margin-top: 40px;
}

.benefit-title {
  color: #6B46C1;
  font-size: 24px; /* Tamaño de fuente del título */
  font-weight: bold;
  margin-bottom: 20px; /* Espacio entre el título y los beneficios */
}

.benefit-items {
  display: flex; /* Cambiado a flex para disposición horizontal */
  justify-content: space-between; /* Espaciado entre los elementos */
  width: 100%; /* Ocupa todo el ancho */
  flex-wrap: wrap; /* Permite que se ajusten en caso de que haya poco espacio */
}

.benefit-item {
  flex: 1; /* Permite que cada beneficio tome espacio igual */
  margin: 0 10px; /* Espacio entre los elementos */
}

.benefit-item h4 {
  font-size: 14px;
  font-weight: bold;
  color: #6B46C1;
}

.benefit-item p {
  font-size: 14px;
  color: #666666;
}

.image-section {
  flex: 1;
  display: flex;
  align-items: flex-start; /* Alinea la imagen en la parte superior */
  justify-content: flex-end; /* Mueve la imagen hacia la derecha */
  position: relative;
}

.roommates-image {
  max-width: 90%; 
  height: auto; 
  border-radius: 20px;
  margin-top: 20px;
}
</style>
