<template>
  <div class="modal" v-if="isOpen" @click="closeModal">
    <div class="modal-content" @click.stop>
      <h2 class="title-text">Descubre tu personalidad de MBTI</h2>
      <p class="instructions">Sigue estos pasos para tomar el test y compartir tus resultados</p>
      <div class="steps">
        <div class="step">
          <p class="step-label">1. Haz clic en el siguiente enlace para realizar tu test de personalidad:</p>
          <button class="test-button" @click="openTest">Test de personalidad</button>
          <p class="step-description">El test te tomará aproximadamente 12 minutos.</p>
        </div>
        <div class="step">
          <p class="step-label">2. Recibe tus resultados.</p>
          <p class="step-description">
            Al finalizar el test, recibirás un análisis detallado con <strong>porcentajes</strong> de cada uno de 
            los cuatro enfoques: Introversión/Extraversion, Intuición/Observación, Pensamiento/Sentimiento, y 
            Juicio/Percepción.            
          </p>
        </div>
        <div class="step">
          <p class="step-label">3. Ingresa tus resultados en la siguiente pantalla.</p>
        </div>
      </div>
      <button class="continue-button" @click="confirmAccept">Continuar</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const isOpen = ref(false);

    const openModal = () => {
      isOpen.value = true;
    };

    const closeModal = () => {
      isOpen.value = false;
    };

    const confirmAccept = () => {
      closeModal();
    };

    const openTest = () => {
      window.open('https://www.16personalities.com/es/test-de-personalidad', '_blank');
    };

    onMounted(() => {
      openModal();
    });

    return {
      isOpen,
      openModal,
      closeModal,
      confirmAccept,
      openTest
    };
  }
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  max-width: 700px;
  width: 90%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.title-text {
  color: #6441A4;
  margin-bottom: 10px;
}

.instructions {
  color: black;
  margin-bottom: 20px;
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.step {
  background: transparent;
  padding: 15px;
  border: 2px solid white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.step-label {
  color: black;
  margin: 0;
}

.step-description {
  color: black;
  margin-top: 1px;
}

.test-button {
  margin-top: 0px;
  background-color: transparent;
  color: blue;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  text-align: center;
  display: inline-block;
  transition: border-color 0.3s ease, color 0.3s ease;
  white-space: nowrap;
  overflow: hidden;
  width: 30%;
}

.test-button:hover {
  border-color: #8F6EE0;
  color: #8F6EE0;
}

.continue-button {
  background-color: #8F6EE0;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
  font-size: 14px;
}
</style>