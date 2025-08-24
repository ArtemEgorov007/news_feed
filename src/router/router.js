import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/posts',
    },
    {
        path: '/main',
        name: 'Main',
        component: () => import('@/pages/Main.vue'),
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('@/pages/About.vue'),
    },
    {
        path: '/posts',
        name: 'Posts',
        component: () => import('@/pages/PostPage.vue'),
    },
    {
        path: '/posts/:id',
        name: 'PostDetail',
        component: () => import('@/pages/ContentPost.vue'),
        props: true,
    },
]

const router = createRouter({
    history: createWebHistory('/news_feed/'),
    routes,
})

export default router
