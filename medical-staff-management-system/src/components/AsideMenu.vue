<template>
  <div class="main">
    <!-- <h5>默认颜色</h5> -->
    <div class="head">
      <el-avatar size="medium" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
      <p class="info">
        <span class="name">秦天文</span>
        <span class="station">初级放射技师</span>
      </p>
    </div>
    <el-menu default-active="home" class="el-menu-vertical-demo">
      <el-menu-item @click="ShowPage(item)" v-for="item in menu" :key="item.name" :index="item.name">
        <i :class="`el-icon-${item.icon}`"></i>
        <span class="title" slot="title">{{ item.label }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "AsideMenu",
  data() {
    return {
      menu: [
        {
          path: "/home",
          name: "home",
          label: "首页",
          icon: "s-home",
          fileName: "Home/HomeView"
        },
        {
          path: "/staff",
          name: "staff",
          label: "人员",
          icon: "user-solid",
          fileName: "Staff/StaffView"
        },
        {
          path: "/organization",
          name: "organization",
          label: "组织",
          icon: "office-building",
          fileName: "Organization/OrganizationView"
        },
        {
          path: "/checkingIn",
          name: "checkingIn",
          label: "考勤",
          icon: "date",
          fileName: "CheckingIn/CheckingInView"
        },
        {
          path: "/approval",
          name: "approval",
          label: "审批",
          icon: "s-check",
          fileName: "Approval/ApprovalView"
        },
        {
          path: "/salary",
          name: "salary",
          label: "工资",
          icon: "bank-card",
          fileName: "Salary/SalaryView"
        },
        {
          path: "/performance",
          name: "performance",
          label: "绩效",
          icon: "data-line",
          fileName: "Performance/PerformanceView"
        },
        {
          path: "/recruitment",
          name: "recruitment",
          label: "招聘",
          icon: "s-order",
          fileName: "Recruitment/RecruitmentView"
        },
        {
          path: "/contract",
          name: "contract",
          label: "合同",
          icon: "tickets",
          fileName: "Contract/ContractView"
        }
      ]
    }
  },
  methods: {
    ShowPage(item) {
      this.$router.push(item.path);
    }
  }
}
</script>

<style scoped lang="less">
@maunWidth: 200px;

.main {
  overflow: hidden; // 解决塌陷问题
  min-height: 100vh;
  height: 100%;
  background-color: #fff;
  width: @maunWidth;

  .head {
    // width: 160px;
    padding: 0 20px;
    margin: 10px auto;
    display: flex;
    // justify-content: center;
    align-items: center;

    .info {
      margin-left: 10px;
      display: flex;
      flex-direction: column;

      .name {
        font-size: 16px;
        font-weight: 700;
      }

      .station {
        font-size: 12px;
        color: rgba(0, 0, 0, .6);
      }
    }
  }
}

.el-menu {
  width: @maunWidth;

  span {
    margin-left: 15px;
  }
}
</style>