<template>
  <v-app-bar style="background-blend-mode: lighten;" app>
    <v-app-bar-nav-icon to="/user" v-if="$route.path.indexOf('recite') != -1">
      <v-icon>mdi-arrow-left-bold</v-icon>
    </v-app-bar-nav-icon>
    <v-toolbar-title
      :style="
        search.searching
          ? `max-width:0%; transition:all 0.2s;`
          : `max-width:100%; transition:all 0.3s;`
      "
      >{{ pageTitle }}
    </v-toolbar-title>

    <v-text-field
      id="search-field"
      v-if="$route.path.indexOf('recite') == -1"
      solo
      :style="
        search.searching
          ? `max-width:100% ;transition:all 0.2s; margin-left: auto;`
          : `max-width:150px ;transition:all 0.3s; margin-left: auto;`
      "
      outlined
      v-model="search.searchText"
      @focus.stop="doSearch"
      dense
      rounded
      flat
      hide-details
      label="搜索"
      :prepend-inner-icon="search.searching ? `mdi-arrow-left` : `mdi-magnify`"
      @click:prepend-inner="hiddenSearch"
    />
  </v-app-bar>
</template>
<script>
import data from "../../data";
export default {
  data() {
    return { search: data.search };
  },
  methods: {
    doSearch() {
      data.search.searching = true;
      document.getElementById("search-field").focus();
      console.log("searching..");
    },
    hiddenSearch() {
      if (this.search.searching) {
        this.search.searching = !this.search.searching;
        document.getElementById("search-field").blur();
      } else {
        document.getElementById("search-field").focus();
      }
    }
  },
  watch: {
    "search.searchText"(val) {
      this.axios.get(`/word/list?p=1&ps=10&kw=${val}`).then(res => {
        data.search.items = res.data;
      });
      console.log(data.search.searchText);
    }
  },
  computed: {
    pageTitle() {
      return this.$route.name;
    }
  }
};
</script>
