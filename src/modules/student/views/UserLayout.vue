<!--eslint-disable-->
<template>
  <div class="layout">
    <Menu :activeOption="activeOption" :options="options" @updateOption="updateOption"/>
    <component :is="currentComponent"/>
  </div>
</template>
  
<script>
  import { ref } from 'vue';
  import Menu from './Menu.vue';
  import Profile from './Profile.vue';
  import Home from './Home.vue';
  import Notifications from './Notifications.vue';
  
  import profileIcon from '@/assets/profile_icon.png';
  import homeIcon from '@/assets/home_icon.png';
  import notificationsIcon from '@/assets/notifications_icon.png';
  import logoutIcon from '@/assets/logout_icon.png';

  export default {
	name: 'UserLayout',
	components: {
    Profile,
		Menu,
		Home,
    Notifications,
	},
  setup(){
    const options = [
      { label: 'Profiles', component: 'Profile', icon: profileIcon },
      { label: 'Home', component: 'Home', icon: homeIcon },
      { label: 'Notifications', component: 'Notifications', icon: notificationsIcon },
      { label: 'Blog', component: 'Blog', icon: logoutIcon }
    ];

    const activeOption = ref(options[1].label);
    const currentComponent = ref(options[1].component);

    const updateOption = (label) => {
      activeOption.value = label;
      currentComponent.value = options.find(option => option.label === label).component;
    };

    return {
      options,
      activeOption,
      currentComponent,
      updateOption
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
  