<script lang="ts">
import { defineComponent } from 'vue'
import { formatDate } from '@/common/utils/formatDate'
import { getBlogPosts } from '@/web/pages/Blog/getBlogPosts'

export default defineComponent({
    setup() {
        const blogPosts = getBlogPosts()

        return {
            blogPosts,
            formatDate,
        }
    },
})
</script>

<template>
    <ul class="blog-posts dates">
        <li
            v-for="blogPost of blogPosts"
            :key="blogPost.slug"
        >
            <time :datetime="formatDate(blogPost.createdAt)">
                {{ formatDate(blogPost.createdAt) }}
            </time>

            <router-link :to="`${blogPost.slug}`">
                {{ blogPost.title }}
            </router-link>
        </li>
    </ul>
</template>

<style lang="scss">
ul.blog-posts{
    list-style: none;
    padding: 0;

    li{
        line-height: 2;
    }

    &.dates{
        li{
            display: grid;
            grid-template-columns: auto 1fr;
            gap: $padding;

            time{
                font-family: 'Courier New', Courier, monospace;
                white-space: nowrap;
            }
        }
    }
}
</style>
