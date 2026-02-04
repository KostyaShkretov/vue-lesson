<template>
  <div class="game">
    <router-link :to="{ name: 'Home' }"> Главное меню </router-link>
    <h3>Правда или ложь?</h3>
    <p>Выберите тему</p>
    <div 
    v-for="topic in topics" 
    :key="topic" 
    class="game__button">
      <div v-if="topic === ''">
        <input
          class="input"
          type="text"
          v-model="customTopic"
          placeholder="Своя тема"
        />
        <button 
        class="btn--modif" 
        @click="selectTopic(customTopic)">
        ➤</button>
      </div>
      <button class="btn" v-else @click="selectTopic(topic)">{{ topic }}</button>
    </div>
    <div></div>

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
      topics: ["Космос", "Спорт", "Животные", "Кулинария", "Любая", ""],
      customTopic: "",
      select: "",
      result: "",
      isLoading: false,
    };
  },
  methods: {
    async sendGame() {
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
    selectTopic(topic) {
        this.select = topic || this.customTopic;
        if (!this.select) return alert('Введите тему');
        this.sendGame();  
    },
  },
  computed: {
    prompt() {
      return `Игра правда или ложь. Ты генирируешь реальный и вымышленный факт на выбранную пользователем тему: ${this.select} а пользователь должен угадать правда это или ложь,`;
    },
  },
};
</script>

<style scoped>
.game {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
}
.game__button {
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
  right: 10px;
  overflow: hidden;
  width: 20px;
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
.input {
  width: 100px;
  padding: 8px 0;
  outline: none;
  margin-inline: 10px;
  border: 1px solid #6e38f7;
  border-radius: 4px;
}
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>