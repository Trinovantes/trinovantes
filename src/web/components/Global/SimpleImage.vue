<template>
    <div
        ref="simpleImageContainer"
        class="simple-image"
        :style="{
            backgroundSize: 'cover',
            backgroundImage: (!isReady && img.placeholder) ? `url('${img.placeholder}')` : 'none'
        }"
    >
        <figure>
            <picture>
                <source
                    :srcset="img.srcSet"
                    :sizes="sizes"
                >
                <img
                    ref="image"
                    :src="img.src"
                    :width="(width ?? img.width) || null"
                    :height="(height ?? img.height) || null"
                    :sizes="sizes"
                    :title="title"
                    :alt="title"
                    loading="lazy"
                >
            </picture>

            <figcaption v-if="$slots.default">
                <slot />
            </figcaption>

            <ClientOnly>
                <div v-if="!isReady" class="spinner-wrapper">
                    <div class="spinner" />
                </div>
            </ClientOnly>
        </figure>
    </div>
</template>

<script lang="ts">
import { ResponsiveImage } from '@/web/utils/ResponsiveLoader'
import { defineComponent, onBeforeUnmount, onMounted, PropType, ref } from 'vue'
import mediumZoom from 'medium-zoom'

export default defineComponent({
    props: {
        img: {
            type: Object as PropType<ResponsiveImage>,
            required: true,
        },
        title: {
            type: String as PropType<string | null>,
            default: null,
        },
        width: {
            type: Number,
            default: null,
        },
        height: {
            type: Number,
            default: null,
        },
        sizes: {
            type: String,
            default: '100vw',
        },
        enableAnimation: {
            type: Boolean,
            default: false,
        },
        enableZoom: {
            type: Boolean,
            default: true,
        },
    },

    setup(props) {
        const simpleImageContainer = ref<HTMLDivElement | null>(null)
        let observer: IntersectionObserver | null = null
        onMounted(() => {
            if (!simpleImageContainer.value) {
                throw new Error('Cannot find simpleImageContainer ref')
            }

            observer = new IntersectionObserver((entries) => {
                if (!props.enableAnimation) {
                    return
                }

                if (!entries[0].isIntersecting) {
                    return
                }

                simpleImageContainer.value?.classList.add('animate__animated')
                simpleImageContainer.value?.classList.add('animate__fadeInUp')
            })
            observer.observe(simpleImageContainer.value)
        })
        onBeforeUnmount(() => {
            observer?.disconnect()
        })

        const image = ref<HTMLImageElement | null>(null)
        const isReady = ref(false)
        onMounted(() => {
            if (!image.value) {
                throw new Error('Cannot find image ref')
            }

            isReady.value = image.value.complete
            image.value.onload = () => {
                isReady.value = true
            }
        })
        onMounted(() => {
            if (!props.enableZoom) {
                return
            }

            if (!image.value) {
                throw new Error('Cannot find image ref')
            }

            mediumZoom(image.value)
        })

        return {
            simpleImageContainer,
            image,
            isReady,
        }
    },
})
</script>

<style lang="scss">
div.simple-image{
    display: block;
    overflow: hidden;

    figure{
        position: relative;

        picture{
            display: block;

            img{
                display: block;
                height: auto;
                margin: 0 auto;
                max-width: 100%;
                object-fit: cover;
            }
        }

        figcaption{
            font-size: 90%;
            padding-top: $padding;
            text-align: center;
        }

        .spinner-wrapper{
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
        }
    }
}
</style>
