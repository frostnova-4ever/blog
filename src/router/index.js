// router/index.js
import { createRouter, createWebHashHistory } from 'vue-router';
import HtmlPreview from '../components/HtmlPreview.vue';

const routes = [
    // 访问根路径时，直接渲染 Page.vue，page 参数为 1
    {
        path: '/',
        name: 'Home',
        component: () =>
            import ('../components/content/Page.vue'),
        props: { page: 1 }
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
    history: createWebHashHistory(),
    routes
});