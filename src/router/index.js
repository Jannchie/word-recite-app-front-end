import Vue from "vue";
import VueRouter from "vue-router";
import data from "../data";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "欢迎",
    component: () => import("../views/Welcome.vue")
  },
  {
    path: "/sign",
    name: "注册",
    component: () => import("../views/SignIn.vue")
  },
  {
    path: "/login",
    name: "登陆",
    component: () => import("../views/Login.vue")
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
    path: "/settings",
    name: "设置",
    component: () => import("../views/Settings.vue")
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
router.afterEach(() => {
  // 没有登录且当前路径不为'/'
  if (undefined == data.state.login && router.app.$route.path != "/") {
    router.push("/");
  }
  if (
    false == data.state.login &&
    router.app.$route.path != "/" &&
    router.app.$route.path != "/sign" &&
    router.app.$route.path != "/login"
  ) {
    router.push("/sign");
  }
});
export default router;
