import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import EmodjiView from "@/views/EmodjiView.vue";
import PresentView from "@/views/PresentView.vue";
import DomenView from "@/views/DomenView.vue";
import GameView from "@/views/GameView.vue";
import TestView from "@/views/TestView.vue";

const apiKey = "AIzaSyBuZIRbLqApB34zapvGyjZpLbYNqLucrpM";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/emodji",
      name: "Emodji",
      component: EmodjiView,
      props: { apiKey: apiKey },
    },
    {
      path: "/present",
      name: "Present",
      component: PresentView,
      props: { apiKey: apiKey },
    },
    {
      path: "/domen",
      name: "Domen",
      component: DomenView,
      props: { apiKey: apiKey },
    },
    {
      path: "/game",
      name: "Game",
      component: GameView,
      props: { apiKey: apiKey },
    },
    {
      path: "/test",
      name: "Test",
      component: TestView,
      props: { apiKey: apiKey },
    },
  ],
});

export default router;
