<template>
  <v-container>
    <v-row>
      <v-col>
        <w-card>
          <v-card-title>
            {{ user.username }}
          </v-card-title>
          <v-card-subtitle>EXP: {{ user.exp }}</v-card-subtitle>
        </w-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <w-card>
          <v-card-title>我的词单</v-card-title>
          <v-card-subtitle v-if="!hasWordList">
            您暂时没有词单哦~
          </v-card-subtitle>
          <v-card-actions v-if="!hasWordList">
            <v-btn
              to="/wordList"
              style="border-bottom-left-radius: 20px"
              color="primary"
              ><v-icon left>mdi-book-plus</v-icon>立即添加！</v-btn
            >
          </v-card-actions>
          <v-divider></v-divider>
          <v-list-item v-for="(each, index) in user.myWordList" :key="index">
            <v-list-item-content>
              <v-list-item-title>{{ each.name }}</v-list-item-title>
              <v-row dense>
                <v-col
                  v-for="eachIdx in [
                    [each.info.count, '总数', 'primary'],
                    [each.info.mastered, '已掌握', 'success'],
                    [each.info.reciting, '背诵中', 'warning']
                  ]"
                  :key="eachIdx[0]"
                  :cols="4"
                >
                  <v-row dense>
                    <v-col
                      :class="`${eachIdx[2]}--text caption font-weight-black`"
                      :cols="12"
                    >
                      {{ eachIdx[1] }}
                    </v-col>
                    <v-col :cols="12">
                      {{ eachIdx[0] }}
                      <span
                        class="grey--text subheading"
                        v-if="eachIdx[1] == '已掌握'"
                        >({{
                          (
                            (each.info.mastered / each.info.count) *
                            100
                          ).toFixed(2)
                        }}%)</span
                      >
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-card-actions style="padding: 0px">
                <v-row dense>
                  <v-col>
                    <v-btn block color="primary" :to="`/recite/${each.lid}`"
                      ><v-icon left>mdi-book-plus-multiple</v-icon>学习</v-btn
                    >
                  </v-col>
                  <v-col>
                    <v-btn block color="success"
                      ><v-icon left>mdi-book-search-outline</v-icon>查看</v-btn
                    >
                  </v-col>
                  <v-col>
                    <v-btn block color="warning"
                      ><v-icon left>mdi-book-minus-multiple</v-icon>复习</v-btn
                    >
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-list-item-content>
          </v-list-item>
        </w-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import data from "../data";
export default {
  data() {
    return data;
  },
  computed: {
    hasWordList() {
      return this.user.myWordList.length != 0;
    }
  },
  mounted() {
    if (this.state.needUpdateMyWordList == true) {
      this.axios.get("/user/info").then(res => {
        this.user = res.data;
        this.state.needUpdateMyWordList = false;
      });
    }
  }
};
</script>