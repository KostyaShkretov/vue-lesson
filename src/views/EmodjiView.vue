<template>
  <div class="emodji">
    <router-link :to="{ name: 'Home' }"> Главное меню </router-link>
    <h3>Emoji по фильму</h3>

    <div>
      <input
        class="input"
        type="text"
        v-model="film"
        placeholder="Введите название фильмa"
      />

      <button @click="sendFilm" :disabled="isLoading" class="btn">
        Отправить
      </button>
    </div>
    <h3>{{ result }}</h3>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      film: "",
      result: "",
      isLoading: false,
    };
  },
  props: {
    apiKey: {
      type: String,
      required: true,
    },
  },
  computed: {
    prompt() {
      return `Напиши через пробел три эмодзи, которые ассоциируются с фильмом "${this.film}". Ответ должен быть только эмодзи ничего больше, но если пользователь ввел ерунду или фильма не существует укажи на это мягко`;
    },
  },
  methods: {
    async sendFilm() {
      this.isLoading = true;
      try {
        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${this.apiKey}`,
          {
            contents: [
              {
                parts: [
                  {
                    text: this.prompt,
                  },
                ],
              },
            ],
          }
        );
        this.result = response.data.candidates[0].content.parts[0].text;
      } catch (error) {
        alert(error);
      }
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
.emodji {
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