<script lang="ts">
import { slugify } from '@/common/utils/slugify'
import { getIconSvgRaw } from '@/web/utils/ResponsiveLoader'
import { computed, defineComponent, h } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
    props: {
        size: {
            type: Number,
            default: 2,
        },
        disableLink: {
            type: Boolean,
            default: false,
        },
    },

    setup(props, { slots }) {
        const route = useRoute()
        const enableLink = computed(() => !props.disableLink && props.size <= 3) // h3 or lower

        return () => {
            const childNodes = slots.default?.()
            const slug = (() => {
                let text = ''
                for (const node of childNodes ?? []) {
                    if (typeof node.children !== 'string') {
                        continue
                    }

                    text += node.children
                }

                return slugify(text)
            })()

            return h(
                `h${props.size}`,
                {
                    id: slug,
                    class: 'linked-heading',
                },
                [
                    childNodes,
                    enableLink.value && h(
                        'a',
                        {
                            href: `${route.path}#${slug}`,
                            title: 'Link to this section',
                            innerHTML: getIconSvgRaw('link'),
                        },
                    ),
                ],
            )
        }
    },
})
</script>

<style lang="scss">
.linked-heading{
    a{
        opacity: 0;
    }

    &:hover{
        a{
            opacity: 1;
        }
    }
}
</style>
