<template>
    <article
        v-for="[category, categoryProjects] of Object.entries(projects)"
        :key="category"
        class="container project-category"
    >
        <h1>
            {{ category }}
        </h1>

        <section
            v-for="project of categoryProjects"
            :key="project.name"
            class="project"
        >
            <div class="preview">
                <SimpleImage
                    :img="getImage(project.img)"
                    :title="project.name"
                    :enable-zoom="false"
                />
            </div>

            <div class="desc">
                <h2>
                    {{ project.name }}
                </h2>

                <div class="links">
                    <a
                        v-if="project.url"
                        :href="project.url"
                    >
                        <!-- eslint-disable-next-line vue/no-v-html -->
                        <span class="icon" v-html="getIconSvgRaw('open')" />

                        {{ formatUrl(project.url) }}
                    </a>

                    <a
                        v-if="project.repo && !project.isPrivate"
                        :href="project.repo"
                    >
                        <!-- eslint-disable-next-line vue/no-v-html -->
                        <span class="icon" v-html="getIconSvgRaw('github')" />

                        GitHub
                    </a>
                </div>

                <p>
                    {{ project.desc }}
                </p>

                <div class="tech">
                    <span
                        v-for="tech of project.tech"
                        :key="tech"
                    >
                        {{ tech }}
                    </span>
                </div>
            </div>
        </section>
    </article>
</template>

<script lang="ts">
import { Projects } from '@/common/Project'
import { defineComponent, useSSRContext } from 'vue'
import { HydrationKey, loadStateFromDom } from '@/web/utils/hydration'
import axios from 'axios'
import { getIconSvgRaw, ResponsiveImage } from '@/web/utils/ResponsiveLoader'
import { useMeta } from 'vue-meta'
import { createPageHeadOptions, TwitterCard } from '@/web/utils/PageHeadOptions'
import { AppContext } from '@/web/app'

export default defineComponent({
    name: 'ProjectPage',

    async setup() {
        const title = 'Projects'

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const img = require('@/web/assets/img/profile.jpg?size=200') as ResponsiveImage

        useMeta(createPageHeadOptions({
            title,
            image: img.src,
            imageSize: TwitterCard.Summary,
        }))

        const getImage = (fileName: string): ResponsiveImage => {
            if (fileName.startsWith('https')) {
                return {
                    src: fileName,
                    width: 0,
                    height: 0,
                }
            }

            // eslint-disable-next-line @typescript-eslint/no-var-requires
            return require(`./img/${fileName}`) as ResponsiveImage
        }

        const formatUrl = (url: string): string => {
            return url.replace(/https:\/\/(www\.)?/, '')
        }

        const projects = await loadProjects()

        return {
            projects,
            getImage,
            formatUrl,
            getIconSvgRaw,
        }
    },
})

async function loadProjects(): Promise<Projects> {
    let projects: Projects | undefined

    if (DEFINE.IS_SSR) {
        const ssrContext = useSSRContext()
        projects = (ssrContext as AppContext).projects
    } else {
        projects = loadStateFromDom<Projects>(HydrationKey.Projects)

        if (DEFINE.IS_DEV && projects === undefined) {
            const res = await axios.get<Projects>('/api/projects')
            projects = res.data
        }
    }

    return projects ?? {}
}
</script>

<style lang="scss">
article.project-category{
    display: flex;
    flex-direction: column;
    gap: $column-gap;
    margin-top: $vspace;
    margin-bottom: $vspace;

    .project{
        display: grid;
        gap: $column-gap;
        grid-template-columns: 50% 1fr;

        @media (max-width: $big-mobile-breakpoint) {
            gap: $padding * 2;
            grid-template-columns: 1fr;
        }

        .preview{
            .simple-image{
                border: math.div($padding, 2) solid $dark;
            }
        }

        .desc{
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: $padding;

            .links{
                display: flex;
                flex-direction: column;
                gap: $padding;

                a{
                    $icon-size: $padding * 1.5;

                    align-items: center;
                    display: flex;
                    gap: math.div($padding, 2);
                    line-height: $icon-size;

                    .icon{
                        align-items: center;
                        display: flex;

                        svg{
                            width: $icon-size;
                            height: $icon-size;
                        }
                    }
                }
            }

            .tech{
                display: flex;
                flex-wrap: wrap;
                gap: math.div($padding, 2) $padding;

                span{
                    color: lighten($dark, 30%);
                    font-size: 1rem;
                }
            }

            p{
                line-height: 1.618;
            }
        }
    }
}
</style>
