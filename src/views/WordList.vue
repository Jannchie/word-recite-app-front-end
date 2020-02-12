<template>
  <v-container>
    <v-row v-for="eachWordList in wordList" :key="eachWordList.lid">
      <v-col>
        <w-card>
          <v-card-title>{{ eachWordList.name }}</v-card-title>
          <v-card-subtitle>上传人:{{ eachWordList.creator }}</v-card-subtitle>
          <v-card-actions>
            <v-btn
              v-if="unRecite(eachWordList.lid)"
              @click="add(eachWordList.lid)"
              style="border-bottom-left-radius: 20px"
              color="primary"
              ><v-icon left>mdi-book-plus</v-icon>开始背诵</v-btn
            >
            <v-btn
              v-else
              @click="del(eachWordList.lid)"
              style="border-bottom-left-radius: 20px"
              color="error"
              ><v-icon left>mdi-calendar-check</v-icon>暂停背诵</v-btn
            >
            <v-spacer key="spacer"></v-spacer>
            <v-chip
              v-if="unRecite(eachWordList.lid)"
              outlined
              color="grey"
              style="padding: 8px;padding-right: 12px"
              dark
            >
              <v-icon>mdi-record</v-icon>
              未背诵</v-chip
            >
            <v-chip
              v-else
              outlined
              style="padding: 8px;padding-right: 12px"
              color="green"
              dark
            >
              <v-icon>mdi-record</v-icon>
              背诵中</v-chip
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
    return { ...data };
  },
  mounted() {
    if (data.wordList.length == 0) {
      this.axios.get("/wordList").then(res => {
        res.data.forEach(e => {
          data.wordList.push(e);
        });
      });
    }
  },
  methods: {
    add(lid) {
      this.axios.post(`/user/wordList/${lid}`).then(res => {
        this.user.myWordList.push(res.data.data);
      });
    },
    del(lid) {
      this.user.myWordList = this.user.myWordList.filter(e => e.lid != lid);
      this.axios.delete(`/user/wordList/${lid}`);
    },
    unRecite(lid) {
      return this.user.myWordList.map(e => e.lid).indexOf(lid) == -1;
    }
  }
};
</script>
