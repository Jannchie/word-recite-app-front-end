<template>
  <v-app>
    <LayoutAppBar v-if="state.login === true"></LayoutAppBar>
    <v-content>
      <w-notification></w-notification>
      <v-slide-y-transition mode="out-in">
        <router-view></router-view>
      </v-slide-y-transition>
    </v-content>
    <LayoutBottomNav
      v-if="state.login === true && $route.path.indexOf('/recite') == -1"
    ></LayoutBottomNav>
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
    return { state: data.state, settings: data.settings };
  },
  mounted() {
    this.axios
      .get("/user/info")
      .then(res => {
        data.alert.message = `欢迎回来，${res.data.username}~`;
        data.alert.display = true;
        data.alert.type = "green";
        data.state.login = true;
        if (res.data.myWordList == undefined) {
          res.data.myWordList = [];
        }
        data.user = res.data;
        console.log(res.data.settings);

        Object.keys(res.data.settings).forEach(e => {
          this.settings[e] = res.data.settings[e];
        });
        window.localStorage.setItem("dark", data.settings.dark);
        if (this.$route.path != "/user") {
          this.$router.push(`/user`);
        }
      })
      .catch(() => {
        if (this.$route.path != "/sign") {
          this.$router.push(`/sign`);
        }
        data.state.login = false;
      });
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
  methods: {
    updateSettings() {
      this.axios.post(`/user/settings`, data.settings);
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
  background: linear-gradient(60deg, #ffffff22, #ffffff11) !important;
}
</style>