import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import "./components";
import axios from "axios";
import vueAxios from "vue-axios";
import data from "./data";
axios.defaults.baseURL = process.env.VUE_APP_API_ROOT;
axios.defaults.withCredentials = true;
// 环境的切换
if (process.env.NODE_ENV == "development") {
  axios.defaults.baseURL = "//localhost:8081/api";
} else {
  axios.defaults.baseURL = "//47.94.252.158/api";
}

Vue.prototype.$alert = function(res) {
  let msg = res.data.msg;
  if (msg != undefined) {
    data.alert.message = res.data.msg;
    if (res.data.msg.indexOf("成功") != -1) {
      data.alert.type = "success";
    } else if (res.status < 300) {
      data.alert.type = "info";
    } else {
      data.alert.type = "error";
    }
    data.alert.display = true;
  }
};

axios.interceptors.response.use(
  function(response) {
    Vue.prototype.$alert(response);
    return response;
  },
  function(error) {
    Vue.prototype.$alert(error.response);
    return Promise.reject(error);
  }
);

Vue.use(vueAxios, axios);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
window.$data = data;
