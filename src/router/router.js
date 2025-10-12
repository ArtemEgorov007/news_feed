import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/posts',
    },
    {
        path: '/main',
        name: 'Main',
        component: () => import('@/features/posts/pages/Main.vue'),
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('@/features/posts/pages/About.vue'),
    },
    {
        path: '/posts',
        name: 'Posts',
        component: () => import('@/features/posts/pages/PostPage.vue'),
    },
    // Removed the individual post route since we now use modals for detailed views
    {
        path: '/favorites',
        name: 'Favorites',
        component: () => import('@/features/posts/pages/FavoritesPage.vue'),
    },
]

const router = createRouter({
    history: createWebHistory('/news_feed/'),
    routes,
})

export default router