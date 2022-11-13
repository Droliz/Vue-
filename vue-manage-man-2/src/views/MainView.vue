<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="auto">
        <!--  width="200px" -->
        <aside-menu />
      </el-aside>
      <el-container>
        <el-header>
          <header-menu />
        </el-header>
        <tag-box />
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AsideMenu from "@/components/AsideMenu";
import HeaderMenu from "@/components/HeaderMenu";
import TagBox from "@/components/TagBox";

export default {
  name: "MainView",
  components: {
    AsideMenu,
    HeaderMenu,
    TagBox
  }
}
</script>

<style scoped lang="less">
.el-header {
  padding: 0;
}

.common-layout {
  height: 100%;

  .el-aside {
    min-height: 100vh;
    background-color: #545c64;
  }
}
</style>