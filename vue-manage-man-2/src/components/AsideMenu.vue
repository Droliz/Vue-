<template>
  <el-menu default-active="1-4-1"
           class="el-menu-vertical-demo"
           @open="handleOpen"
           @close="handleClose"
           background-color="#545c64"
           text-color="#fff"
           active-text-color="#ffd04b"
           :collapse="isCollapse">
    <h3>{{ isCollapse ? "后台" : "通用后台管理" }}</h3>
    <el-menu-item @click="gotoPage(item)" v-for="item in noChildren" :index="item.name" :key="item.name">
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>

    <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>

      <el-menu-item @click="gotoPage(chi.path)" v-for="chi in item.children" :key="chi.name" :index="chi.name">
        <i :class="`el-icon-${chi.icon}`"></i>
        <span slot="title">{{ chi.label }}</span>
      </el-menu-item>

    </el-submenu>
  </el-menu>
</template>

<script>
import Cookie from "js-cookie";

export default {
  name: "AsideMenu",
  computed: {
    menuData() {
      return JSON.parse(Cookie.get('menu')) || this.$store.state.menu.menu
    },
    noChildren() {
      return this.menuData.filter(item => !item.children)
    },
    hasChildren() {
      return this.menuData.filter(item => item.children)
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse
    },
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    gotoPage(item) {
      if (this.$route.path !== item.path && !(this.$route.path === "/home" && item.path === "/")) {
        this.$router.push(item.path)
      }
      this.$store.commit("tab/selectMenu", item)
    }
  }
}
</script>

<style scoped lang="less">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  height: 100vh;
  margin: 0;

  border-right: none;
  border-bottom: none;

  h3 {
    line-height: 48px;
    color: #fff;
    text-align: center;
  }
}
</style>