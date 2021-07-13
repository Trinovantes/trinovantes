<template>
    <suspense>
        <template #default>
            <App />
        </template>
    </suspense>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import App from './App.vue'

export default defineComponent({
    components: {
        App,
    },
})
</script>
