<template>

    <div class="l-content">
        <el-button size="small" @click="change">
            <el-icon :size="20">
                <Menu />
            </el-icon>
        </el-button>
    </div>

    <div class="r-content">
        <el-dropdown @command="handleClick">
            <span class="el-dropdown-link">
                <img src="@/assets/vue.svg" alt="" />
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>

</template>

<script setup>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const router = useRouter()
const store = useStore();

function change() {
    store.commit('tab/changeCollapse')
}

function handleClick(command) {
    if (command === 'logout') {
        // localStorage.removeItem('token')
        // localStorage.removeItem('menu')
        localStorage.clear()
        console.log(store.state.tab.tagsList)
        router.push('/login')
    }

}

</script>

<style scope lang='less'>
.el-header {
    background-color: #333;
    /* padding: 0 20px; */
    display: flex;
    justify-content: space-between;
    align-items: center;

    .l-content {
        display: flex;
        align-items: center;
    }

    .r-content {
        img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }


}
</style>