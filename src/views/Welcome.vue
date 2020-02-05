<template>
  <v-container>
    <v-row>
      <v-col>
        <w-card>
          <v-card-title>欢迎使用见齐单词</v-card-title>
          <v-card-subtitle>Welcome to Jannchie words</v-card-subtitle>
          <v-card-text
            >见齐单词是一个单词记忆APP。在开始使用之前，你需要注册一个账号来开始你的背诵之旅。
            <v-form v-model="valid">
              <v-text-field
                v-model="username"
                :rules="[
                  () => username.length <= 12 || '用户名至多12位',
                  () => username.length >= 2 || '用户名至少2位'
                ]"
                label="用户名"
                required
              ></v-text-field>
              <v-text-field
                required
                v-model="password"
                :rules="[
                  () => password.length <= 20 || '密码至多20位',
                  () => password.length >= 6 || '密码至少6位'
                ]"
                type="password"
                label="密码"
              ></v-text-field>
              <v-text-field
                v-model="password2"
                required
                :rules="[
                  () => password.length <= 20 || '密码至多20位',
                  () => password.length >= 6 || '密码至少6位',
                  () => password == password2 || '需要输入相同的密码'
                ]"
                type="password"
                label="请再输入一次密码"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn to="/login"
              ><v-icon left>mdi-login-variant</v-icon
              >已有账号？点此登录！</v-btn
            >

            <v-btn
              :disabled="!valid"
              style="border-bottom-right-radius: 20px"
              color="primary"
              @click="signIn"
            >
              <v-icon left>mdi-account-badge-horizontal-outline</v-icon
              >注册</v-btn
            >
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
    return {
      valid: false,
      username: "",
      password: "",
      password2: ""
    };
  },
  methods: {
    signIn() {
      this.axios
        .post("/user/create", {
          username: this.username,
          password: this.password
        })
        .then(res => {
          console.log(res);

          data.user = res.data.data;
        });
    }
  }
};
</script>