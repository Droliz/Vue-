import Vue from "vue";
import VueRouter from "vue-router";
import Cookie from "js-cookie";

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        component: () => import("@/views/MainView"),
        name: 'Main',
        redirect: "/home",
        children: [
            // 动态添加 （权限）
            // {path: "home", name: "home", component: () => import("@/views/Home")},
            // {path: "user", name: "user", component: () => import("@/views/User")},
            // {path: "mall", name: "mall", component: () => import("@/views/Mall")},
            // {path: "page1", name: "page1", component: () => import("@/views/Page")},
            // {path: "page2", name: "page2", component: () => import("@/views/Page")},
        ]
    },
    {
        path: "/login",
        name: 'login',
        component: () => import('@/views/LoginView')
    }
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    const token = Cookie.get('token')
    if (!token && to.name !== 'login') {  // 避免登陆界面进入登陆界面
        next({name: 'login'})
    } else if (token && to.name === 'login') {   // token已经存在，避免跳转到 login
        next({name: 'home'})
    } else {
        next()
    }
})

export default router