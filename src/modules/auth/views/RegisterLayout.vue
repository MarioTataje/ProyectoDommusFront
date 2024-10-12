<template>
  <Header></Header>
  <div class="layout">
    <component :is="currentComponent" @setOption="setComponent"/>
    <div class="image-section">
      <img src="@/assets/backgrounds/partners.png" alt="Roommates Partners" class="roommates-image" />
    </div>
  </div>
  <Footer></Footer>
</template>

<script>
import { ref } from 'vue';
import Phase1 from './phases/Phase1.vue';
import Phase2 from './phases/Phase2.vue';
import Phase3 from './phases/Phase3.vue';
import Phase4 from './phases/Phase4.vue';
import Phase5 from './phases/Phase5.vue';

import Header from './commons/Header.vue';
import Footer from './commons/Footer.vue';

export default {
  name: 'UserLayout',
  components: {
    Header,
    Footer,

    Phase1,
    Phase2,
    Phase3,
    Phase4,
    Phase5
  },
  setup() {
    const options = [
      { label: 'Phase1', component: 'Phase1' },
      { label: 'Phase2', component: 'Phase2' },
      { label: 'Phase3', component: 'Phase3' },
      { label: 'Phase4', component: 'Phase4' },
      { label: 'Phase5', component: 'Phase5' },
    ];

    const currentComponent = ref(options[0  ].component);

    const updateOption = (label) => {
      currentComponent.value = options.find((option) => option.label === label).component;
    };

    const setComponent = (event) => {
      updateOption(event.option);
    };

    return {
      options,
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

.image-section {
  width: 50%;
  height: 100vh;
}

.roommates-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
