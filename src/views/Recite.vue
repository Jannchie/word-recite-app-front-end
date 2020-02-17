<template>
  <v-container>
    <w-card v-show="!isStart" key="start"
      ><v-card-title>
        背诵计划
      </v-card-title>

      <v-card-subtitle v-if="settings.wordsOfRound == -1">
        本次背诵了{{ count }}个单词
      </v-card-subtitle>

      <v-card-subtitle v-else>
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
    <w-card v-show="finish" key="finish"
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
    <v-fade-transition>
      <w-card v-show="isStart && !finish" key="progress" class="recite-card">
        <v-card-subtitle v-if="settings.wordsOfRound == -1">
          本次背诵了{{ count }}个单词
        </v-card-subtitle>

        <v-card-subtitle v-else>
          本次还剩{{ recite.words.length }}个单词
        </v-card-subtitle>
        <v-card-title>
          {{ currentWord.word }}
          <v-btn @click.stop="playAudio()" icon>
            <v-icon> mdi-volume-high </v-icon></v-btn
          >
        </v-card-title>
        <v-fade-transition hide-on-leave mode="in-out">
          <v-card-text key="def" v-show="viewDef" style="white-space: pre-line">
            <p>
              {{ currentWord.definition }}
            </p>
            <p>
              {{ currentWord.translation }}
            </p>
          </v-card-text>
        </v-fade-transition>
        <v-fade-transition mode="out-in">
          <v-sheet key="act" v-show="!viewDef">
            <v-card-actions>
              <v-btn text @click.stop="switchViewDef()" block color="warning"
                ><v-icon left>mdi-card-text-outline</v-icon>查看释义</v-btn
              >
            </v-card-actions>
          </v-sheet>
        </v-fade-transition>

        <v-card-actions style="position: absolute; width:100% ;bottom:0px">
          <v-row dense v-show="!pass">
            <v-col>
              <v-btn
                style="border-bottom-left-radius: 20px"
                block
                color="error"
                @click="setDiffcult(currentWord.id)"
                ><v-icon left>mdi-emoticon-dead</v-icon>我太难了</v-btn
              >
            </v-col>
            <v-col cols="3">
              <v-btn
                block
                dark
                color="primary"
                @click="setMastered(currentWord.id)"
              >
                <v-icon>mdi-check-bold</v-icon>
              </v-btn>
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
          <v-row dense v-show="pass">
            <v-col>
              <v-btn
                block
                @click="next()"
                color="primary"
                style="border-bottom-right-radius: 20px;border-bottom-left-radius: 20px"
                ><v-icon left>mdi-chevron-right</v-icon>下一个<v-icon right
                  >mdi-chevron-left</v-icon
                ></v-btn
              >
            </v-col>
          </v-row>
        </v-card-actions>
      </w-card>
    </v-fade-transition>
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
      viewDef: false,
      count: 0,
      audio: new Audio(),
      settings: data.settings
    };
  },
  mounted() {
    if (data.recite.words.length == 0) {
      this.newTurn();
    }
  },
  methods: {
    playAudio() {
      this.audio.src = `http://dict.youdao.com/dictvoice?type=0&audio=${this.currentWord.word}`;
      this.audio.play();
    },
    newTurn() {
      let size = this.settings.wordsOfRound;
      if (this.settings.wordsOfRound == -1) {
        size = 100;
      }
      this.axios
        .get(
          `/user/wordList/notReciteWord?id=${this.$route.params.id}&size=${size}`
        )
        .then(res => {
          data.recite.words = res.data;
          this.finish = false;
          this.isStart = false;
        });
    },
    start() {
      this.isStart = true;
      this.currentWord = data.recite.words.pop();
      if (data.settings.autoPlayAudio) {
        this.playAudio();
      }
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
      this.count++;
      this.viewDef = false;
      this.pass = false;
      let length = data.recite.words.length;
      if (length == 0) {
        this.finish = true;
      } else {
        this.currentWord = data.recite.words.pop();
        if (this.settings.wordsOfRound == -1 && length == 80) {
          this.axios
            .get(
              `/user/wordList/notReciteWord?id=${this.$route.params.id}&size=100`
            )
            .then(res => {
              data.recite.words = res.data;
            });
        }
        data.state.needUpdateMyWordList = true;
        this.playAudio();
      }
    }
  }
};
</script>
<style scoped>
.recite-card {
  position: absolute;
  top: 8px;
  bottom: 8px;
  left: 0px;
  right: 0px;
}
</style>