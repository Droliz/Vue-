<template>
    <div class="common-container">
        <div class="cover-top" id="map_block">
            <div class="cover-image">
                <img src="../assets/image/bg.png" alt="" />
            </div>
            <div class="title">
                <h1>抗击疫情 共渡难关</h1>
                <h2>肺炎疫情实时动态播报</h2>
            </div>
            <div class="cover-card">
                <div class="tab">
                    <div @click="changeShow(0)" :class="type === 0 ? 'active' : ''">全国疫情数据(含港澳台)</div>
                    <div @click="changeShow(1)" :class="type === 1 ? 'active' : ''">湖北疫情数据</div>
                </div>

                <div v-if="chinaTotal.total" v-show="type === 0" class="card-info">
                    <div class="cover_input">
                        <h4>境外输入</h4>
                        <div class="number">{{ chinaTotal.total.input }}</div>
                        <p class="added">较昨日<span>+{{ chinaTotal.today.input }}</span></p>
                    </div>
                    <div class="cover_nosymptom">
                        <h4>无症状感染者</h4>
                        <div class="number">{{ chinaTotal.extData.noSymptom }}</div>
                        <p class="added">较昨日<span>+{{ chinaTotal.extData.incrNoSymptom }}</span></p>
                    </div>
                    <div class="cover_today_confirm">
                        <h4>现有确诊</h4>
                        <div class="number">{{ chinaTotal.total.confirm - chinaTotal.total.dead - chinaTotal.total.heal
                        }}
                        </div>
                        <p class="added">较昨日<span>+{{ chinaTotal.today.storeConfirm }}</span></p>
                    </div>
                    <div class="cover_confirm">
                        <h4>累计确诊</h4>
                        <div class="number">{{ chinaTotal.total.confirm }}</div>
                        <p class="added">较昨日<span>+{{ chinaTotal.today.confirm }}</span></p>
                    </div>
                    <div class="cover_dead">
                        <h4>累计死亡</h4>
                        <div class="number">{{ chinaTotal.total.dead }}</div>
                        <p class="added">较昨日<span>+{{ chinaTotal.today.dead }}</span></p>
                    </div>
                    <div class="cover_heal">
                        <h4>累计治愈</h4>
                        <div class="number">{{ chinaTotal.total.heal }}</div>
                        <p class="added">较昨日<span>+{{ chinaTotal.today.heal }}</span></p>
                    </div>
                </div>

                <div v-if="hbData.total" v-show="type === 1" class="card-info">
                    <div class="cover_confirm">
                        <h4>累计确诊</h4>
                        <div class="number">{{ hbData.total.confirm }}</div>
                        <p class="added">较昨日<span>+{{ hbData.today.confirm }}</span></p>
                    </div>
                    <div class="cover_dead">
                        <h4>累计死亡</h4>
                        <div class="number">{{ hbData.total.dead }}</div>
                        <p class="added">较昨日<span>+{{ hbData.today.dead }}</span></p>
                    </div>
                    <div class="cover_heal">
                        <h4>累计治愈</h4>
                        <div class="number">{{ hbData.total.heal }}</div>
                        <p class="added">较昨日<span>+{{ hbData.today.heal }}</span></p>
                    </div>
                </div>

                <div class="time"></div>

            </div>
        </div>

        <div class="common-content">
            <div class="tab">
                <div>中国疫情</div>
                <div>世界疫情</div>
                <div>实时播报</div>
            </div>

        </div>

    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, toRefs } from 'vue'
import { getData, InitData } from "../pageTS";

const data = reactive(new InitData())

onMounted(() => {
    getData(data)
})

const { chinaTotal, hbData, type } = toRefs(data)

const changeShow = (type: number) => {
    data.type = type
}

console.log(data.type)

</script>

<style scope lang='less'>
@-box-width: calc(100% - 2rem);

// 颜色
.color(@color) {
    :not(h4, p) {
        color: @color;
    }
}

.common-container {
    .cover-top {
        position: reactive;
        height: 30rem;

        .cover-image {
            img {
                width: 100%;
            }
        }

        .title {
            position: absolute;
            top: 4rem;
            left: 1rem;
            color: #fff;

            h1 {
                font-family: -apple-system-font, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Arial;
                font-weight: 700;
                top: 122px;
            }
        }

        .cover-card {
            position: absolute;
            top: 10rem;
            z-index: 2;
            left: 1rem;
            margin-bottom: 35px;
            // height: 10rem;
            width: @-box-width;
            background-color: #fff;
            border-radius: 1rem;
            box-shadow: 0 2px 20px rgba(0, 0, 0, .1);
            overflow: hidden;

            .tab {
                display: flex;
                justify-content: center;

                >div {
                    width: 50%;
                    text-align: center;
                    height: 40px;
                    line-height: 40px;
                    background-color: #efefef;

                    &.active {
                        background-color: #fff;
                    }
                }
            }

            .card-info {
                display: flex;
                flex-wrap: wrap;
                margin-bottom: 2rem;

                >div {
                    text-align: center;
                    width: 33%;
                    margin-top: 2rem;

                    h4 {
                        font-size: .7rem;
                        font-weight: 600;
                    }

                    .number {
                        font: 700 44px/74px DIN Alternate, din_alternate_bold, -apple-system-font, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Arial;
                        font-size: 1.4rem;
                        // font-weight: 700;
                        height: 40px;
                        line-height: 40px;
                    }

                    .added {
                        display: block;
                        font-size: .6rem;
                        color: #999;
                    }
                }

                .cover_input {
                    .color(#ffa325);
                }

                .cover_nosymptom {
                    .color(#791618)
                }

                .cover_today_confirm {
                    .color(#e44a3d)
                }

                .cover_confirm {
                    .color(#a31d13)
                }

                .cover_dead {
                    .color(#333)
                }

                .cover_heal {
                    .color(#34aa70)
                }
            }

        }
    }

    .common-content {
        height: 10rem;
        background-color: #bfa;

        .tab {
            display: flex;
            justify-content: space-between;

            >div {
                text-align: center;
            }
        }
    }

}
</style>