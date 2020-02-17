<template>
  <v-lazy min-height="50px">
    <v-list-item @click.stop="showReciteRecordDetail()">
      <v-list-item-content>
        <v-list-item-title :class="`${this.wordColor}--text`">{{
          reciteRecord.word.word
        }}</v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-flex>
          <v-btn
            v-if="$route.params.type != 'mastered'"
            @click.stop="setMastered"
            :color="primaryColor"
            icon
            ><v-icon>mdi-check-bold</v-icon></v-btn
          >
          <v-btn
            v-if="$route.params.type != 'mastered'"
            @click.stop="setPass"
            :color="successColor"
            icon
            ><v-icon>mdi-emoticon-cool-outline</v-icon></v-btn
          >
          <v-btn @click.stop="setFail" :color="errorColor" icon
            ><v-icon>mdi-emoticon-dead-outline</v-icon></v-btn
          >
        </v-flex>
      </v-list-item-action>
      <v-bottom-sheet v-model="showDetail">
        <w-card
          style="border-bottom-right-radius: 0px;border-bottom-left-radius: 0px"
        >
          <v-card-title :class="`${this.wordColor}--text`">
            {{ reciteRecord.word.word }}
          </v-card-title>
          <v-card-text>
            上次背诵: {{ reciteRecord.lastReciteTime }}
            <br />
            熟练度：{{ reciteRecord.skillExp }}%
          </v-card-text>
          <v-card-text style="white-space: pre-line">
            <p>
              {{ reciteRecord.word.definition }}
            </p>
            <p>
              {{ reciteRecord.word.translation }}
            </p>
          </v-card-text>
          <v-card-actions>
            <v-btn block text @click="showDetail = false"
              ><v-icon>mdi-chevron-right</v-icon>close<v-icon
                >mdi-chevron-left</v-icon
              ></v-btn
            >
          </v-card-actions>
        </w-card>
      </v-bottom-sheet>
    </v-list-item>
  </v-lazy>
</template>

<script>
export default {
  data() {
    return {
      showDetail: false,
      state: undefined,
      page: 0,
      pageSize: 30
    };
  },
  watch: {
    state(val) {
      console.log(val);
    }
  },
  methods: {
    showReciteRecordDetail() {
      console.log(this.reciteRecord);
      this.showDetail = true;
    },
    setPass() {
      this.state = 1;
      this.axios.post(`/user/word/${this.reciteRecord.word.id}/recite`);
    },
    setFail() {
      this.state = 0;
      this.axios.post(`/user/word/${this.reciteRecord.word.id}/forget`);
    },
    setMastered() {
      this.state = 2;
      this.axios.post(`/user/word/${this.reciteRecord.word.id}/master`);
    }
  },
  props: { reciteRecord: Object },
  computed: {
    wordColor() {
      switch (this.state) {
        case 2:
          return "primary";
        case 1:
          return "success";
        case 0:
          return "error";
        default:
          return undefined;
      }
    },
    successColor() {
      switch (this.state) {
        case 1:
          return "success";
        default:
          return undefined;
      }
    },
    primaryColor() {
      switch (this.state) {
        case 2:
          return "primary";
        default:
          return undefined;
      }
    },
    errorColor() {
      switch (this.state) {
        case 0:
          return "error";
        default:
          return undefined;
      }
    }
  }
};
</script>