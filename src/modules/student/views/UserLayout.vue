<template>
  <Header @setOption="setComponent" @showProfile="handleShowProfile"/> 
  <div class="layout">
    <component :is="currentComponent" :notificationProfileId="profileId"/>
  </div>
  <Footer></Footer>
</template>

<script>
import { ref } from 'vue';
import Profile from './Profile.vue';
import Home from './Home.vue';
import Plans from './Plans.vue';

import Header from './commons/Header.vue';
import Footer from './commons/Footer.vue';

export default {
  name: 'UserLayout',
  components: {
    Profile,
    Home,
    Plans,
    Header,
    Footer,
  },
  setup() {
    const options = [
      { label: 'Profile', component: 'Profile' },
      { label: 'Home', component: 'Home' },
      { label: 'Plans', component: 'Plans' },
    ];

    const currentComponent = ref(options[1].component);
    const profileId = ref(null);

    const updateOption = (label) => {
      currentComponent.value = options.find((option) => option.label === label).component;
    };

    const setComponent = (event) => {
      updateOption(event.option);
    };

    const handleShowProfile = (data) => {
      profileId.value = data.profileId;
    };


    return {
      options,
      currentComponent,
      updateOption,
      setComponent,

      handleShowProfile,
      profileId,
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
