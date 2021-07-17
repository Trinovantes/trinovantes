import { Project, Projects, projects } from '@/common/Project'
import { Octokit } from '@octokit/rest'
import { getSecret, Secrets } from '@/api/utils/secrets'
import axios from 'axios'
import { JSDOM } from 'jsdom'

let hydratedProjects: Projects | null = null

export async function fetchProjects(): Promise<Projects> {
    if (!hydratedProjects) {
        hydratedProjects = await hydrateProjects(projects)
    }

    return hydratedProjects
}

async function hydrateProjects(projects: Projects): Promise<Projects> {
    const hydratedProjects: Projects = {}

    for (const [category, categoryProjects] of Object.entries(projects)) {
        hydratedProjects[category] = []

        for (const project of categoryProjects) {
            hydratedProjects[category].push(await hydrateProject(project))
        }
    }

    return hydratedProjects
}

async function hydrateProject(project: Project): Promise<Project> {
    const octokit = new Octokit({
        auth: getSecret(Secrets.GITHUB_PAT),
    })

    const repoInfo = getRepoInfo(project.repo)
    const res = await octokit.rest.repos.get(repoInfo)

    return {
        ...project,
        desc: project.desc ?? res.data.description ?? undefined,
        url: project.url ?? res.data.homepage ?? undefined,
        img: project.img ?? await getOpenGraphImage(project) ?? undefined,
    }
}

function getRepoInfo(githubUrl: string): { owner: string; repo: string } {
    const matches = /github\.com\/([\w-_.]+)\/([\w-_.]+)/.exec(githubUrl)
    if (!matches) {
        throw new Error(`Failed to match GitHub url ${githubUrl}`)
    }

    return {
        owner: matches[1],
        repo: matches[2],
    }
}

async function getOpenGraphImage(project: Project): Promise<string | null> {
    if (project.isPrivate) {
        return null
    }

    try {
        console.info(`Fetching og:image of ${project.repo}`)
        const res = await axios.get<string>(project.repo)

        const html = res.data
        const jsdom = new JSDOM(html)
        const ogImageTag = jsdom.window.document.querySelector('meta[property="og:image"]')
        if (!ogImageTag) {
            throw new Error(`Failed to get og:image for repo:${project.repo}`)
        }

        return ogImageTag.getAttribute('content')
    } catch (err) {
        console.warn('getOpenGraphImage Failed')
        if (axios.isAxiosError(err)) {
            console.warn(err.message)
        }
    }

    return null
}
