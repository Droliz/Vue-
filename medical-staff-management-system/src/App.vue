<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="less">
* {
  padding: 0;
  margin: 0;
  //box-sizing: border-box;
  font-family: "YongZhongFangSong-2";
}

#app {
  min-height: 100vh;
  height: 100%;
  background-color: #ECEDF6;
}
</style>