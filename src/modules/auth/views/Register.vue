<!--eslint-disable-->
<template>
	<div class="register-container">
	  <SideBar :activeStep="steps[currentStep].label"/>
    <component :is="steps[currentStep].component" @goToNextPhase="toNextPhase"/>
  </div>
</template>
  
<script>
  import SideBar from './SideBar.vue';
  import Phase1 from './phases/Phase1.vue';
  import Phase2 from './phases/Phase2.vue';
  import Phase3 from './phases/Phase3.vue';
  import Phase4 from './phases/Phase4.vue';
  import Phase5 from './phases/Phase5.vue';
  
  export default {
	name: 'Register',
	components: {
		SideBar,
		Phase1,
    Phase2,
    Phase3,
    Phase4,
    Phase5
	},
  data() {
    return {
      steps: [
        { label: 'Detalles de cuenta', component: 'Phase1' },
        { label: 'Editar Perfil', component: 'Phase2' },
        { label: 'Test de Personalidad', component: 'Phase3' },
        { label: 'Vivienda', component: 'Phase4' },
        { label: 'Hábitos', component: 'Phase5' },
      ],
      currentStep: 4,
    };
  },
  methods: {
    toNextPhase() {
      if (this.currentStep < this.steps.length - 1) {
        this.currentStep++;
      }
    },
  },
  };
</script>
  
<style scoped>
.register-container {
  display: flex;
  height: 100vh; /* Ensure the container takes the full viewport height */
  width: 100vw;
  font-family: Arial, sans-serif;
  margin: 0;
  background-color: #f4f4f9;
  background: 
    url('@/assets/background.png') no-repeat center center, 
    url('@/assets/background2.png') no-repeat center center;
  background-size: cover, cover;
  background-position: center;
}
</style>
  