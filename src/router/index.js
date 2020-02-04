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
    name: "用户中心",
    component: () => import("../views/User.vue")
  },
  {
    path: "/wordlist",
    name: "单词列表",
    component: () => import("../views/WordList.vue")
  },
  {
    path: "/word",
    name: "单词查询",
    component: () => import("../views/Word.vue")
  },
  {
    path: "/word/recite",
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
