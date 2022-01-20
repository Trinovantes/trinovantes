<script lang="ts">
import { createPageHeadOptions, TwitterCard } from '@/web/utils/PageHeadOptions'
import { ResponsiveImage } from '@/web/utils/ResponsiveLoader'
import { defineAsyncComponent, defineComponent } from 'vue'
import { useMeta } from 'vue-meta'

export default defineComponent({
    components: {
        BlogList: defineAsyncComponent(() => import('@/web/components/BlogList/BlogList.vue')),
    },

    setup() {
        const title = '404: Page Not Found'

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const img = require('@/web/assets/img/profile.jpg?size=200') as ResponsiveImage

        useMeta(createPageHeadOptions({
            title,
            image: img.src,
            imageSize: TwitterCard.Summary,
        }))

        return {
            title,
        }
    },
})
</script>

<template>
    <article class="container text-container full">
        <h1>
            {{ title }}
        </h1>

        <section>
            <h2>
                Pages
            </h2>
            <ul>
                <li>
                    <router-link to="/">Home</router-link>
                </li>
                <li>
                    <router-link to="/about">About</router-link>
                </li>
                <li>
                    <router-link to="/blog">Blog</router-link>
                </li>
                <li>
                    <router-link to="/projects">Projects</router-link>
                </li>
            </ul>

            <h2>Blog</h2>
            <BlogList />
        </section>
    </article>
</template>
