import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "Main",
        component: () => import("@/pages/Main.vue"),
    },
    {
        path: "/about",
        name: "About",
        component: () => import("@/pages/About.vue"),
    },
    {
        path: "/posts",
        name: "Posts",
        component: () => import("@/pages/PostPage.vue"),
    },
    {
        path: "/posts/:id",
        name: "PostDetail",
        component: () => import("@/pages/ContentPost.vue"),
        props: true,
    },
    // {
    //   path: "/composition",
    //   name: "Composition",
    //   component: () => import("@/pages/CompositionPost.vue"),
    // },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL),
    routes,
});

export default router;
