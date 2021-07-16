<template>
    <div
        :class="{
            contact: true,
            dark: isDark,
        }"
    >
        <div
            v-for="contact of CONTACTS"
            :key="contact.label"
            class="link"
        >
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div :class="`icon ${slugify(contact.service)}`" v-html="getIconSvgRaw(slugify(contact.service))" />

            <a
                :href="contact.url"
                :title="contact.service"
            >
                {{ contact.label }}
            </a>
        </div>
    </div>
</template>

<script lang="ts">
import { CONTACTS } from '@/common/Constants'
import { slugify } from '@/common/utils/slugify'
import { getIconSvgRaw } from '@/web/utils/ResponsiveLoader'
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        isDark: {
            type: Boolean,
            default: false,
        },
    },

    setup() {
        return {
            CONTACTS,
            slugify,
            getIconSvgRaw,
        }
    },
})
</script>

<style lang="scss">
.contact{
    display: flex;
    flex-direction: column;
    gap: $padding;

    .link{
        $icon-size: $padding * 1.5;

        align-items: center;
        display: flex;
        gap: $padding;
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

    &.dark{
        a{
            color: white;
        }

        .icon{
            &.email{
                svg{
                    fill: white;
                }
            }

            &.github,
            &.twitter{
                path{
                    fill: white;
                }
            }
        }
    }
}
</style>
