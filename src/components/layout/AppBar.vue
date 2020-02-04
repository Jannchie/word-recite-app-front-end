<template>
  <v-app-bar app>
    <v-toolbar-title>Page title</v-toolbar-title>
    <v-text-field
      solo
      v-model="searchText"
      dense
      rounded
      flat
      hide-details
      label="搜索"
      prepend-inner-icon="mdi-magnify"
    />
  </v-app-bar>
</template>
<script>
import data from "../../data";
export default {
  data() {
    return { ...data };
  },
  watch: {
    searchText() {
      console.log(this.searchText);
    }
  }
};
</script>
