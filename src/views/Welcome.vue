<template>
  <v-container>
    <v-row>
      <v-col>
        <w-card>
          <v-card-title>欢迎使用见齐单词</v-card-title>
          <v-card-subtitle>Welcome to Jannchie words</v-card-subtitle>
          <v-card-text
            >见齐单词是一个单词记忆APP。在开始使用之前，你需要注册一个账号来开始你的背诵之旅。
            <v-form>
              <v-text-field label="用户名"></v-text-field>
              <v-text-field type="password" label="密码"></v-text-field>
              <v-text-field
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

            <v-btn style="border-bottom-right-radius: 20px" color="primary">
              <v-icon left>mdi-account-badge-horizontal-outline</v-icon
              >注册</v-btn
            >
          </v-card-actions>
        </w-card>
      </v-col>
    </v-row>
  </v-container>
</template>