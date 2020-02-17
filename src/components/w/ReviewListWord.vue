<template>
  <v-lazy min-height="50px">
    <v-list-item @click.stop="showReciteRecordDetail()">
      <v-list-item-content>
        <v-list-item-title>{{ reciteRecord.word.word }}</v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-flex>
          <v-btn @click.stop="setPass" :color="successColor" icon
            ><v-icon>mdi-check-circle-outline</v-icon></v-btn
          >
          <v-btn @click.stop="setFail" :color="errorColor" icon
            ><v-icon>mdi-close-circle-outline</v-icon></v-btn
          >
        </v-flex>
      </v-list-item-action>
      <v-bottom-sheet v-model="showDetail">
        <w-card
          style="border-bottom-right-radius: 0px;border-bottom-left-radius: 0px"
        >
          <v-card-title>
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
      this.state = true;
      this.axios.post(`/user/word/${this.reciteRecord.word.id}/recite`);
    },
    setFail() {
      this.state = false;
      this.axios.post(`/user/word/${this.reciteRecord.word.id}/forget`);
    }
  },
  props: { reciteRecord: Object },
  computed: {
    successColor() {
      switch (this.state) {
        case true:
          return "success";
        case false:
          return undefined;
        default:
          return undefined;
      }
    },
    errorColor() {
      switch (this.state) {
        case true:
          return undefined;
        case false:
          return "error";
        default:
          return undefined;
      }
    }
  }
};
</script>