import { Projects } from '@/common/Project'
import { SSRContext } from '@vue/server-renderer'

export type AppContext = SSRContext & {
    url: string
    projects: Projects
}
