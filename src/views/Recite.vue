<template>
  <v-container>
    <w-card v-show="!isStart"
      ><v-card-title>
        背诵计划
      </v-card-title>
      <v-card-subtitle>
        本次还剩{{ recite.words.length }}个单词
      </v-card-subtitle>
      <v-card-actions>
        <v-btn
          @click="start()"
          block
          color="primary"
          style="border-bottom-left-radius: 20px; border-bottom-right-radius:  20px"
          >开始背诵</v-btn
        >
      </v-card-actions>
    </w-card>
    <w-card v-show="finish"
      ><v-card-title>
        本次背诵已完成！
      </v-card-title>
      <v-card-actions>
        <v-btn
          @click="newTurn()"
          block
          color="primary"
          style="border-bottom-left-radius: 20px; border-bottom-right-radius:  20px"
          >再来一组</v-btn
        >
      </v-card-actions>
    </w-card>
    <w-card v-show="isStart && !finish">
      <v-card-subtitle> 还剩{{ recite.words.length }}个单词 </v-card-subtitle>
      <v-card-title>
        {{ currentWord.word }}
      </v-card-title>
      <v-sheet :hidden="!viewDef">
        <v-card-text>
          {{ currentWord.definition }}
        </v-card-text>
        <v-card-text>
          {{ currentWord.translation }}
        </v-card-text>
      </v-sheet>
      <v-sheet v-show="!viewDef">
        <v-card-actions>
          <v-btn @click.stop="switchViewDef()" block color="warning"
            ><v-icon left>mdi-card-text-outline</v-icon>查看释义</v-btn
          >
        </v-card-actions>
      </v-sheet>
      <v-card-actions v-show="!pass">
        <v-row dense>
          <v-col>
            <v-btn
              style="border-bottom-left-radius: 20px"
              block
              color="error"
              @click="setDiffcult(currentWord.id)"
              ><v-icon left>mdi-emoticon-dead</v-icon>我太难了</v-btn
            >
          </v-col>
          <v-col>
            <v-btn block color="primary" @click="setMastered(currentWord.id)">
              <v-icon> mdi-check-bold</v-icon></v-btn
            >
          </v-col>
          <v-col>
            <v-btn
              style="border-bottom-right-radius: 20px"
              block
              @click="setNeutral(currentWord.id)"
              color="success"
              >我太会了<v-icon right>mdi-emoticon-cool</v-icon></v-btn
            >
          </v-col>
        </v-row>
      </v-card-actions>
      <v-card-actions v-show="pass">
        <v-row dense>
          <v-col>
            <v-btn
              style="border-bottom-left-radius: 20px; border-bottom-right-radius: 20px"
              block
              @click="next()"
              color="primary"
              ><v-icon left>mdi-chevron-right</v-icon>下一个<v-icon right
                >mdi-chevron-left</v-icon
              ></v-btn
            >
          </v-col>
        </v-row>
      </v-card-actions>
    </w-card>
  </v-container>
</template>
<script>
import data from "../data";

export default {
  data() {
    return {
      recite: data.recite,
      isStart: false,
      currentWord: {},
      finish: false,
      pass: false,
      viewDef: false
    };
  },
  mounted() {
    if (data.recite.words.length == 0) {
      this.newTurn();
    }
  },
  methods: {
    newTurn() {
      this.axios
        .get(`/user/wordList/notReciteWord?id=${this.$route.params.id}`)
        .then(res => {
          data.recite.words = res.data;
          this.finish = false;
          this.isStart = false;
        });
    },
    start() {
      this.isStart = true;
      this.currentWord = data.recite.words.pop();
    },
    setNeutral(id) {
      this.axios.post(`/user/word/${id}/recite`);
      this.next();
    },
    setMastered(id) {
      this.axios.post(`/user/word/${id}/master`);
      this.next();
    },
    setDiffcult(id) {
      this.axios.post(`/user/word/${id}/forget`);
      if (this.viewDef == true) {
        this.next();
      } else {
        this.viewDef = true;
        this.pass = true;
      }
    },
    switchViewDef() {
      this.viewDef = !this.viewDef;
    },
    next() {
      this.viewDef = false;
      this.pass = false;
      if (data.recite.words.length == 0) {
        this.finish = true;
      } else {
        this.currentWord = data.recite.words.pop();
        data.state.needUpdateMyWordList = true;
      }
    }
  }
};
</script>