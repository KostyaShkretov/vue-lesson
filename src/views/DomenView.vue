<template>
  <div class="domen">
    <router-link :to="{ name: 'Home' }"> Главное меню </router-link>
    <h3>Выбор домена</h3>

    <div>
      <input
        class="input"
        type="text"
        v-model="film"
        placeholder="Введите ключевое слово"
      />

      <button @click="sendDomen" :disabled="isLoading" class="btn">
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
      value: "",
      result: "",
      isLoading: false,
    };
  },
  methods: {
    async sendDomen() {
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
      return `Сгенерируй 3 варианта для домена, синонимы, альтернативные сочетания слов и уникальные комбинации, помогая создать запоминающееся доменное имя, используй ${this.value} как ключевое слово .`;
    },
  },
};
</script>

<style scoped>
.domen {
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

  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-align: center;
}
.btn:hover {
  background-color: #6e38f7;
  color: white;
}
.input {
  width: 160px;
  padding: 8px 0;
  outline: none;
  margin-inline: 10px;
}
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>