import { HydrationKey } from '@/web/utils/hydration'

declare global {
    const DEFINE: {
        IS_DEV: boolean
        IS_SSR: boolean
        GIT_HASH: string

        // ssg specific
        PUBLIC_DIR: string
        PUBLIC_PATH: string
        CLIENT_ENTRY_JS: string
        CLIENT_ENTRY_CSS: string
        MANIFEST_FILE: string
    }

    interface Window {
        [HydrationKey.Projects]: string
    }
}

export {}
