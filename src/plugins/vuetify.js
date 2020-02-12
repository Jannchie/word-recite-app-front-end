import Vue from "vue";
import Vuetify from "vuetify/lib";
import zhHans from "vuetify/es5/locale/zh-Hans";
import data from "../data";
Vue.use(Vuetify);
if (window.localStorage.getItem("dark") == "true") {
  data.settings.dark = true;
}
export default new Vuetify({
  theme: {
    dark: data.settings.dark
  },
  lang: {
    locales: { zhHans },
    current: "zh-Hans"
  }
});
