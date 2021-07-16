<template>
    <metainfo />

    <router-view v-slot="{ Component }">
        <template v-if="Component">
            <suspense>
                <component :is="Component" />
            </suspense>
        </template>
    </router-view>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
    setup() {
        onMounted(() => {
            // Create <base> onMounted so that we know Vue is active and will intercept clicks to router-links instead of opening a new tab
            const base = document.createElement('base')
            base.target = '_blank'
            document.querySelector('head')?.appendChild(base)
        })
    },
})
</script>
