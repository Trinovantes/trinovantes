<template>
    <article class="home-page">
        <div class="container full-height-container vertical-container">
            <h1 class="animate__animated animate__fadeInUp">
                {{ APP_NAME }}
            </h1>

            <h2 class="animate__animated animate__fadeInUp">
                {{ APP_DESC }}
            </h2>

            <Contact
                class="animate__animated animate__fadeInUp"
                :is-dark="true"
            />
        </div>
    </article>
</template>

<script lang="ts">
import { APP_NAME, APP_DESC, CONTACTS } from '@/common/Constants'
import { slugify } from '@/common/utils/slugify'
import { createPageHeadOptions, TwitterCard } from '@/web/utils/PageHeadOptions'
import { ResponsiveImage } from '@/web/utils/ResponsiveLoader'
import { defineComponent } from 'vue'
import { useMeta } from 'vue-meta'
import Contact from '@/web/components/Contact/Contact.vue'

export default defineComponent({
    name: 'HomePage',

    components: {
        Contact,
    },

    setup() {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const img = require('@/web/assets/img/profile.jpg?size=200') as ResponsiveImage

        useMeta(createPageHeadOptions({
            title: APP_NAME,
            desc: APP_DESC,
            image: img.src,
            imageSize: TwitterCard.Summary,
        }))

        return {
            APP_NAME,
            APP_DESC,
            CONTACTS,
            slugify,
        }
    },
})
</script>

<style lang="scss">
article.home-page{
    background: lighten($dark, 10%);
    color: white;

    .container{
        padding-top: $padding * 2;
        padding-bottom: $padding * 2;
    }

    h1{
        color: $primary-on-dark;
        font-size: 6rem;
        font-weight: 900;

        @media (max-width: $big-mobile-breakpoint) {
            font-size: 4.2rem;
        }

        @media (max-width: $mobile-breakpoint) {
            font-size: 3rem;
        }
    }

    h2{
        color: $light-on-dark;
        font-weight: normal;
        font-size: 3rem;

        @media (max-width: $big-mobile-breakpoint) {
            font-size: 2.4rem;
        }

        @media (max-width: $mobile-breakpoint) {
            font-size: 1.5rem;
        }
    }

    a{
        font-size: 1.5rem;
        line-height: $padding * 2;

        @media (max-width: $mobile-breakpoint) {
            font-size: 1rem;
            line-height: 1;
        }
    }
}
</style>
