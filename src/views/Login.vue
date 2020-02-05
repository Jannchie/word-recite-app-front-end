<template>
  <v-container>
    <v-row>
      <v-col>
        <w-card class="elevation-10">
          <v-card-title>欢迎使用见齐单词</v-card-title>
          <v-card-subtitle>Welcome to Jannchie words</v-card-subtitle>
          <v-card-text
            >见齐单词是一个单词记忆APP。在开始使用之前，你需要注册一个账号来开始你的背诵之旅。
            <v-form v-model="valid">
              <v-text-field
                v-model="user.username"
                label="用户名"
                :rules="[
                  () => username.length <= 12 || '用户名至多12位',
                  () => username.length >= 2 || '用户名至少2位'
                ]"
              ></v-text-field>
              <v-text-field
                v-model="user.password"
                type="password"
                label="密码"
                :rules="[
                  () => password.length <= 20 || '密码至多20位',
                  () => password.length >= 6 || '密码至少6位'
                ]"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn :disabled="!valid" @click="getUserData" color="primary">
              <v-icon left>mdi-login-variant</v-icon>登录</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </w-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import data from "../data";
export default {
  data() {
    return { ...data, valid: false };
  },
  methods: {
    getUserData() {
      this.axios
        .post("/user/login", {
          username: this.user.username,
          password: this.user.password
        })
        .then(res => {
          data.user.username = res.data.username;
          data.user.exp = res.data.exp;
          data.user.myWordList = res.data.myWordList;
        });
    }
  }
};
</script>