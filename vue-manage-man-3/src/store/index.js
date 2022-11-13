import { createStore } from 'vuex'
import tab from './modules/tab'
import menu from './modules/menu'

export default createStore({
    modules: {
        tab,
        menu
    },
})

