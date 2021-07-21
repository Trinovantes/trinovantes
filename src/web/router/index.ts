import { createMemoryHistory, createRouter, createWebHistory, Router } from 'vue-router'
import { AppContext } from '@/web/AppContext'
import { routes } from './routes'

// ----------------------------------------------------------------------------
// Router
// ----------------------------------------------------------------------------

export async function createAppRouter(ssrContext?: AppContext): Promise<Router> {
    const router = createRouter({
        history: ssrContext !== undefined
            ? createMemoryHistory()
            : createWebHistory(),

        routes,

        scrollBehavior: (to, from, savedPosition) => {
            if (to.hash) {
                return {
                    el: to.hash,
                }
            }

            return savedPosition ?? { top: 0 }
        },
    })

    if (ssrContext?.url) {
        await router.push(ssrContext.url)
    }

    return router
}
