<template>
  <v-app>
    <LayoutAppBar v-if="state.login == true"></LayoutAppBar>
    <v-content>
      <w-notification></w-notification>
      <router-view></router-view>
    </v-content>
    <LayoutBottomNav></LayoutBottomNav>
  </v-app>
</template>

<script>
import LayoutBottomNav from "./components/layout/BottomNav";
import LayoutAppBar from "./components/layout/AppBar";
import data from "./data";
export default {
  name: "App",
  components: { LayoutBottomNav, LayoutAppBar },
  data() {
    return { state: data.state };
  },
  mounted() {
    this.axios.get("/user/info").then(res => {
      data.alert.message = `欢迎回来，${res.data.username}~`;
      data.alert.display = true;
      data.alert.type = "green";
      data.state.login = true;
      if (res.data.myWordList == undefined) {
        res.data.myWordList = [];
      }
      if (["/", "/login", "/sign"].indexOf(this.$route.path) != -1) {
        this.$router.push(`/user`);
      }
      data.user = res.data;
      window.localStorage.setItem("dark", data.settings.dark);
    });
  },
  methods: {
    updateSettings() {
      this.axios.post(`/user/settings`, data.settings);
    }
  },
  watch: {
    "settings.dark"(val) {
      this.$vuetify.theme.dark = val;
      data.settings.dark = val;
      window.localStorage.setItem("dark", data.settings.dark);
      this.updateSettings();
    },
    "settings.autoPlayAudio"(val) {
      data.settings.autoPlayAudio = val;
      this.updateSettings();
    },
    "settings.wordsOfRound"(val) {
      data.settings.wordsOfRound = val;
      this.updateSettings();
    }
  },

  computed: {
    isGuest() {
      return !this.login;
    }
  }
};
</script>
<style>
.v-btn {
  background: linear-gradient(60deg, #ffffff44, #ffffff11) !important;
}
</style>