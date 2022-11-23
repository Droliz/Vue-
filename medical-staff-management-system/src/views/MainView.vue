<template>
    <el-container>
        <el-aside width="auto">
            <aside-menu></aside-menu>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script>
import AsideMenu from '@/components/AsideMenu'

export default {
    name: "MainView",
    data() {
        return {

        }
    },
    components: {
        AsideMenu
    }
}
</script>

<style scoped>

</style>