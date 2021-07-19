import { Chunk } from 'webpack'
import { isDev } from './webpack.common'

let chunkNameCounter = 0
const chunkNameMap = new Map<string, number>()

export function createOutputNameFn(ext: string): (pathData: unknown) => string {
    const suffix = isDev
        ? ext
        : `[contenthash].${ext}`

    return (pathData): string => {
        const data = pathData as { chunk: Chunk }
        const chunkId = String(data.chunk.id)

        if (chunkId.startsWith('vendors')) {
            return `vendors.[contenthash].${ext}`
        }

        if (chunkId.endsWith('_vue')) {
            const pathParts = chunkId.split('_').reverse()
            const fileName = (pathParts[1] === 'index')
                ? pathParts[2]
                : pathParts[1]

            return `${fileName}.${suffix}`
        }

        let id = chunkNameMap.get(chunkId)
        if (id === undefined) {
            chunkNameCounter += 1
            id = chunkNameCounter
            chunkNameMap.set(chunkId, id)
        }

        return `${id}.${suffix}`
    }
}
