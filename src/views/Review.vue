<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <w-card>
          <v-card-title>
            {{ listName }}
          </v-card-title>
          <v-card-subtitle> {{ listSubName }} </v-card-subtitle>

          <v-list dense rounded>
            <w-review-list-word
              v-for="(reciteRecord, i) in reciteRecords"
              :reciteRecord="reciteRecord"
              :key="i"
            >
            </w-review-list-word>
            <v-skeleton-loader
              v-intersect="onIntersect"
              type="list-item@2"
            ></v-skeleton-loader>
          </v-list>
        </w-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import data from "../data";
export default {
  data() {
    return {
      reciteRecords: [],
      page: 0,
      size: 30
    };
  },
  computed: {
    listName() {
      let name;
      data.user.myWordList.forEach(wordList => {
        if (this.$route.params.id == wordList.lid) {
          name = wordList.name;
          return;
        }
      });
      return name;
    },
    listSubName() {
      return this.$route.params.type == "review"
        ? "未完全掌握的单词"
        : "已完全掌握的单词";
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      let id = this.$route.params.id;
      let type = this.$route.params.type;
      this.axios
        .get(`/user/wordList/${type}?id=${id}&p=${this.page++}&ps=${this.size}`)
        .then(res => {
          res.data.forEach(e => {
            this.reciteRecords.push(e);
          });
        });
    },
    onIntersect() {
      if (this.reciteRecords.length != 0) {
        this.getData();
      }
    }
  }
};
</script>