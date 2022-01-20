<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        //
    },
})
</script>

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
