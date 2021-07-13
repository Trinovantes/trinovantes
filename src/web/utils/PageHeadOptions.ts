import { MetaSource } from 'vue-meta'
import { APP_NAME } from '@/common/Constants'
import { merge } from 'lodash'

export enum TwitterCard {
    Summary = 'summary',
    Large = 'summary_large_image',
}

export interface PageHeadOptions {
    title: string
    desc?: string | null
    image?: string | null
    imageSize?: TwitterCard | null
}

export function createPageHeadOptions(options: PageHeadOptions): MetaSource {
    const title = options.title === APP_NAME
        ? APP_NAME
        : `${options.title} | ${APP_NAME}`

    const headOptions: Record<string, string | Record<string, string>> = {
        title,
        og: {
            title: title.replace(/"/g, '&quot;'),
        },
        twitter: {
            title: title.replace(/"/g, '&quot;'),
        },
    }

    const description = options.desc?.replace(/"/g, '&quot;')
    if (description) {
        merge(headOptions, {
            description,
            og: {
                description,
            },
            twitter: {
                description,
            },
        })
    }

    const image = options.image
    if (image) {
        merge(headOptions, {
            og: {
                image,
            },
            twitter: {
                card: options.imageSize ?? TwitterCard.Large,
                image,
            },
        })
    }

    return headOptions
}
