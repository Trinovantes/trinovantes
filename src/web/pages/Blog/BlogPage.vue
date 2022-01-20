<script lang="ts">
import { createPageHeadOptions, TwitterCard } from '@/web/utils/PageHeadOptions'
import { ResponsiveImage } from '@/web/utils/ResponsiveLoader'
import { defineComponent } from 'vue'
import { useMeta } from 'vue-meta'
import BlogList from '@/web/components/BlogList/BlogList.vue'

export default defineComponent({
    components: {
        BlogList,
    },

    setup() {
        const title = 'Blog'
        const desc = "I sometimes write about interesting stuff I've encountered in life"

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const img = require('@/web/assets/img/profile.jpg?size=200') as ResponsiveImage

        useMeta(createPageHeadOptions({
            title,
            desc,
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
            <BlogList />
        </section>
    </article>
</template>
