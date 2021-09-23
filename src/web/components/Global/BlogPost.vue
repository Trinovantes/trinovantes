<template>
    <article class="blog-post">
        <div
            class="hero-unit"
            :style="{
                'background-image': image ? `url('${image}')` : undefined
            }"
        >
            <h1 class="container">
                {{ title }}
            </h1>

            <div class="container">
                <section class="meta">
                    <time
                        v-for="dateInfo of dateInfos"
                        :key="dateInfo.date"
                        :datetime="dateInfo.date"
                    >
                        {{ dateInfo.label }}
                    </time>
                </section>
            </div>
        </div>

        <div
            :class="{
                'container': true,
                'text-container': true,
                'full': !$slots.sidebar
            }"
        >
            <slot name="top" />

            <section>
                <slot />
            </section>
            <aside v-if="$slots.sidebar">
                <slot name="sidebar" />
            </aside>
        </div>
    </article>
</template>

<script lang="ts">
import { formatDate, formatDateDisplay } from '@/common/utils/formatDate'
import { createPageHeadOptions } from '@/web/utils/PageHeadOptions'
import { Dayjs } from 'dayjs'
import { computed, defineComponent, PropType } from 'vue'
import { useMeta } from 'vue-meta'

interface DateInfo {
    date: string
    label: string
}

export default defineComponent({
    props: {
        title: {
            type: String,
            required: true,
        },
        image: {
            type: String as PropType<string | null>,
            default: null,
        },
        createdAt: {
            type: Object as PropType<Dayjs>,
            required: true,
        },
        updatedAt: {
            type: Object as PropType<Dayjs | null>,
            default: null,
        },
    },

    setup(props) {
        useMeta(computed(() => {
            return createPageHeadOptions({
                title: props.title,
                image: props.image,
            })
        }))

        const dateInfos = computed<Array<DateInfo>>(() => {
            const dateInfos: Array<DateInfo> = [
                {
                    date: formatDate(props.createdAt),
                    label: `Published on ${formatDateDisplay(props.createdAt)}`,
                },
            ]

            if (props.updatedAt) {
                dateInfos.push({
                    date: formatDate(props.updatedAt),
                    label: `Last update on ${formatDateDisplay(props.updatedAt)}`,
                })
            }

            return dateInfos
        })

        return {
            dateInfos,
        }
    },
})
</script>

<style lang="scss">
.blog-post{
    .hero-unit{
        background-color: lighten($dark, 10%);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        padding: $vspace 0;

        h1{
            color: white;
            text-shadow: 0 math.div($padding, 8) math.div($padding, 4) rgba($dark, 0.8);
        }
    }

    .meta{
        display: flex;
        gap: $padding;
        margin-top: $padding * 2;

        time{
            background: rgba($dark, 0.8);
            color: white;
            padding: math.div($padding, 2) $padding;
        }

        @media (max-width: $mobile-breakpoint) {
            flex-direction: column;
        }
    }

    figure{
        background: #f6f6f6;
        padding: $padding * 2;

        figcaption{
            font-style: italic;
        }
    }
}
</style>
