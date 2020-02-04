<template>
  <v-app
    ><LayoutAppBar></LayoutAppBar>
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

  data: () => ({ ...data }),
  mounted() {
    this.axios.get("/user/info").then(res => {
      data.alert.message = `欢迎回来，${res.data.username} ~`;
      data.alert.display = true;
      data.alert.type = "green";
    });
  },
  methods: {}
};
</script>
<style>
.v-btn {
  background: linear-gradient(60deg, #ffffff11, #ffffff44) !important;
}
</style>