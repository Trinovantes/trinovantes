// Must be imported first so it can extend the dayjs global
import '@/common/utils/setupDayjs'

import { createSSRApp } from 'vue'
import { createAppRouter } from './router'
import AppLoader from './components/AppLoader.vue'
import ClientOnly from './components/Global/ClientOnly.vue'
import SimpleTable from './components/Global/SimpleTable.vue'
import SimpleImage from './components/Global/SimpleImage.vue'
import Heading from './components/Global/Heading.vue'
import BlogPost from './components/Global/BlogPost.vue'
import { createMetaManager } from 'vue-meta'
import { Router } from 'vue-router'
import { AppContext } from './AppContext'

interface CreatedApp {
    app: ReturnType<typeof createSSRApp>
    router: Router
}

export async function createApp(ssrContext?: AppContext): Promise<CreatedApp> {
    console.info('Release', DEFINE.GIT_HASH)

    // Vue
    const app = createSSRApp(AppLoader)
    app.component('ClientOnly', ClientOnly)
    app.component('SimpleImage', SimpleImage)
    app.component('BlogPost', BlogPost)
    app.component('SimpleTable', SimpleTable)
    app.component('Heading', Heading)

    // Vue Router
    const router = await createAppRouter(ssrContext)
    app.use(router)
    await router.isReady()

    // Vue Meta
    const metaManager = createMetaManager(DEFINE.IS_SSR)
    app.use(metaManager)

    return {
        app,
        router,
    }
}
