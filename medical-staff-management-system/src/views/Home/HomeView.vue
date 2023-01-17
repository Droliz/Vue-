<template>
    <el-col :span="24">
        <el-row>
            <el-card v-for="card in cardList" :key="card.title" class="box-card">
                <span class="title">{{ card.title }}</span>
                <span class="number">{{ card.number | numberToCurrency }}</span>
                <span class="type">{{ card.type }}</span>
            </el-card>
        </el-row>
        <el-row>
            <div ref="table" class="table"></div>
        </el-row>
    </el-col>
</template>

<script>
import echarts from 'echarts'

export default {
    name: "HomeView",
    data() {
        return {
            cardList: [
                {
                    title: "员工总数",
                    number: 856,
                    type: "雇员"
                },
                {
                    title: "作业检视",
                    number: 3342,
                    type: "监督"
                },
                {
                    title: "职业申请",
                    number: 77,
                    type: "申请人"
                },
                {
                    title: "员工辞职",
                    number: 17,
                    type: "雇员"
                },
            ]
        }
    },
    mounted() {
        const table = echarts.init(this.$refs.table)
        const option = {}
        table.setOption(option) 
    }
}
</script>

<style scope lang='less'>
.el-row {
    display: flex;
    justify-content: space-between;
}

.box-card {
    width: 23%;

    .el-card__body {
        display: flex;
        flex-direction: column;

        .title {
            font-size: 16px;
            font-weight: 500;
        }

        .number {
            padding: 5px 0;
            font-weight: 700;
            font-size: 28px;
        }

        .type {
            font-size: 14px;
            color: rgba(0, 0, 0, .4)
        }
    }
}
</style>