export interface ResponsiveImage {
    src: string
    width: number
    height: number

    srcSet?: string
    placeholder?: string
}

export function getIconSvgRaw(icon: string): string {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require(`@/web/assets/img/icons/${icon}.svg`) as string
}
