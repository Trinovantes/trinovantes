<template>
    <article class="container text-container full-width">
        <h1>
            {{ title }}
        </h1>

        <section>
            <BlogPosts />
        </section>
    </article>
</template>

<script lang="ts">
import { createPageHeadOptions, TwitterCard } from '@/web/utils/PageHeadOptions'
import { ResponsiveImage } from '@/web/utils/ResponsiveLoader'
import { defineComponent } from 'vue'
import { useMeta } from 'vue-meta'
import BlogPosts from '@/web/components/BlogPosts/BlogPosts.vue'

export default defineComponent({
    name: 'BlogPage',

    components: {
        BlogPosts,
    },

    setup() {
        const title = 'Blog'

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
