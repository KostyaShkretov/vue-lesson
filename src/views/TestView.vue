<template>
  <div class="test">
    <router-link :to="{ name: 'Home' }"> Главное меню </router-link>
    <h3>Узнаем какая вы личность?</h3>
    <div>
      <div v-if="isActive === false" class="test__preview">
        Правила просты. Отвечаем на вопросы от 1 до 5, где 1 — совсем не
        согласен / не нравится, 5 — полностью согласен / очень нравится.
        <button class="btn" @click="btnActive">Поехали</button>
      </div>
      <div v-else class="test__preview">
        <h4>Вопрос № {{ countQuestions }}</h4>
        <p>{{ questions[countQuestions - 1] }}</p>
        <div class="test__answers">
          <button
            class="btn--modif"
            v-for="i in answers"
            :key="i"
            @click="btnAswers(i)"
          >
            {{ i }}
          </button> 
        </div>
        {{ result }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      isLoading: false,
      isActive: false,
      result: "",
      countQuestions: 1,
      countAnswers: Array(10).fill(0),
      answers: 5,

      questions: [
        "Вам нравится быть в центре внимания?",
        "Вы легко заводите новые знакомства?",
        "Вы предпочитаете работать в одиночку, чем в команде?",
        "Вы часто беспокоитесь о своих ошибках?",
        "Вы склонны помогать другим, даже если это неудобно для вас?",
        "Вы любите пробовать новые вещи и испытывать новые впечатления?",
        "Вы организованы и любите планировать дела заранее?",
        "Вам легко справляться со стрессом?",
        "Вы склонны выражать свои эмоции открыто?",
        "Вы предпочитаете спокойные вечера дома шумным компаниям",
      ],
    };
  },
  props: {
    apiKey: {
      type: String,
      required: true,
    },
  },
  methods: {
    async sendTest() {
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
    btnActive() {
      this.isActive = true;
    },
    btnAswers(i) {
      this.countAnswers[this.countQuestions - 1] = i;
      if (this.countQuestions >= this.questions.length) {
        this.sendTest();
        return;
      }
      this.countQuestions++;
    },
  },
  computed: {
    prompt() {
      const person = this.questions
        .map((person, i) => `Вопрос ${i + 1}: ${person}\nОтвет: ${this.countAnswers[i]}`)
        .join("\n\n");
      return `Ты психолог. На основе ответов пользователя определи тип личности. где 1 — совсем не
        согласен / не нравится, 5 — полностью согласен / очень нравится. Данные  ${person} .Дай краткий психологический портрет.`;
    },
  },
};
</script>

<style scoped>
.test {
  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;
  gap: 10px;
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
.btn:hover,
.btn--modif:hover {
  background-color: #6e38f7;
  color: white;
}
.btn:disabled,
.btn--modif:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.btn--modif {
  width: 30px;
  padding: 8px 0;
  border-radius: 4px;
  border: 1px solid #6e38f7;
  cursor: pointer;
  background-color: white;
  color: #6e38f7;
  transition: background-color 0.3s;
}
.test__preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.test__answers {
  display: flex;
  gap: 5px;
}
</style>