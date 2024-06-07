<template>
  <div class="menu">
    <div class="logo-container">
      <img src="@/assets/logos/logo.png" alt="Logo" class="logo" />
    </div>
    <ul>
      <li 
        v-for="option in options" 
        :key="option.label" 
        :class="{ active: activeOption === option.label }"
        @click="$emit('updateOption', option.label)"
      >
      <img v-if="option.label !== 'Logout'" :src="option.icon" :alt="option.label" />
      <img v-else @click="logout" :src="option.icon" :alt="option.label" />      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  props: {
    activeOption: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    logout: {
      type: Function,
      required: true
    }
  }
};
</script>

<style scoped>
.menu {
  color: #fff;
  padding: 30px;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  box-sizing: border-box;
}

.logo-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.logo {
  width: 180px;
  margin-top: 30px;
  margin-bottom: 60px;
}

.menu ul {
  list-style-type: none;
  padding: 0;
  width: 100%;
}

.menu ul li {
  padding: 15px 0;
  cursor: pointer;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 60px;
}

.menu ul li img {
  width: 40px;
  height: 40px;
}

.menu ul li.active {
  background-color: #fff;
  color: #5e35b1;
  border-radius: 25px;
}

.menu ul li.active img {
  filter: invert(32%) sepia(91%) saturate(6795%) hue-rotate(239deg) brightness(97%) contrast(101%);
}
</style>
