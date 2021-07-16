import { VueSsgServer } from 'puppeteer-prerender-plugin'
import { AppContext, createApp } from './app'
import { renderMetaToString } from 'vue-meta/ssr'
import { HydrationKey, saveStateToDom } from '@/web/utils/hydration'
import { fetchProjects } from '@/api/services/fetchProjects'
import { Projects } from '@/common/Project'

let projects: Projects | null = null

const server = new VueSsgServer({
    staticDir: DEFINE.PUBLIC_DIR,
    publicPath: DEFINE.PUBLIC_PATH,
    clientEntryJs: DEFINE.CLIENT_ENTRY_JS,
    clientEntryCss: DEFINE.CLIENT_ENTRY_CSS,
    manifestFile: DEFINE.MANIFEST_FILE,

    async createSsrContext(req) {
        if (!projects) {
            projects = await fetchProjects()
        }

        const appContext: AppContext = {
            url: req.originalUrl,
            projects,
        }

        return appContext
    },

    async createApp(ssrContext) {
        return await createApp(ssrContext as AppContext)
    },

    async onPostRender(app, ssrContext) {
        await renderMetaToString(app, ssrContext)

        const appContext = ssrContext as AppContext
        if (!appContext.teleports) {
            appContext.teleports = {}
        }
        if (!appContext.teleports.head) {
            appContext.teleports.head = ''
        }

        appContext.teleports.head += `
            <link rel="icon" type="image/png" href="/favicon.png">

            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap" rel="stylesheet">

            <script>
                ${saveStateToDom(HydrationKey.Projects, appContext.projects)};
            </script>
        `
    },
})

export default server
