<template>
  <div class="notification-container">
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
name: 'Notification',
setup() {
  const user = ref({});

  onMounted(() => {
  });

  return {
    user,
  };
}
};
</script>

<style scoped>
.notification-container {
background-color: #fff;
flex-direction: column;
justify-content: center;
align-items: center;
width: calc(100vw - 400px);
height: 100vh;
padding: 20px;
border-radius: 15px;
box-sizing: border-box;
overflow: hidden;
}

</style>