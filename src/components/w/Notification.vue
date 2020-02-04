<template>
  <VSnackbar v-model="snackbar" top :color="color" style="z-index:10">
    {{ message }}
    <VBtn color="write" text @click.stop="display = false">
      close
    </VBtn>
  </VSnackbar>
</template>
<script>
import data from "../../data";
export default {
  data() {
    return data.alert;
  },
  computed: {
    snackbar: {
      get() {
        return this.display;
      },
      set(val) {
        this.display = val;
      }
    },
    color() {
      return this.type;
    }
  }
};
</script>
<style>
.v-snack__content {
  background: linear-gradient(60deg, #ffffff44, #ffffff11) !important;
}
</style>
