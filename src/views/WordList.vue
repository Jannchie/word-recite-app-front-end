<template>
  <v-container>
    <v-row v-for="eachWordList in wordList" :key="eachWordList.lid">
      <v-col>
        <w-card>
          <v-card-title>{{ eachWordList.name }}</v-card-title>
          <v-card-subtitle>{{ eachWordList.desc }}</v-card-subtitle>
          <v-card-subtitle>上传人:{{ eachWordList.creator }}</v-card-subtitle>
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
        console.log(data.wordList);
      });
    }
  }
};
</script>
