import {createRouter, createWebHistory} from "vue-router";
import Main from "@/pages/Main.vue";
import About from "@/pages/About.vue";
import PostPage from "@/pages/PostPage.vue";
import ContentPost from "@/pages/ContentPost.vue";
// import CompositionPost from "@/pages/CompositionPost.vue";

const routes = [
    {path: '/', component: Main},
    {path: '/about', component: About},
    {path: '/posts', component: PostPage},
    {path: '/posts/:id', component: ContentPost},
    // {path: '/composition', component: CompositionPost},
];

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL),
    routes
});

export default router;
