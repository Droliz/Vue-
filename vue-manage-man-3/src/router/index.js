import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: '/',
        component: () => import('@/view/MainView.vue'),
        name: 'Main',
        redirect: "/home",
        // children: [
        //     { path: 'home', name: 'home', component: () => import('@/view/Home/HomeView.vue') },
        //     { path: 'user', name: 'user', component: () => import('@/view/User/UserView.vue') },
        //     { path: 'mall', name: 'mall', component: () => import('@/view/Mall/MallView.vue') },
        //     { path: 'page', name: 'page', component: () => import('@/view/Page/PageView.vue') },
        // ],
        children: []
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/view/Login/LoginView.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

function isPastDue() {
    // 过期时间7天
    const time = 1000 * 60 * 60 * 24 * 7;  //1000*60*60*24*7;
    const oldTimestamp = localStorage.getItem('timestamp');//以前存的时间戳
    if (oldTimestamp) {
        const nowTimestamp = new Date().getTime();//当前时间戳
        // 如果当前时间戳> 前面存的时间戳+过期时间 表示已经过期
        const sumTimestamp = timestamp + time;
        if (nowTimestamp > sumTimestamp) {
            localStorage.clear();
        }
    }
}

router.beforeEach((to, from, next) => {
    isPastDue()

    const token = localStorage.getItem('token')
    if (!token && to.name !== 'login') {  // 避免登陆界面进入登陆界面
        next({ name: 'login' })
    } else if (token && to.name === 'login') {   // token已经存在，避免跳转到 login
        next({ name: 'home' })
    } else {
        next()
    }
})

export default router