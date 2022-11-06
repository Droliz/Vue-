import Vue from 'vue'
import App from './App.vue'
import '@/utils/element'
import router from "@/router";
import store from "@/store"
import '@/api/mock'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    created() {
        store.commit('menu/addMenu', router)
    },
    render: h => h(App),
}).$mount('#app')
