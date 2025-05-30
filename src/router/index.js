// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HtmlPreview from '../components/HtmlPreview.vue';

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
        name: 'ContentDetail2',
        component: () =>
            import ('../components/content/ContentDetail2.vue')
    },
    {
        path: '/preview/:file',
        name: 'Preview',
        component: () =>
            import ('../components/content/Preview.vue')
    }
];

export default createRouter({
    history: createWebHistory(),
    routes
});