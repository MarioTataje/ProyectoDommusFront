<template>
  <div class="modal" v-if="isOpen" @click="closeModal">
    <div class="modal-content" @click.stop>
      <p class="error-text">Credenciales incorrectas</p>
      <button class="continue-button" @click="confirmAccept">Continuar</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, getCurrentInstance } from 'vue';

export default {
  setup() {
    const { ctx } = getCurrentInstance();
    const isOpen = ref(false);

    const openModal = () => {
      isOpen.value = true;
    };

    const closeModal = () => {
      isOpen.value = false;
      ctx.$emit('close');
    };

    const confirmAccept = () => {
      closeModal();
    };

    onMounted(() => {
      openModal();
    });

    return {
      isOpen,
      openModal,
      closeModal,
      confirmAccept
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
  background: url('@/assets/backgrounds/global-background.png') no-repeat center center;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  max-width: 400px;
  width: 80%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.error-text {
  color: white;
  margin-bottom: 10px;
  font-size: 22px;
  font-weight: bold;
}

.continue-button {
  background-color: #8F6EE0;
  color: #fff;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  margin-top: 10px;
  font-size: 14px;
  width: 40%;
  padding: 10px 0px;
}
</style>
