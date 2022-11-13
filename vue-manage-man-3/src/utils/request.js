//引入axios
import axios from "axios"
//创建axios实例
const instance = axios.create({
    baseURL: '/api',//公共地址
    timeout: 5000,//请求超时时间
    // headers: {'X-Custom-Header': 'foobar'}//请求头，可以不写
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // apiLoading ? glo_loading.loadingShow() : ''//全局loading是否启用
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么

    if (response.status === 200) {
        // apiLoading ? glo_loading.loadingHide() : ''
        return response
    } else {
        return Promise.reject()
    }
}, function (error) {

    // 对响应错误做点什么
    // apiLoading ? glo_loading.loadingHide() : ''
    return Promise.reject(error);
});

//导出axios实例
export default instance
