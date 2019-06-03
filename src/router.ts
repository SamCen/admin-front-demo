import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'index',
            redirect: '/home',
            component: () => import(/* webpackChunkName: "index" */ '@/components/Main.vue'),
            children: [
                {
                    name: '主页',
                    path: '/home',
                    meta: {title: 'Home'},
                    component: () => import('@/views/Home.vue'),
                }
            ],
        },
        {
            path: '/login',
            name: 'login',
            component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
        },
        {
            path: '*',
            name: 'NotFound',
            component: () => import(/* webpackChunkName: "NotFound" */ '@/views/tips/NotFound.vue'),
        },
    ],
});
