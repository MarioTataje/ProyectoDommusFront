<template>
    <div class="home">
      <div class="overlay"></div>
      <div class="content">
        <img src="@/assets/logo.png" alt="Dommus Logo" class="logo" />
        <h1 class="slogan">"Emparejamiento inteligente, para tu vida universitaria"</h1>
        <div class="buttons">
          <button @click="login" class="btn">Iniciar Sesión</button>
          <button @click="register" class="btn">Registrarse</button>
        </div>
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
        this.$router.push('/register');
      },
    },
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

  .content {
    position: relative;
    z-index: 1;
    text-align: center;
    color: white;
  }
  
  .logo {
    max-width: 350px;
    margin-bottom: 20px;
  }
  
  .slogan {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .buttons {
    display: flex;
    gap: 20px;
    justify-content: center;
  }
  
  .btn {
    background-color: #7f3fbf; 
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
    min-width: 150px;
    text-align: center;
    border-radius: 8px;
  }
  
  .btn:hover {
    background-color: #6a32a5;
  }
  </style>
  