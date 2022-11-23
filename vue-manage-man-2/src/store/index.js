import Vue from 'vue'
import Vuex from 'vuex'
import tab from './modules/tab'
import menu from "./modules/menu"
import mall from "./modules/mall"

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        tab,
        menu,
        mall
    }
})