<template>
  <div id="app">
    <!-- <div class="header">
      这里是标题栏
    </div> -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss" scoped>
.header{
  width:auto;
  height:6vh;
  background-color: rgb(85, 194, 221);
  position: fixed;
  top:0;
  z-index: 1000;
}
</style>
