import { RouteRecordRaw } from 'vue-router'
import { getBlogPosts } from '@/web/pages/Blog/getBlogPosts'

export enum RouteName {
    Home = 'Home',
    Error404 = 'Error404',
}

export const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('@/web/layouts/MainLayout.vue'),
        children: [
            {
                name: RouteName.Home,
                path: '',
                component: () => import('@/web/pages/Home/HomePage.vue'),
            },
            {
                path: 'about',
                component: () => import('@/web/pages/About/AboutPage.vue'),
            },
            {
                path: 'blog',
                component: () => import('@/web/pages/Blog/BlogPage.vue'),
            },
            {
                path: 'projects',
                component: () => import('@/web/pages/Projects/ProjectsPage.vue'),
            },
            ...getBlogPosts().map((post) => ({
                path: post.slug,
                component: () => import(`@/web/pages/Blog/${post.dir}/BlogPost.vue`),
            })),
            {
                name: RouteName.Error404,
                path: '404',
                component: () => import('@/web/pages/Error/404Page.vue'),
            },
        ],
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: {
            name: RouteName.Error404,
        },
    },
]
