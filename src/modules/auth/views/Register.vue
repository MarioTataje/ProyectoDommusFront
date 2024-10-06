<template>
  <div class="register-container">
    <Phase1></Phase1>
  </div>
</template>

<script>
import Phase1 from './phases/Phase1.vue';

export default {
  name: 'Register',
  components: {
    Phase1
  },
  setup() {
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  font-family: Arial, sans-serif;
  margin: 0;
  background-color: #f4f4f9;
  background-size: cover;
  background-position: center;
}
</style>
