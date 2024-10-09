<template>
  <div class="plans-container">
    <h1 class="title">¡Desbloquea todo el potencial de Dommus IA PRO!</h1>
    <h2 class="subtitle">Selecciona tu Plan</h2>

    <p class="subtitle-2">Mejora tu Plan para Acceder</p>
    <div class="benefits-container">
      <div class="benefit-item">
        <img src="@/assets/icons/results-icon.png" alt="Resultados ilimitados" class="benefit-icon" />
        <div>
          <h3 class="benefit-title">Resultados Ilimitados</h3>
          <p class="benefit-description">Explora sin restricciones</p>
        </div>
      </div>
      <div class="benefit-item">
        <img src="@/assets/icons/filters-icon.png" alt="Filtros avanzados" class="benefit-icon" />
        <div>
          <h3 class="benefit-title">Filtros Avanzados</h3>
          <p class="benefit-description">Encuentra fácilmente a tu roommie correcto</p>
        </div>
      </div>
      <div class="benefit-item">
        <img src="@/assets/icons/events-icon.png" alt="Eventos Pro" class="benefit-icon" />
        <div>
          <h3 class="benefit-title">Eventos Pro</h3>
          <p class="benefit-description">Conoce gente nueva en eventos para confraternizar</p>
        </div>
      </div>
      <div class="benefit-item">
        <img src="@/assets/icons/matches-icon.png" alt="Más matches diarios" class="benefit-icon" />
        <div>
          <h3 class="benefit-title">Más matches diarios</h3>
          <p class="benefit-description">En lugar de 3 diarios del plan free</p>
        </div>
      </div>
      <div class="benefit-item">
        <img src="@/assets/icons/content-icon.png" alt="Contenido Exclusivo" class="benefit-icon" />
        <div>
          <h3 class="benefit-title">Contenido Exclusivo</h3>
          <p class="benefit-description">Contenido Premium para nuevos independientes</p>
        </div>
      </div>
    </div>

    <div class="plans-options">
      <div class="plan-card free-plan">
        <p class="plan-title">Free</p>
        <p class="plan-price">S/. 0</p>
        <button class="plan-button" @click="changePlan('L', 0)" :disabled="profilePlan === 0">
          {{ profilePlan === 0 ? 'PLAN ACTUAL' : 'UPGRADE' }}
        </button>      </div>
      <div class="plan-card">
        <p class="plan-title">Mensual</p>
        <p class="plan-price">S/. 15</p>
        <button class="plan-button" @click="changePlan('M', 15)" :disabled="profilePlan === 1">
          {{ profilePlan === 1 ? 'PLAN ACTUAL' : 'UPGRADE' }}
        </button>
      </div>
      <div class="plan-card">
        <p class="plan-title">Trimestral</p>
        <p class="plan-price">S/. 30</p>
        <button class="plan-button" @click="changePlan('T', 30)" :disabled="profilePlan === 2">
          {{ profilePlan === 2 ? 'PLAN ACTUAL' : 'UPGRADE' }}
        </button>
      </div>
    </div>

    <div class="additional-info">
      <p>Se te redirigirá a un chat de WhatsApp. Asegúrate de enviar un mensaje indicando el Plan Pro que deseas. Luego, envíanos tu comprobante de pago por Yape o Plin para confirmar. ¡Listo! Activaremos Dommus IA Pro para ti.</p>
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from 'vue';
import useProfile from '../composables/useProfile';
import usePhase from '@/modules/auth/composables/usePhase';

export default {
  name: 'Plans',
  setup() {
    const { userId } = usePhase();
    const { profile, getUserProfile, updatePlan } = useProfile();

    onMounted(async () => {
      const id = userId.value;
      await getUserProfile(id);
    });

    const profilePlan = computed(() => {
      const { plan_name, frequency } = profile.value?.plan;
      const planMapping = {
        'Free': {
          'L': 0
        },
        'Pro': {
          'M': 1,
          'T': 2
        }
      };
      return planMapping[plan_name]?.[frequency] ?? 3;
    });

    const changePlan = async (frequency, amount) => {
      const id = userId.value;     
      const data = {
        frequency,
        amount
      }
      const result = await updatePlan(id, data);
      console.log(result);

      await getUserProfile(id);
    };

    return {
      profilePlan,
      changePlan
    };
  },
};
</script>

<style scoped>
/* General Container */
.plans-container {
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 90%;
  margin: 0 auto;
  border-radius: 12px;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
}

/* Titles */
.title {
  color: #6441A4;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 5px;
}

.subtitle {
  color: #777;
  font-size: 18px;
  margin-bottom: 30px;
}

.subtitle-2 {
  color: #6441A4;
  font-size: 20px;
  margin-top: 5px;
  margin-bottom: 20px;
  text-align: left; /* Alinea el texto a la izquierda */
  width: 100%;
}

/* Benefits Section */
.benefits-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px; /* Espacio entre los ítems */
  width: 100%;
  margin-bottom: 40px;
}

.benefit-item {
  display: flex;
  align-items: center;
  text-align: left;
  padding: 5px;
}

.benefit-item:nth-child(4) {
  grid-column: 1 / 2;
}

.benefit-item:nth-child(5) {
  grid-column: 2 / 3;
}

.benefit-icon {
  margin-right: 10px;
}

.benefit-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.benefit-description {
  color: #777;
  margin: 0;
}

/* Plan Cards Section */
.plans-options {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 30px;
}

.plan-card {
  background-color: white; /* Cambia el fondo de las cards a blanco */
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 20px;
  width: 30%;
  text-align: left; /* Alinea el texto (título y precio) a la izquierda */
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.plan-card:hover {
  transform: scale(1.03);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  background-color: #e9e3fa;
  border-color: #6a3eb5;
}

.plan-card:hover .plan-button { 
  background-color: #6a3eb5;
}

.plan-title {
  font-size: 25px;
  margin-bottom: 15px;
  color: #333;
  text-align: left;
}

.plan-price {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 15px;
  text-align: left;
}

.plan-button {
  background-color: #bbb;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 10px 25px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: block;
  width: 100%; 
  box-sizing: border-box;
  margin: 0 auto; 
}

/* Additional Information Section */
.additional-info {
  background-color: #e9e3fa;
  padding: 15px;
  border-radius: 10px;
  margin-top: 30px;
  width: 100%;
}

.additional-info p {
  color: #777;
  font-size: 14px;
}

/* Footer */
.footer {
  margin-top: 30px;
  font-size: 12px;
  color: #aaa;
}
</style>
