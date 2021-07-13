<template>
    <article class="container text-container full-width">
        <h1>404: Page Not Found</h1>

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
            <BlogPosts />
        </section>
    </article>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue'

export default defineComponent({
    name: '404Page',

    components: {
        BlogPosts: defineAsyncComponent(() => import('@/web/components/BlogPosts/BlogPosts.vue')),
    },
})
</script>
