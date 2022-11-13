export default {
    namespaced: true,
    state: {
        menu: []
    },
    mutations: {
        // 动态 menu 数据
        setMenu(state, val) {
            state.menu = val
            localStorage.setItem('menu', JSON.stringify(val))
        },

        // 动态注册路由
        addMenu(state, router) {
            // 判断
            if (!localStorage.getItem('menu')) return
            const menu = JSON.parse(localStorage.getItem('menu'))
            state.menu = menu
            // console.log(menu)

            const menuArray = []
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item => {
                        // chi.component = (resolve) => require([`@/views/${chi.url}.vue`], resolve)
                        const str = `../../view/${item.url}.vue`
                        item.component = () => import(str)
                        return item
                    })
                    menuArray.push(...item.children)
                } else {
                    // item.component = (resolve) => require([`@/views/${item.url}.vue`], resolve)
                    const str = `../../view/${item.url}.vue`
                    item.component = () => import(str)
                    menuArray.push(item)
                }
            })
            console.log(menuArray);
            menuArray.forEach(item => {
                router.addRoute('Main', item)
            })
            // console.log(router)
        }

    },
}