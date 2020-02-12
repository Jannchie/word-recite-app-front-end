<template>
  <v-bottom-navigation color="primary" shift app :input-value="login" grow>
    <v-btn to="/wordList" value="wordList">
      <span>词单广场</span>
      <v-icon>mdi-book-multiple</v-icon>
    </v-btn>
    <v-btn to="/user" value="user">
      <span>个人中心</span>
      <v-icon>mdi-account</v-icon>
    </v-btn>
    <v-btn to="/settings" value="settings">
      <span>设置</span>
      <v-icon>mdi-settings</v-icon>
    </v-btn>
    <!-- <v-btn to="/word" value="word">
      <span>单词查询</span>
      <v-icon>mdi-book-search</v-icon>
    </v-btn> -->
  </v-bottom-navigation>
</template>
<script>
import data from "../../data";
export default {
  data() {
    return data.state;
  }
};
</script>
<style>
.v-item-group.v-bottom-navigation .v-btn.v-size--default {
  height: inherit;
  min-width: 80px;
  padding: inherit;
  background: #00000000 !important;
}
</style>