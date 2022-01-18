<template>
    <footer class="main-layout-footer">
        <div class="container">
            &copy; {{ APP_NAME }}
        </div>
    </footer>
</template>

<script lang="ts">
import { APP_NAME } from '@/common/Constants'
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        return {
            APP_NAME,
        }
    },
})
</script>

<style lang="scss">
.main-layout-footer{
    background: $dark;
    color: $light-on-dark;
    padding: $padding * 2;

    font-size: 1rem;
    line-height: $footer-line-height;
    text-align: center;
}
</style>
