<!--eslint-disable-->
<template>
  <div class="layout">
	  <Menu :activeOption="options[currentOption].label"/>
    <component :is="options[currentOption].component"/>
  </div>
</template>
  
<script>
  import Menu from './Menu.vue';
  import Home from './Home.vue';
  
  export default {
	name: 'UserLayout',
	components: {
		Menu,
		Home,
	},
  setup(){
    const options = [
      { label: 'Profiles', component: 'Profiles' },
      { label: 'Home', component: 'Home' },
      { label: 'Notifications', component: 'Notifications' },
      { label: 'Blog', component: 'Blog' }
    ];
    const currentOption = 1;

    return {
      options,
      currentOption    
    };
  }
  };
</script>
  
<style scoped>
  .layout {
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
  