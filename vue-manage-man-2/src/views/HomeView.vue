<template>
  <el-row class="box">
    <el-col :span="8" style="padding-right: 10px;">
      <el-card class="box-card-info">
        <div class="user">
          <img src="@/assets/image/logo.jpg" alt="">
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间: <span>2022-11-01</span></p>
          <p>上次登录地点: <span>武汉</span></p>
        </div>
      </el-card>
      <el-card class="box-card-table">
        <el-table
            :data="tableData"
            style="width: 100%; ">
          <el-table-column
              v-for="(val, key) in colItems"
              :prop="key"
              :label="val">
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>

    <el-col :span="16" style="padding-left: 10px;">
      <div class="num">
        <el-card :body-style="{display: 'flex', padding: 0}" v-for="item in countData" :key="item.name">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="`background-color: ${item.color}`"></i>
          <div class="detail">
            <p class="price">{{ `￥` + item.value }}</p>
            <p class="desc">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px;">
        <div ref="echarts1" style="height: 280px;">
          <!-- 折线图 -->
        </div>
      </el-card>
      <div class="graph">
        <el-card>
          <div ref="echarts2" style="height: 260px">
            <!-- 柱状图 -->
          </div>
        </el-card>
        <el-card>
          <div ref="echarts3" style="height: 260px">

          </div>
        </el-card>
      </div>
    </el-col>

  </el-row>
</template>

<script>
import {getData} from "@/api"
import * as echarts from 'echarts'

export default {
  name: "HomeView",
  mounted() {
    getData().then(({data}) => {
      // console.log(this.$router)
      const {orderData, userData, videoData, tableData, countData} = data.data
      this.tableData = tableData
      this.countData = countData
      this.$nextTick(() => {
        // 折线图
        const echarts1 = echarts.init(this.$refs.echarts1)
        const xAxis1 = Object.keys(orderData.data[0])
        let series1 = []
        xAxis1.forEach(key => {
          series1.push({
            name: key,
            type: 'line',
            data: orderData.data.map(item => item[key])
          })
        })

        let option1 = {
          tooltip: {
            trigger: 'item'
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            data: orderData.date
          },
          yAxis: {},
          legend: {
            data: xAxis1
          },
          series: series1
        }
        echarts1.setOption(option1)

        // 柱状图
        const echarts2 = echarts.init(this.$refs.echarts2)

        const option2 = {
          legend: {
            textStyle: {
              color: "#333",
            }
          },
          grid: {
            left: "20%"
          },
          tooltip: {
            trigger: 'axis',
          },
          xAxis: {
            type: 'category',
            data: userData.map(item => item.date),
            axisLine: {
              lineStyle: {color: "#17b3a3"}
            },
            axisLabel: {
              interval: 0,
              color: "#333"
            }
          },
          yAxis: [
            {
              type: "value",
              axisLine: {
                lineStyle: {color: "#17b3a3"}
              },
            }
          ],
          color: ['#2ec7c9', '#b6a2de'],
          series: [
            {
              name: "新增用户",
              data: userData.map(item => item.new),
              type: 'bar'
            },
            {
              name: "活跃用户",
              data: userData.map(item => item.active),
              type: 'bar'
            }
          ]
        }
        echarts2.setOption(option2)


        // 饼状图
        const echarts3 = echarts.init(this.$refs.echarts3)
        const option3 = {
          tooltip: {
            trigger: 'item'
          },
          color: [
            '#0f78f4',
            '#dd536b',
            '#9462e5',
            '#a6a6a6',
            '#e1bb22',
            '#39c362',
            '#3ed1cf',
          ],
          series: [
            {
              data: videoData,
              type: 'pie'
            }
          ]
        }
        echarts3.setOption(option3)
      })

    })
  },
  data() {
    return {
      tableData: [],
      colItems: {
        name: "产品名称",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买"
      },
      countData: []
    }
  },
}
</script>

<style lang="less" scoped>
.box {
  height: 100%;

  .box-card-info {
    height: 45%;

    .user {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ccc;
      padding-bottom: 20px;

      img {
        margin-right: 40px;
        width: 150px;
        height: 150px;
        border-radius: 50%;
      }

      .userinfo {
        .name {
          font-size: 32px;
          margin-bottom: 10px;
        }

        .access {
          color: #999
        }
      }
    }

    .login-info {
      padding-top: 20px;

      p {
        line-height: 28px;
        font-size: 14px;
        color: #999;

        span {
          color: #666;
          margin-left: 60px;
        }

      }
    }
  }

  .box-card-table {
    margin-top: 20px;
    height: 50%
  }

  .num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    height: 12%;

    .el-card {
      width: 32%;
      margin-bottom: 20px;
    }

    .icon {
      height: 80px;
      width: 80px;
      font-size: 30px;
      text-align: center;
      line-height: 80px;
      color: #fff;
    }

    .detail {
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .price {
        font-size: 30px;
        margin-bottom: 10px;
        line-height: 30px;
        height: 30px;
      }

      .desc {
        font-size: 14px;
        color: #999;
        text-align: center;
      }
    }
  }

  .graph {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    .el-card {
      height: 280px;
      width: 48%;
    }
  }
}


</style>