<template>
  <v-bottom-navigation color="primary" shift app v-model="bottomNav" grow>
    <v-btn to="wordList" value="wordList">
      <span>词单广场</span>
      <v-icon>mdi-book-multiple</v-icon>
    </v-btn>
    <v-btn to="word" value="word">
      <span>单词查询</span>
      <v-icon>mdi-book-search</v-icon>
    </v-btn>
    <v-btn to="user" value="user">
      <span>个人中心</span>
      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
<script>
export default {
  data() {
    return {
      bottomNav: "wordList"
    };
  }
};
</script>
<style>
.v-item-group.v-bottom-navigation .v-btn.v-size--default {
  height: inherit;
  min-width: 80px;
  padding: inherit;
}
</style>