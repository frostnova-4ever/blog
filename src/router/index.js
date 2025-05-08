// router/index.js
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    // 重定向规则，当访问根路径时，跳转到 /page/1
    {
        path: '/',
        redirect: '/page/1'
    },
    {
        path: '/page/:page',
        name: 'Page',
        component: () =>
            import ('../components/content/Page.vue')
    },
    {
        path: '/content/:contentId',
        name: 'ContentDetail',
        component: () =>
            import ('../components/content/ContentDetail.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;