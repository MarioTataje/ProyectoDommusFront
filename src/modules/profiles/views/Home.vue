<template>
    <div class="home">

    </div>
</template>
  
<script>
  export default {
    name: 'Home',
  };
</script>
  
<style scoped>
  .home {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background: 
      url('@/assets/background.png') no-repeat center center,
      url('@/assets/background2.png') no-repeat center center;
  
    background-size: cover, cover;
    overflow: hidden;
  }
</style>
  