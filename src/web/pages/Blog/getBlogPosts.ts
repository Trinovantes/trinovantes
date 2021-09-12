import { slugify } from '@/common/utils/slugify'
import { Dayjs } from 'dayjs'
import { ComponentOptions } from 'vue'

// These are blog post locations on disk; has no relation to their final slug
export const blogEntries = [
    '2021-google-blocklist',
    '2021-vue3-ssr-critical-resources',
    '2021-vuex4-generator',
    '2015-if-x',
    '2015-ray-tracer',
    '2014-os',
]

export interface BlogPostSource {
    TITLE?: string
    SLUG?: string
    CREATED_AT?: Dayjs
    UPDATED_AT?: Dayjs

    default: ComponentOptions
}

export interface BlogPost {
    title: string
    slug: string
    createdAt: Dayjs
    updatedAt?: Dayjs
    dir: string
}

export function getBlogPosts(): Array<BlogPost> {
    const posts: Array<BlogPost> = []

    for (const entry of blogEntries) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const blogPostSrc = require(`./${entry}/index.vue`) as BlogPostSource

        if (!blogPostSrc.TITLE) {
            throw new Error(`${blogPostSrc.default.__file} is missing TITLE export`)
        }

        if (!blogPostSrc.CREATED_AT) {
            throw new Error(`${blogPostSrc.default.__file} is missing CREATED_AT export`)
        }

        posts.push({
            title: blogPostSrc.TITLE,
            slug: blogPostSrc.SLUG ?? slugify(blogPostSrc.TITLE),
            createdAt: blogPostSrc.CREATED_AT,
            updatedAt: blogPostSrc.UPDATED_AT,
            dir: entry,
        })
    }

    return posts.sort((postA, postB) => {
        return postB.createdAt.unix() - postA.createdAt.unix()
    })
}
