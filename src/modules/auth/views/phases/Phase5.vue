<template>
  <div class="phase5-container">
    <h2 class="centered-title">Hábitos</h2>
    <div class="centered-content">
      <div v-for="(question, qIndex) in questions" :key="qIndex" class="question">
        <p>{{ question.text }}</p>
        <div class="options">
          <label v-for="(option, oIndex) in question.options" :key="oIndex">
            <input type="radio" :name="question.name" :value="option.value" v-model="answers[qIndex]" />
            {{ option.label }}
          </label>
        </div>
      </div>
      <button @click="handleContinue">Continuar</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import usePhase from '../../composables/usePhase';

export default {
  name: 'Phase5',
  setup() {
    const { user: userInfo, createUser } = usePhase();
    const router = useRouter()
    const user = ref({});

    const questions = ref([
      {
        text: '“Me gusta vivir en un ...”',
        name: 'livingSpace',
        options: [
          { label: 'Espacio Limpio', value: 'Me gusta vivir en un espacio limpio' },
          { label: 'Espacio desarreglado', value: 'Me gusta vivir en un espacio desarreglado' },
          { label: 'Indiferente', value: 'Me gusta vivir en un espacio indiferente' }
        ]
      },
      {
        text: '“Me voy a dormir ...”',
        name: 'sleepTime',
        options: [
          { label: 'Antes de las 9pm', value: 'Me voy a dormir antes de las 9am' },
          { label: 'Antes de media noche', value: 'Me voy a dormir antes de la media noche' },
          { label: 'Después de media noche', value: 'Me voy a dormir despues de la media noche' }
        ]
      },
      {
        text: '“Me levanto ...”',
        name: 'wakeUpTime',
        options: [
          { label: 'Antes de las 8am', value: 'Me levanto antes de las 8am' },
          { label: '8-10am', value: 'Me levanto entre las 8-10am' },
          { label: '10am - 12pm', value: 'Me levanto entre las 10am-12pm' },
          { label: 'Después de las 12pm', value: 'Me levanto despues de las 12pm' }
        ]
      },
      {
        text: '“Me gusta que mi cuarto sea ...”',
        name: 'roomPreference',
        options: [
          { label: 'Tranquilo para estudiar', value: 'Me gusta que mi cuarto sea tranquilo para estudiar' },
          { label: 'Un espacio para estar con mis amigos', value: 'Me gusta que mi cuarto sea un espacio para estar con mis amigos' },
          { label: 'Una combinación de tranquilo y social', value: 'Me gusta que mi cuarto sea una combinación de tranquilo y social' }
        ]
      },
      {
        text: '“¿Eres fumador? & ¿Estas cómodo con un roommate fumador?”',
        name: 'smoker',
        options: [
          { label: 'Yes', value: 'Soy fumador' },
          { label: 'No', value: 'No soy fumador' }
        ]
      },
      {
        text: '“Espero estudiar en...?”',
        name: 'studyPreference',
        options: [
          { label: 'Mi cuarto', value: 'Espero estudiar en mi cuarto' },
          { label: 'Fuera de mi cuarto', value: 'Espero estudiar fuera de mi cuarto' },
          { label: 'Ambos, fuera o dentro de mi cuarto', value: 'Espero estudiar en mi cuarto o fuera de mi cuarto' }
        ]
      }
    ]);

    const answers = ref(Array(questions.value.length).fill(''));

    const handleContinue = async() => {
      user.value.habits = answers.value.join(',');
      await createUser(user.value);
      router.push({ name: 'login' });
    };

    onMounted(() => {
      user.value = { ...userInfo.value };
    });

    return {
      questions,
      answers,
      user,
      handleContinue    
    };
  }
}
</script>

<style scoped>
.phase5-container {
  background: url('@/assets/backgrounds/global-background.png') no-repeat center center;
  background-size: cover;  
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(100vw - 400px);
  padding: 20px;
  border-radius: 15px;
  box-sizing: border-box;
}

.centered-title {
  color: #7e57c2;
  text-align: center;
  width: 100%;
  margin-top: 40px;
  margin-bottom: 20px;
}

.centered-content {
  margin: 0 auto;
  width: 80%;
  max-width: 80%;
}

.question {
  margin-bottom: 20px;
  text-align: left;
}

.question p {
  font-weight: bold;
}

.options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
}

label {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: background-color 0.3s, border-color 0.3s;
  cursor: pointer;

  white-space: normal;
  word-wrap: break-word;
}

label:hover {
  background-color: #f0f0f0;
  border-color: #b0b0b0;
}

input[type="radio"] {
  accent-color: #7e57c2;
}

button {
  background-color: #9c27b0;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  display: block;
  margin-left: auto;
}

button:hover {
  background-color: #7b1fa2;
}
</style>
