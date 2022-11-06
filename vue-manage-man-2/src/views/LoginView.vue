<template>
  <el-form ref="form" inline class="login-container" :rules="rules" :model="form" label-width="70px">
    <h3 class="login-title">系统登录</h3>
    <el-form-item
        label="用户名"
        prop="username">
      <el-input v-model="form.username" placeholder="请输入用户名" clearable></el-input>
    </el-form-item>
    <el-form-item
        label="密码"
        prop="password">
      <el-input type="password" v-model="form.password" placeholder="请输入密码" clearable></el-input>
    </el-form-item>
    <el-form-item class="form-button">
      <el-button type="primary" @click="submit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Cookie from "js-cookie";
import {getMenu} from "@/api";

export default {
  name: "LoginView",
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, trigger: 'blur', message: '请输入用户名',}
        ],
        password: [
          {required: true, trigger: 'blur', message: '请输入密码',}
        ]
      }
    }
  },
  methods: {
    submit() {
      // form表单校验通过 val => true
      this.$refs.form.validate(val => {
        if (val) {
          getMenu(JSON.stringify(this.form)).then(({data}) => {
            if (data.code === 200) {
              const {token, menu} = data.data
              Cookie.set('token', token)

              this.$store.commit('menu/setMenu', menu)
              this.$store.commit('menu/addMenu', this.$router)

              this.$router.push('/home')
            } else {
              this.$message.error(data.message)
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  width: 350px;
  margin: 180px auto;
  border: 1px solid #eaeaea;
  padding: 35px 35px 15px 35px;
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
    justify-content: center;
  }
}
</style>