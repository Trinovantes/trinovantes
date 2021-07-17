import '@/common/utils/setupDayjs'
import { fetchProjects } from '@/api/services/fetchProjects'
import { Projects } from '@/common/Project'
import { formatDate } from '@/common/utils/formatDate'
import { getBlogPosts } from '@/web/pages/Blog/getBlogPosts'
import assert from 'assert'
import axios from 'axios'
import { slugify } from '@/common/utils/slugify'
import path from 'path'
import { writeFile } from 'fs/promises'
import { formatUrl } from '@/common/utils/formatUrl'

const IMG_WIDTH = 400

async function getProjects(): Promise<Projects> {
    if (DEFINE.IS_DEV) {
        const res = await axios.get<Projects>('http://localhost:3000/api/projects')
        return res.data
    } else {
        return await fetchProjects()
    }
}

class ReadmeGenerator {
    private _output = ''
    private _stack = 0

    private addLn(line: string, prefixLinebreak = true): void {
        if (prefixLinebreak) {
            this._output += '\n'
        }

        this._output += `${line}\n`
    }

    private startTag(tag: string, attrs?: string): void {
        this.addLn(`<${tag}${attrs ? ` ${attrs}` : ''}>`)
        this._stack += 1
    }

    private endTag(tag: string): void {
        this._stack -= 1
        this.addLn(`</${tag}>`)
    }

    async generate(): Promise<string> {
        this._output = ''
        this._stack = 0

        this.generateBlog()
        await this.generateProjects()

        assert(this._stack === 0)
        return this._output
    }

    private generateBlog(): void {
        const blogPosts = getBlogPosts()

        this.addLn('# Blog')

        for (const blogPost of blogPosts) {
            const postUrl = `https://www.stephenli.ca/${slugify(blogPost.title)}`
            const linkTag = `<a href="${postUrl}" title="${blogPost.title}" target="_blank">${blogPost.title}</a>`
            this.addLn(`* \`${formatDate(blogPost.createdAt)}\` ${linkTag}`, false)
        }

        this.addLn('')
    }

    private async generateProjects(): Promise<void> {
        const projects = await getProjects()

        for (const [category, categoryProjects] of Object.entries(projects)) {
            this.addLn(`# ${category}`)

            this.startTag('table')

            for (const project of categoryProjects) {
                this.startTag('tr')

                {
                    const imgPath = project.img?.startsWith('http')
                        ? project.img
                        : `./src/web/pages/Projects/img/${project.img}`
                    const imgTag = `<img src="${imgPath}" width="${IMG_WIDTH}" title="${project.name}">`

                    let previewUrl = ''
                    let previewTooltip = ''

                    if (project.url) {
                        previewUrl = project.url
                        previewTooltip = project.url
                    } else if (project.repo && !project.isPrivate) {
                        previewUrl = project.repo
                        previewUrl = project.repo
                    }

                    this.addLn(`<td width="${IMG_WIDTH}px" valign="middle"><a href="${previewUrl}" title="${previewTooltip}" target="_blank">${imgTag}</a></td>`)
                }

                {
                    this.startTag('td', 'valign="middle"')

                    const projectLabelTag = project.url
                        ? `<a href="${project.url}" title="${formatUrl(project.url)}" target="_blank">${project.name}</a>`
                        : project.name
                    const projectRepoTag = (project.repo && !project.isPrivate)
                        ? ` <a href="${project.repo}" title="${project.repo}" target="_blank"><img src="./src/web/assets/img/icons/github.svg" width="16" height="16"></a>`
                        : ''

                    this.addLn(`## ${projectLabelTag}${projectRepoTag}`)

                    if (project.desc) {
                        this.addLn(`${project.desc}`)
                    }
                    if (project.tech.length > 0) {
                        this.addLn(project.tech.map((tech) => `<code>${tech}</code>`).join(' '))
                    }

                    this.endTag('td')
                }

                this.endTag('tr')
            }

            this.endTag('table')
        }
    }
}

async function main() {
    const generator = new ReadmeGenerator()
    const output = await generator.generate()

    const readmeFile = path.resolve('README.md')
    await writeFile(readmeFile, output)
}

main().catch(console.warn)
