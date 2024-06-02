<template>
  <div class="phase3-container">
    <h2 class="title">Más sobre ti</h2>
    <hr class="line">
    <div v-for="(question, index) in questions" :key="index" class="question">
      <p class="question-text">{{ question.text }}</p>
      <div class="response">
        <span class="percentage">{{ answers[index] }}%</span>
        <div class="progress-container">
          <span class="progress-text">Introvertido</span>
          <input type="range" min="0" max="100"
            v-model="answers[index]" class="slider" />
          <span class="progress-text">Extrovertido</span>
        </div>
      </div>
    </div>
    <div class="button-container">
      <button @click="handleSubmit">Continuar</button>
    </div>
  </div>
</template>

<script>
import { ref, getCurrentInstance } from 'vue';
import usePhase from '../../composables/usePhase';

export default {
  name: 'Phase3',
  setup() {
    const { updateUser } = usePhase();
    const questions = [
      { text: 'Mente' },
      { text: 'Energía' },
      { text: 'Naturaleza' },
      { text: 'Tácticas' }
    ];
    const answers = ref([0, 0, 0, 0]);
    const user = ref({});
    const { ctx } = getCurrentInstance();

    const handleSubmit = () => {
      const convertedAnswers = answers.value.map(value => parseFloat((parseInt(value) * 5 / 100).toFixed(1)));

      user.value.self_personality = {
        tag: 'positivo',
        mind: convertedAnswers[0],
        energy: convertedAnswers[1],
        nature: convertedAnswers[2],
        tactics: convertedAnswers[3],
        identity: 0.1
      };
      console.log('AKI');
      updateUser(user.value);
      ctx.$emit('goToNextPhase');
    };


    return {
      questions, 
      answers,
      user,
      handleSubmit    
    };
  }
};
</script>

<style>
.phase3-container {
  background-color: #fff;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(100vw - 400px);
  padding: 20px;
  border-radius: 15px;
  box-sizing: border-box;
}

.title {
  color: #8F6EE0;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
}

.line {
  width: 100%;
  border: none;
  border-top: 8px solid #8F6EE0;
  margin-top: 10px;
  margin-bottom: 20px;
}

.question {
  margin-bottom: 40px;
}

.question-text {
  text-align: center;
  font-weight: bold;
  margin-bottom: 15px;
}

.response {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.progress-container {
  margin-left: 30px;
  display: flex;
  align-items: center;
  width: 100%;
}

.progress-text {
  margin-right: 10px;
  color: #8F6EE0;
  font-weight: bold;
}

.percentage {
  margin-bottom: 5px;
  color: #8F6EE0;
  font-weight: bold;
}

.slider {
  margin: 0 15px;
  width: 70%;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

button {
  background-color: #7e57c2;
  color: #fff;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  text-decoration: underline;
  width: 100px;
}

button:hover {
  background-color: #5e35b1;
}
</style>
