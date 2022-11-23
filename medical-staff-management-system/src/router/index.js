import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        component: () => import("@/views/MainView"),
        name: 'Main',
        redirect: "/home",
        children: [
            // 动态添加 （权限）
            {path: "home", name: "home", component: () => import("@/views/Home/HomeView")},
            {path: "approval", name: "approval", component: () => import("@/views/Approval/ApprovalView")},
            {path: "checkingIn", name: "checkingIn", component: () => import("@/views/CheckingIn/CheckingInView")},
            {path: "contract", name: "contract", component: () => import("@/views/Contract/ContractView")},
            {path: "organization", name: "organization", component: () => import("@/views/Organization/OrganizationView")},
            {path: "performance", name: "performance", component: () => import("@/views/Performance/PerformanceView")},
            {path: "recruitment", name: "recruitment", component: () => import("@/views/Recruitment/RecruitmentView")},
            {path: "salary", name: "salary", component: () => import("@/views/Salary/SalaryView")},
            {path: "staff", name: "staff", component: () => import("@/views/Staff/StaffView")},
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

// router.beforeEach((to, from, next) => {
    // const token = Cookie.get('token')
    // if (!token && to.name !== 'login') {  // 避免登陆界面进入登陆界面
    //     next({ name: 'login' })
    // } else if (token && to.name === 'login') {   // token已经存在，避免跳转到 login
    //     next({ name: 'home' })
    // } else {
    //     next()
    // }
// })

export default router