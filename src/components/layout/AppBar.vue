<template>
  <v-app-bar style="background-blend-mode: lighten;" app>
    <v-toolbar-title style="min-width:40px">{{ pageTitle }}</v-toolbar-title>
    <v-text-field
      class="ml-4"
      solo
      outlined
      v-model="searchText"
      dense
      rounded
      flat
      hide-details
      label="搜索（开发中）"
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
      // console.log(this.searchText);
    }
  },
  computed: {
    pageTitle() {
      return this.$route.name;
    }
  }
};
</script>

<style>
.v-app-bar .v-toolbar__content {
  background: linear-gradient(60deg, #ffffff22, #ffffff11) !important;
}
</style>