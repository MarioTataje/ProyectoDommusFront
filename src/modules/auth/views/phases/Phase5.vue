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
          { label: 'Espacio Limpio', value: 'limpio' },
          { label: 'Espacio desarreglado', value: 'desarreglado' },
          { label: 'Indiferente', value: 'indiferente' }
        ]
      },
      {
        text: '“Me voy a dormir ...”',
        name: 'sleepTime',
        options: [
          { label: 'Antes de las 9pm', value: 'antes9' },
          { label: 'Antes de media noche', value: 'antesMedianoche' },
          { label: 'Después de media noche', value: 'despuesMedianoche' }
        ]
      },
      {
        text: '“Me levanto ...”',
        name: 'wakeUpTime',
        options: [
          { label: 'Antes de las 8am', value: 'antes8' },
          { label: '8-10am', value: '8-10am' },
          { label: '10am - 12pm', value: '10-12pm' },
          { label: 'Después de las 12pm', value: 'despues12' }
        ]
      },
      {
        text: '“Me gusta que mi cuarto sea ...”',
        name: 'roomPreference',
        options: [
          { label: 'Tranquilo para estudiar', value: 'tranquilo' },
          { label: 'Un espacio para estar con mis amigos', value: 'social' },
          { label: 'Una combinación de tranquilo y social', value: 'combinacion' }
        ]
      },
      {
        text: '“¿Eres fumador? & ¿Estas cómodo con un roommate fumador?”',
        name: 'smoker',
        options: [
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' }
        ]
      },
      {
        text: '“Espero estudiar en...?”',
        name: 'studyPreference',
        options: [
          { label: 'Mi cuarto', value: 'miCuarto' },
          { label: 'Fuera de mi cuarto', value: 'fueraCuarto' },
          { label: 'Ambos, fuera o dentro de mi cuarto', value: 'ambos' }
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
  background-color: #fff;
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
