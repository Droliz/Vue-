import Vue from 'vue'
import App from './App.vue'
import '@/utils/element'
import router from '@/router'
import store from '@/store'
import '@/assets/css/font.css'   // 字体样式

Vue.config.productionTip = false

Vue.filter('numberToCurrency', (value) => {
  if (!value) return 0
  // 获取整数部分
  const intPart = Math.trunc(value)
  // 整数部分处理，增加,
  const intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  // 预定义小数部分
  let floatPart = ''
  // 将数值截取为小数部分和整数部分
  const valueArray = value.toString().split('.')
  if (valueArray.length === 2) { // 有小数部分
    floatPart = valueArray[1].toString() // 取得小数部分
    return intPartFormat + '.' + floatPart
  }
  return intPartFormat + floatPart
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')



