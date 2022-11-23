export default {
    namespaced: true,
    state: {
        isCollapse: JSON.parse(localStorage.getItem("collapse")),   // 控制菜单展开、收缩
        // tagsList: [
        //     {
        //         path: '/',
        //         name: 'home',
        //         label: '首页',
        //         icon: 'HomeFilled',
        //         url: 'Home/HomeView'
        //     }
        // ]
        tagsList: JSON.parse(localStorage.getItem("tagsList"))
    },
    mutations: {
        initTagsList(state) {
            state.tagsList = JSON.parse(localStorage.getItem("tagsList"))
        },

        changeCollapse(state) {
            state.isCollapse = !state.isCollapse
            localStorage.setItem("collapse", JSON.stringify(state.isCollapse))
        },
        selectMenu(state, val) {
            // console.log(state.tagsList)
            if (val.name !== 'home') {
                const index = state.tagsList.findIndex(item => item.name === val.name)
                if (index === -1) {
                    state.tagsList.push(val)
                    localStorage.setItem('tagsList', JSON.stringify(state.tagsList))
                }
            }
        },
        closeTag(state, item) {
            const index = state.tagsList.findIndex(val => val.name === item.name)
            state.tagsList.splice(index, 1)
            localStorage.setItem('tagsList', JSON.stringify(state.tagsList))
        }
    }
}