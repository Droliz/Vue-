import {createRouter, createWebHashHistory} from "vue-router";

const routes = [
    {
        path: '/',
        component: () => import('../view/MainView.vue'),
        children: [
            {path: 'home', name: 'home', component: () => import('../view/Home/HomeView.vue')}
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router