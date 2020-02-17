<template>
  <v-fab-transition origin="top right 0">
    <v-card
      elevation="20"
      id="search-card"
      v-if="search.searching"
      :style="`position: absolute;  width: 100%; top:0; z-index:2`"
    >
      <v-card-title>搜索</v-card-title>
      <v-list>
        <v-list-item v-for="(item, i) in search.items" :key="i">
          {{ item }}
        </v-list-item>
      </v-list>
    </v-card>
  </v-fab-transition>
</template>
<script>
import data from "../../data";
export default {
  data() {
    return { search: data.search };
  },
  mounted() {}
};
</script>