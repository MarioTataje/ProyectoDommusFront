<template>
  <Header @setOption="setComponent"/> 
  <div class="layout">
    <component :is="currentComponent"/>
  </div>
  <Footer></Footer>
</template>

<script>
import { ref } from 'vue';
import Profile from './Profile.vue';
import Home from './Home.vue';
import Notifications from './Notifications.vue';
import Plans from './Plans.vue';

import Header from './commons/Header.vue';
import Footer from './commons/Footer.vue';

export default {
  name: 'UserLayout',
  components: {
    Profile,
    Home,
    Notifications,
    Plans,
    Header,
    Footer,
  },
  setup() {
    const options = [
      { label: 'Profile', component: 'Profile' },
      { label: 'Home', component: 'Home' },
      { label: 'Notifications', component: 'Notifications' },
      { label: 'Plans', component: 'Plans' },
    ];

    const activeOption = ref(options[1].label);
    const currentComponent = ref(options[1].component);

    const updateOption = (label) => {
      activeOption.value = label;
      currentComponent.value = options.find((option) => option.label === label).component;
    };

    const setComponent = (event) => {
      updateOption(event.option);
    };

    return {
      options,
      activeOption,
      currentComponent,
      updateOption,
      setComponent,
    };
  },
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
