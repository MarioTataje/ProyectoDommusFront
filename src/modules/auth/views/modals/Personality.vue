<template>
  <div class="modal" v-if="isOpen" @click="closeModal">
    <div class="modal-content" @click.stop>
      <h2 class="subtitle"> Perfil Test </h2>
      <h2 class="title">{{ detail.title }}</h2>
      <img class="icon" :src="icon" alt="Icon">
      <div class="description">
        <p>{{ detail.subtitle }}</p>
        <p class="information"> {{ detail.description }} </p>
      </div>
      <button class="continue-button" @click="confirmAccept">Continuar</button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, getCurrentInstance } from 'vue';
import tags from '@/assets/personalities/tags.json';

export default {
  props: {
    tag: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { ctx } = getCurrentInstance();
    const detail = ref({});
    const isOpen = ref(false);

    const openModal = () => {
      isOpen.value = true;
    };

    const closeModal = () => {
      isOpen.value = false;
      ctx._.emit('close');
    };

    const confirmAccept = () => {
      closeModal();
    };

    onMounted(() => {
      openModal();
      detail.value = tags[props.tag];
    });

    const icon = computed(() => {
      return require(`@/assets/personalities/${detail.value.icon}.png`);
    });

    return {
      isOpen,
      openModal,
      closeModal,
      confirmAccept,
      detail,
      icon
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
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  max-width: 700px;
  width: 90%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.title {
  font-size: 24px;
  color: #6441A4;
  margin-bottom: 10px;
  text-align: center;
}

.icon {
  width: 120px;
  height: 100px;
  margin-bottom: 20px;
}

.description {
  font-size: 14px;
  color: black;
  border: 2px solid white;
  padding: 10px;
  border-radius: 8px;
  width: 80%;
  margin: 0 auto;
}

.description h2 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

.description p {
  margin-bottom: 5px;
}

.information {
  text-align: justify;  
  max-width: 80%;
  margin: 0 auto;
}

.continue-button {
  background-color: #8F6EE0;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
  font-size: 14px;
  padding: 10px 20px;
}
</style>
