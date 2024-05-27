<template>
  <div class="phase3-container">
    <h2 class="title">Más sobre ti</h2>
    <hr class="line">
    <div v-for="(question, index) in questions" :key="index" class="question">
      <p class="question-text">{{ question.text }}</p>
      <div class="response">
        <label v-for="i in 5" :key="i" class="radio-label">
          <input
            type="radio"
            :name="'question' + index"
            :value="i"
            v-model="answers[index]"
          />
          <span class="radio-custom">{{ i }}</span>
        </label>
      </div>
    </div>  
    <div class="button-container">
      <button @click="$emit('goToNextPhase')">Continuar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Phase3',
  data() {
    return {
      questions: [
        {
          text: 'Mente',
        },
        {
          text: 'Energía',
        },
        {
          text: 'Naturaleza',
        },
        {
          text: 'Tácticas',
        }
      ],
      answers: Array(4).fill(null),
    };
  },
  methods: {

  },
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
  border-top: 8px solid #8F6EE0; /* Color y grosor de la línea */
  margin-top: 10px;
  margin-bottom: 20px;
}

.question {
  margin-bottom: 20px;
}

.question-text {
  text-align: center;
  font-weight: bold;
  margin-bottom: 15px;
}

.response {
  display: flex;
  justify-content: space-around;
}

.radio-label {
  display: flex;
  align-items: center;
}

.radio-label input {
  display: none;
}

.radio-custom {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid #8F6EE0;
  color: #8F6EE0;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.radio-label input:checked + .radio-custom {
  background-color: #8F6EE0;
  color: #fff;
}

.radio-label input:focus + .radio-custom {
  box-shadow: 0 0 0 3px rgba(143, 110, 224, 0.5);
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
