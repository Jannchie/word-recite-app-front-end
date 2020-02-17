<template>
  <div class="center-content">
    <div>
      <v-progress-circular
        width="2"
        indeterminate
        color="primary"
      ></v-progress-circular>
      <p class="my-2 caption">载入用户数据中..</p>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style >
.center-content {
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>