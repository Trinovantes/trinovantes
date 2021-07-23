<template>
    <div class="code-block">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <button title="Copy code to clipboard" @click="copyToClipboard" v-html="copyIcon" />

        <!-- eslint-disable-next-line vue/no-v-html -->
        <pre :class="className"><code v-html="highlightedCode" /></pre>
    </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent, watch } from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/stackoverflow-light.css'
import { getIconSvgRaw } from '@/web/utils/ResponsiveLoader'
import { sleep } from '@/common/utils/sleep'

export default defineComponent({
    props: {
        code: {
            type: String,
            required: true,
        },
        language: {
            type: String,
            default: '',
        },
        autoDetect: {
            type: Boolean,
            default: true,
        },
        ignoreIllegals: {
            type: Boolean,
            default: true,
        },
    },
    setup(props) {
        const language = ref(props.language)
        watch(() => props.language, (newLanguage) => {
            language.value = newLanguage
        })

        const autoDetect = computed(() => !language.value && props.autoDetect)
        const cannotDetectLanguage = computed(() => !autoDetect.value && !hljs.getLanguage(language.value))

        const className = computed((): string => {
            let cssClass = ''

            if (!cannotDetectLanguage.value) {
                cssClass += 'hljs'
            }

            if (language.value) {
                cssClass += ' ' + language.value
            }

            return cssClass
        })

        const highlightedCode = ref<string>()
        const updateCode = () => {
            // No idea what language to use, return raw code
            if (cannotDetectLanguage.value) {
                console.warn(`The language "${language.value}" you specified could not be found.`)
                highlightedCode.value = escapeHtml(props.code)
                return
            }

            if (autoDetect.value) {
                const result = hljs.highlightAuto(props.code)
                language.value = result.language ?? ''
                highlightedCode.value = result.value
            } else {
                const result = hljs.highlight(props.code, {
                    language: language.value,
                    ignoreIllegals: props.ignoreIllegals,
                })
                highlightedCode.value = result.value
            }
        }

        watch([cannotDetectLanguage, autoDetect, props], updateCode, { deep: true })
        updateCode()

        const isOnClipboard = ref(false)
        const copyIcon = computed<string>(() => {
            if (isOnClipboard.value) {
                return getIconSvgRaw('done')
            }

            return getIconSvgRaw('copy')
        })
        const copyToClipboard = async() => {
            await navigator.clipboard.writeText(props.code)

            // Update icon temporarily
            isOnClipboard.value = true
            await sleep(3000)
            isOnClipboard.value = false
        }

        return {
            className,
            highlightedCode,
            getIconSvgRaw,
            copyToClipboard,
            isOnClipboard,
            copyIcon,
        }
    },
})

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
}
</script>

<style lang="scss">
.code-block{
    position: relative;

    button{
        $size: $padding * 3;

        border: 1px solid #aaa;
        border-radius: math.div($padding, 2);
        background: #eee;
        display: flex;
        align-items: center;
        justify-content: center;
        width: $size; height: $size;

        position: absolute;
        top: $padding * 2; right: $padding * 2;

        cursor: pointer;
        opacity: 0;
        transition: 1s;

        &:hover{
            background: #ccc;
        }

        svg{
            width: math.div($size, 2);
            height: math.div($size, 2);
        }
    }

    &:hover{
        button{
            opacity: 1;
        }
    }

    pre.hljs{
        line-height: 1.25;

        code{
            background: unset;
            border-radius: unset;
            padding: 0;
        }
    }
}
</style>
