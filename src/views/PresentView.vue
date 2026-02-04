
Вы сказали:
<template>
  <div class="present">
    <router-link :to="{ name: 'Home' }"> Главное меню </router-link>
    <h3>Выбор подарков</h3>

    <div v-if="currentStep < questions.length">
      <div class="present__button">
        <label>{{ questions[currentStep].label }}</label> 
        <input
          class="input"
          v-if="
            questions[currentStep].type === 'text' ||
            questions[currentStep].type === 'number'
          "
          :type="questions[currentStep].type"
          v-model="answers[currentStep]"
          placeholder="Введите значение"
        />
        <select
          class="select"
          v-else-if="questions[currentStep].type === 'select'"
          v-model="answers[currentStep]"
        >
          <option disabled value="">Пол</option>
          <option
            v-for="option in questions[currentStep].options"
            :key="option"
          >
            {{ option }}
          </option>
        </select> 
        <button v-if="currentStep > 0" @click="backStep" class="btn btn--back"> ← </button>
        <button @click="nextStep" class="btn btn--modif">далее</button>
      </div>
    </div>
    <div v-else>
      <button class="btn" @click="sendForm" :disabled="isLoading">
        Отправить
      </button>
    </div>
    <h3>{{ result }}</h3>
  </div>
</template> 

<script>
import axios from "axios";
export default {
  props: {
    apiKey: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      questions: [
        { label: "Введите возраст", type: "number" },
        {
          label: "Выберите пол",
          type: "select",
          options: ["Мужской", "Женский"],
        },
        { label: "Введите хобби", type: "text" },
        { label: "Бюджет в тенге", type: "number" },
      ],
      answers: ["", "", "", ""],
      currentStep: 0,
      isLoading: false,
      result: "",
    };
  },
  methods: {
    backStep() {
      if (this.currentStep > 0) {
        this.currentStep--;
      }
    },
    nextStep() {
      if (
        this.answers[this.currentStep] === "" ||
        this.answers[this.currentStep] === null
      ) {
        alert("Заполните пожалуйста поле");
        return;
      }
      this.currentStep++;
    },
    async sendForm() {
      this.isLoading = true;
      try {
        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${this.apiKey}`,
          {
            contents: [{ parts: [{ text: this.prompt }] }],
          }
        );
        this.result = response.data.candidates[0].content.parts[0].text;
      } catch (error) {
        alert(error);
      }
      this.isLoading = false;
    },
  },
  computed: {
    prompt() {
      const [age, gender, hobby, budget] = this.answers;
      return `Напиши три подходящих ответа через запятую, которые подходят по параметрам пользователя: Возвраст ${age}, Пол: ${gender}, Хобби: ${hobby}, Бюджет до: ${budget} тенге. `;
    },
  },
};
</script>

<style scoped>
.present {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
}
.select {
  width: 260px;
  padding: 8px 12px;
  outline: none;
  margin-inline: 10px;  
}
.present__button {
  position: relative;
}
.btn {
  width: 100px;
  padding: 8px 0;
  border-radius: 4px;
  border: 1px solid #6e38f7;
  cursor: pointer;
  background-color: white;
  color: #6e38f7;
  transition: background-color 0.3s;
}
.btn--modif {
  position: absolute;
  height: 100%;
  right: 0;
  font-size: 12px;
  overflow: hidden;
  text-align: center;
}
.btn:hover {
  background-color: #6e38f7;
  color: white;
}
.btn--back {  
  position: absolute;
  height: 100%;
  right: 100px;
  width: 20px; 
  font-size: 16px;
  text-align: center;
  padding: 0;
}
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.input {
  width: 260px;
  padding: 8px 12px;
  outline: none;
  margin-inline: 10px;
  
}
</style>