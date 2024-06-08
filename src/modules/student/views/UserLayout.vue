<!--eslint-disable-->
<template>
  <div class="layout">
    <Menu :activeOption="activeOption" :options="options" @updateOption="updateOption" logout="logout"/>
    <component :is="currentComponent"/>
  </div>
</template>
  
<script>
  import { ref } from 'vue';
  import Menu from './Menu.vue';
  import Profile from './Profile.vue';
  import Home from './Home.vue';
  import Notifications from './Notifications.vue';
  
  import profileIcon from '@/assets/icons/profile_icon.png';
  import homeIcon from '@/assets/icons/home_icon.png';
  import notificationsIcon from '@/assets/icons/notifications_icon.png';
  import logoutIcon from '@/assets/icons/logout_icon.png';

  import { useRouter } from 'vue-router';

  export default {
	name: 'UserLayout',
	components: {
    Profile,
		Menu,
		Home,
    Notifications,
	},
  setup(){
    const router = useRouter(); 
    const options = [
      { label: 'Profiles', component: 'Profile', icon: profileIcon },
      { label: 'Home', component: 'Home', icon: homeIcon },
      { label: 'Notifications', component: 'Notifications', icon: notificationsIcon },
      { label: 'Logout', component: 'Logout', icon: logoutIcon }
    ];

    const activeOption = ref(options[1].label);
    const currentComponent = ref(options[1].component);

    const updateOption = (label) => {
      activeOption.value = label;
      currentComponent.value = options.find(option => option.label === label).component;
    };

    const logout = () => {
      router.push('/login');
      sessionStorage.removeItem('access');
    };

    return {
      options,
      activeOption,
      currentComponent,
      updateOption,
      logout
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
    overflow: hidden;
  }
</style>
  