<template>
    <el-form ref="formRef" inline class="login-container" :rules="rules" :model="form" label-width="70px">
        <h3 class="login-title">系统登录</h3>
        <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入密码" clearable></el-input>
        </el-form-item>
        <el-form-item class="form-button">
            <el-button type="primary" @click="submit">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { getMenu } from "@/api";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useStore()
const formRef = ref()
const form = reactive({
    username: '',
    password: '',
})

const rules = {
    username: [
        { required: true, trigger: 'blur', message: '请输入用户名', }
    ],
    password: [
        { required: true, trigger: 'blur', message: '请输入密码', }
    ]
}

function submit() {
    formRef.value.validate(async () => {
        const { data } = await getMenu(JSON.stringify(form))
        const { token, menu } = data.data
        const tagsList = [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 'HomeFilled',
                url: 'Home/HomeView'
            }
        ]
        localStorage.setItem('loginTime', new Date().valueOf())  // 登录时间戳，每 7 天重新登陆
        localStorage.setItem('token', token)
        localStorage.setItem('collapse', JSON.stringify(true))
        localStorage.setItem('tagsList', JSON.stringify(tagsList))
        store.commit('tab/initTagsList')   // 初始化
        store.commit('menu/setMenu', menu);
        store.commit('menu/addMenu', router);
        router.push({
            name: 'home'
        })
    })
}

</script>

<style scope lang='less'>
.login-container {
    width: 350px;
    margin: 180px auto;
    border: 1px solid #eaeaea;
    padding: 35px 35px 15px;
    border-radius: 15px;
    box-shadow: 0 0 25px #cac6c6;
    box-sizing: border-box;

    h3 {
        text-align: center;
        margin-bottom: 40px;
        color: #505458;
    }

    .el-input {
        width: 198px;
    }

    .form-button {
        margin-top: 10px;
        display: flex;
        margin-right: 0;

        .el-form-item__content {
            display: flex;
            justify-content: center;
        }
    }
}
</style>