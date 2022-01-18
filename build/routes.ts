import { srcWebDir } from './webpack.common'
import fs from 'fs/promises'
import path from 'path'
import { blogEntries } from '@/web/pages/Blog/getBlogPosts'
import { existsSync } from 'fs'
import { slugify } from '@/common/utils/slugify'

// ----------------------------------------------------------------------------
// Routes
// ----------------------------------------------------------------------------

export async function getBlogPostSlugs(blogDir: string): Promise<Array<string>> {
    const postSlugs: Array<string> = []

    for (const entry of blogEntries) {
        const blogPostVueFile = path.resolve(blogDir, entry, 'BlogPost.vue')
        if (!existsSync(blogPostVueFile)) {
            throw new Error(`${blogPostVueFile} does not exist`)
        }

        const blogPostContentsBuffer = await fs.readFile(blogPostVueFile)
        const blogPostContents = blogPostContentsBuffer.toString()

        const matches = /^export const TITLE = '(.+)'$/m.exec(blogPostContents)
        if (!matches) {
            throw new Error(`Failed to find TITLE in ${blogPostVueFile}`)
        }

        const title = matches[1]
        const slug = slugify(title)
        postSlugs.push(slug)
    }

    return postSlugs
}

export const prerenderRoutes: Promise<Array<string>> = (async() => {
    const postSlugs = await getBlogPostSlugs(path.resolve(srcWebDir, 'pages', 'Blog'))

    return [
        ...postSlugs.map((slug) => `/${slug}`),
        '/about',
        '/blog',
        '/projects',
        '/',
    ]
})()
