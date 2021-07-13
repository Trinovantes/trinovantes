export function slugify(name: string | null): string {
    let slug = name ?? ''
    slug = slug.trim()
    slug = slug.toLowerCase()
    slug = slug.replace(/\s/g, '-')
    slug = slug.replace(/-+/g, '-')
    slug = slug.replace(/[^a-zA-Z0-9-]/g, '')
    return slug
}
