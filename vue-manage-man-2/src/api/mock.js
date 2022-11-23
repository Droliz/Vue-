import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import user from "@/api/mockServeData/user";
import permission from "@/api/mockServeData/permission";
import mall from '@/api/mockServeData/mall'

// 定义 mock 请求拦截
Mock.mock('/api/home/getData', homeApi)

// user
Mock.mock('/api/user/add', 'post', user.createUser)
Mock.mock('/api/user/edit', 'post', user.updateUser)
Mock.mock('/api/user/del', 'post', user.deleteUser)
Mock.mock(/\/api\/user\/getUser/, user.getUserList)

// 权限
Mock.mock(/\/api\/permission\/getMenu/, 'post', permission.getMenu)

// 商品数据
Mock.mock('/api/mall/getMall', 'get', mall.getMallData)