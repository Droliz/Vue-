import { createApp } from 'vue'
import '@/style.css'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '@/api/mock'
import '@/assets/less/index.less'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 刷新动态路由持久化    在 use 之前
store.commit('menu/addMenu', router)

app.use(router)
app.use(store)

app.mount('#app')
