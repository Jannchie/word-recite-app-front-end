import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "登陆",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/",
    name: "欢迎",
    component: () => import("../views/Welcome.vue")
  },
  {
    path: "/user",
    name: "个人",
    component: () => import("../views/User.vue")
  },
  {
    path: "/wordlist",
    name: "词单",
    component: () => import("../views/WordList.vue")
  },
  {
    path: "/word",
    name: "查词",
    component: () => import("../views/Word.vue")
  },
  {
    path: "/recite/:id",
    name: "单词背诵",
    component: () => import("../views/Recite.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
