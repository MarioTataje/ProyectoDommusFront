<template>
  <div class="phase5-container">
    <h2 class="centered-title">Hábitos</h2>
    <div class="centered-content">
      <div class="question">
        <p>“Me gusta vivir en un ...”</p>
        <div class="options">
          <label><input type="radio" name="livingSpace" value="limpio"> Espacio Limpio</label>
          <label><input type="radio" name="livingSpace" value="desarreglado"> Espacio desarreglado</label>
          <label><input type="radio" name="livingSpace" value="indiferente"> Indiferente</label>
        </div>
      </div>
      <div class="question">
        <p>“Me voy a dormir ...”</p>
        <div class="options">
          <label><input type="radio" name="sleepTime" value="antes9"> Antes de las 9pm</label>
          <label><input type="radio" name="sleepTime" value="antesMedianoche"> Antes de media noche</label>
          <label><input type="radio" name="sleepTime" value="despuesMedianoche"> Después de media noche</label>
        </div>
      </div>
      <div class="question">
        <p>“Me levanto ...”</p>
        <div class="options">
          <label><input type="radio" name="wakeUpTime" value="antes8"> Antes de las 8am</label>
          <label><input type="radio" name="wakeUpTime" value="8-10am"> 8-10am</label>
          <label><input type="radio" name="wakeUpTime" value="10-12pm"> 10am - 12pm</label>
          <label><input type="radio" name="wakeUpTime" value="despues12"> Después de las 12pm</label>
        </div>
      </div>
      <div class="question">
        <p>“Me gusta que mi cuarto sea ...”</p>
        <div class="options">
          <label><input type="radio" name="roomPreference" value="tranquilo"> Tranquilo para estudiar</label>
          <label><input type="radio" name="roomPreference" value="social"> Un espacio para estar con mis amigos</label>
          <label><input type="radio" name="roomPreference" value="combinacion"> Una combinación de tranquilo y social</label>
        </div>
      </div>
      <div class="question">
        <p>“¿Eres fumador? & ¿Estas cómodo con un roommate fumador?”</p>
        <div class="options">
          <label><input type="radio" name="smoker" value="yes"> Yes</label>
          <label><input type="radio" name="smoker" value="no"> No</label>
        </div>
      </div>
      <div class="question">
        <p>“Espero estudiar en...?”</p>
        <div class="options">
          <label><input type="radio" name="studyPreference" value="miCuarto"> Mi cuarto</label>
          <label><input type="radio" name="studyPreference" value="fueraCuarto"> Fuera de mi cuarto</label>
          <label><input type="radio" name="studyPreference" value="ambos"> Ambos, fuera o dentro de mi cuarto</label>
        </div>
      </div>
      <button @click="handleContinue">Continuar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Phase5',
  methods: {
    handleContinue() {
      // Handle the continue action
    }
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
