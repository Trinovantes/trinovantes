export enum Tech {
    // General
    CPP = 'C++',

    // Frontend
    Typescript = 'Typescript',
    VueJs = 'Vue.js',
    Canvas = 'Canvas',

    // Backend
    NodeJs = 'Node.js',
    ExpressJs = 'Express.js',
    Sqlite = 'Sqlite',

    // Devops
    Docker = 'Docker',
    Nginx = 'Nginx',
}

export interface Project {
    name: string
    repo: string
    isPrivate?: boolean // Do not show repo url on frontend if private
    tech: Array<Tech>

    // Populated from GitHub
    desc?: string
    url?: string
    img?: string
}

export enum ProjectCategory {
    Web = 'Web Apps',
    Userscript = 'Userscripts',
    Misc = 'Misc. Projects',
}

export type Projects = Record<string, Array<Project>>

export const projects: Projects = {
    [ProjectCategory.Web]: [
        {
            name: 'HoloMemes',
            repo: 'https://github.com/Trinovantes/HoloMemes',
            img: 'holomemes.jpg',
            isPrivate: true,
            tech: [
                Tech.Typescript,
                Tech.VueJs,
                Tech.Canvas,
                Tech.Docker,
                Tech.Nginx,
            ],
        },
        {
            name: 'WoWPay2Win',
            repo: 'https://github.com/Trinovantes/WoWPay2Win',
            tech: [
                Tech.Typescript,
                Tech.VueJs,
                Tech.Docker,
                Tech.Nginx,
            ],
        },
        {
            name: 'MAL Cover CSS',
            repo: 'https://github.com/Trinovantes/MAL-Cover-CSS',
            tech: [
                Tech.Typescript,
                Tech.NodeJs,
                Tech.Sqlite,
                Tech.ExpressJs,
                Tech.VueJs,
                Tech.Docker,
                Tech.Nginx,
            ],
        },
    ],

    [ProjectCategory.Userscript]: [
        {
            name: 'Delete Workflow Runs',
            repo: 'https://github.com/Trinovantes/userscript-delete-workflow-runs',
            tech: [
                Tech.Typescript,
                Tech.VueJs,
            ],
        },
        {
            name: 'YouTube Playlist Organizer',
            repo: 'https://github.com/Trinovantes/userscript-youtube-playlist-organizer',
            tech: [
                Tech.Typescript,
            ],
        },
        {
            name: 'GitHub Repository Categories',
            repo: 'https://github.com/Trinovantes/userscript-github-repository-categories',
            tech: [
                Tech.Typescript,
                Tech.VueJs,
            ],
        },
        {
            name: 'WoWProgress Character Page',
            repo: 'https://github.com/Trinovantes/userscript-wowprogress-character-page',
            tech: [
                Tech.Typescript,
                Tech.VueJs,
            ],
        },
    ],

    [ProjectCategory.Misc]: [
        {
            name: 'Puppeteer Prerender Plugin',
            repo: 'https://github.com/Trinovantes/puppeteer-prerender-plugin',
            tech: [
                Tech.Typescript,
            ],
        },
        {
            name: 'capted',
            repo: 'https://github.com/Trinovantes/capted',
            tech: [
                Tech.CPP,
            ],
        },
    ],
}
