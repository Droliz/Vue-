export default {
    namespaced: true,
    state: {
        isCollapse: true,   // 控制菜单展开、收缩
        tabsList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 'HomeFilled',
                url: 'Home/HomeView'
            }
        ]
    },
    mutations: {
        changeCollapse(state) {
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state, val) {
            if (val.name !== 'home') {
                const index = state.tabsList.findIndex(item => item.name === val.name)
                if (index === -1) {
                    state.tabsList.push(val)
                }
            }
        },
        closeTag(state, item) {
            console.log(item);
            const index = state.tabsList.findIndex(val => val.name === item.name)
            console.log(index)
            state.tabsList.splice(index, 1)
        }
    }
}