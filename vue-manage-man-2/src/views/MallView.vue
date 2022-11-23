<template>
  <div class="mall-main">
    <div v-for="mall in mallList" class="mall-list" :key="mall.cardId">
      <el-divider content-position="left">{{ mall.tabName }}</el-divider>
      <div class="mall-card">
        <el-card v-for="info in mall.dataInfos" :key="info.sbomName" :body-style="{ padding: '0px' }">
          <img :src="'https://res5.vmallres.com/pimages' + info.photoPath + info.photoName" class="image" alt="">
          <div style="padding: 14px;">
            <p>
              <el-tag color="red" size="mini" effect="dark" type="danger">{{ info.displayTags }}</el-tag> <span>{{
                  info.prdName
              }}</span>
            </p>
            <p class="price">
              <span class="displayPrice">￥{{ info.displayPrice }}</span>
              <span class="originPrice" v-if="info.displayPrice !== info.originPrice">￥{{ info.originPrice }}</span>
            </p>
            <p class="prdPromotion">
              <el-tag type="danger" effect="plain" size="mini">
                {{ info.prdPromotion }}
              </el-tag>
            </p>
            <div class="bottom clearfix">
              <el-button @click="handleOpenInfo(info)" type="text" class="button">查看详情</el-button>
            </div>
          </div>
        </el-card>
      </div>
    </div>

    <!-- 弹窗 -->
    <el-dialog :title="itemInfo.prdName" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <div class="mallInfoBox">

        <img height="180px" :src="'https://res5.vmallres.com/pimages' + itemInfo.photoPath + itemInfo.photoName"
          class="image" alt="" />
        <div class="Info">
          <p>最新品：<span>{{ itemInfo.sbomName }}</span></p>
          <p>当前价格：<span>{{ itemInfo.displayPrice }} ￥</span></p>
          <p>剩余：<span>{{ itemInfo.reviewCount }} 台</span></p>
          <p>当前活动：<span>{{ itemInfo.promotionLabels }}</span></p>
          <p class="prodSellPoint">{{ itemInfo.prodSellPoint }}</p>
        </div>
      </div>

    </el-dialog>

  </div>
</template>

<script>

export default {
  name: "MallView",
  data() {
    return {
      mallList: this.$store.state.mall.mallList,
      itemInfo: {},
      dialogVisible: false
    }
  },
  methods: {
    handleOpenInfo(info) {
      this.itemInfo = info
      this.dialogVisible = true
    },
    handleClose(done) {
      done();
    }
  }
}
</script>

<style scoped lang="less">
.mallInfoBox {
  display: flex;

  .Info {
    margin: 30px;
    display: flex;
    flex-direction: column;
    font-size: 18px;
    font-weight: 700;

    p {
      margin-bottom: 10px;
    }

    .prodSellPoint {
      color: red;
    }
  }
}

.displayPrice {
  font-size: 20px;
  color: red;
  font-weight: 700;
}

.prdPromotion {
  font-size: 11px;
  font-weight: 700;
}

.originPrice {
  font-size: 14px;
  color: rgba(0, 0, 0, .3);
  text-decoration: line-through;
  margin-left: 4px;
}

.mall-list {
  margin: 20px 0;
}

.mall-main {
  width: 100%;
  //height: 100px;
  //background-color: #bfa;
  display: flex;
  flex-direction: column;

  .el-divider__text {
    font-size: 24px;
    font-weight: 700;
  }

  .mall-card {
    display: flex;
    flex-wrap: wrap;

    .el-card {
      width: 13%;
      margin: 20px;

      :deep(.el-card__body) {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: center;
      }

      .image {
        width: 60%;
        margin: 10% auto;
        text-align: center;
      }

      p {
        margin: 15px 0;
      }
    }
  }
}
</style>