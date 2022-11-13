<template>
    <el-menu :collapse-transition="false" :collapse="isCollapse" active-text-color="#ffd04b" background-color="#545c64"
        class="el-menu-vertical-demo" default-active="home" text-color="#fff">
        <h3>{{ isCollapse ? "后台" : "通用后台管理" }}</h3>
        <el-menu-item @click="routerPush(item)" v-for="item in noChildren" :index="item.name" :key="item.name">
            <el-icon>
                <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.label }}</span>
        </el-menu-item>

        <el-sub-menu v-for="item in hasChildren" :index="item.label" :key="item.label">
            <template #title>
                <el-icon>
                    <component :is="item.icon"></component>
                </el-icon>
                <span>{{ item.label }}</span>
            </template>
            <el-menu-item v-for="page in item.children" :index="page.name">
                <el-icon>
                    <component :is="page.icon"></component>
                </el-icon>
                <span>{{ page.label }}</span>
            </el-menu-item>
            <!-- <el-m~enu-item index="1-2">item two</el-m~enu-item> -->
        </el-sub-menu>

    </el-menu>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore()
const router = useRouter()
const route = useRoute()
let isCollapse = computed(() => store.state.tab.isCollapse)

const routerPush = (item) => {
    if (route.path !== item.path && !(route.path === "/home" && item.path === "/")) {
        router.push(item.path)
    }
    store.commit("tab/selectMenu", item)   // 增加 tab
}

// const menu = [
//     {
//         path: "/home",
//         name: 'home',
//         label: "首页",
//         icon: "HomeFilled",
//         url: "Home/HomeView"
//     },
//     {
//         path: "/mall",
//         name: 'mall',
//         label: "商品管理",
//         icon: "Goods",
//         url: "Mall/MallView"
//     },
//     {
//         path: "/user",
//         name: 'user',
//         label: "用户管理",
//         icon: "User",
//         url: "User/UserView"
//     },
//     {
//         label: "其他",
//         icon: "More",
//         name: "other",
//         children: [
//             {
//                 path: "/page1",
//                 name: 'page1',
//                 label: "页面1",
//                 icon: "Files",
//                 url: "Page/PageView"
//             },
//             {
//                 path: "/page2",
//                 name: 'page2',
//                 label: "页面2",
//                 icon: "Files",
//                 url: "Page/PageView"
//             }
//         ]
//     }
// ]


const menu = JSON.parse(localStorage.getItem('menu')) || store.state.menu.menu

const noChildren = computed(() => menu.filter(item => !item.children))
const hasChildren = computed(() => menu.filter(item => item.children))

</script>

<style scope lang='less'>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
}

.el-menu-vertical-demo {
    // width: 200px;
    // height: 100vh;
    border-right: none;
    border-bottom: none;

    h3 {
        line-height: 48px;
        color: #fff;
        text-align: center;
    }
}
</style>