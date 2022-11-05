<template>
  <div class="header-container">
    <div class="l-content">
      <el-button @click="$store.commit('tab/collapseMenu')" icon="el-icon-menu" size="mini"></el-button>
      <!--      <el-breadcrumb separator-class="el-icon-arrow-right">-->
      <!--        <el-breadcrumb-item class="text">首页</el-breadcrumb-item>-->
      <!--      </el-breadcrumb>-->
      <el-breadcrumb class="text" separator="/">
        <el-breadcrumb-item v-for="item in tags" :key="item.path">
          {{ item.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown @command="handleClick">
        <span class="el-dropdown-link">
          <img class="user" src="@/assets/image/logo.jpg" alt=""/>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Cookie from "js-cookie";

export default {
  name: "HeaderMenu",
  computed: {
    ...mapState(
        {tags: state => state.tab.tabsList}
    )
  },
  methods: {
    handleClick(command) {
      if (command === 'logout') {
        Cookie.remove('token', {path: '/'})
        Cookie.remove('menu', {path: '/'})
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style scoped lang="less">

.header-container {
  padding: 0 20px;
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .text {
    color: #fff;
    padding-left: 20px;
  }

  .l-content {
    display: flex;
    align-items: center;

    ::v-deep .el-breadcrumb__item {
      .el-breadcrumb__inner {
        font-weight: normal;

        &.is-link {
          color: #666
        }
      }
    }
  }

  .r-content {
    .user {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }

}
</style>