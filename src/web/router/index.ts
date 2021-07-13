import { createMemoryHistory, createRouter, createWebHistory, Router } from 'vue-router'
import { AppContext } from '@/web/app'
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
    })

    if (ssrContext?.url) {
        await router.push(ssrContext.url)
    }

    return router
}
