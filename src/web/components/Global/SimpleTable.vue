<template>
    <figure class="simple-table">
        <table>
            <template
                v-for="[rowIdx, row] of data.entries()"
                :key="rowIdx"
            >
                <thead v-if="rowIdx === 0">
                    <tr>
                        <td
                            v-for="[colIdx, col] of row.entries()"
                            :key="colIdx"
                        >
                            {{ col }}
                        </td>
                    </tr>
                </thead>
                <tbody v-else>
                    <tr>
                        <td
                            v-for="[colIdx, col] of row.entries()"
                            :key="colIdx"
                        >
                            {{ col }}
                        </td>
                    </tr>
                </tbody>
            </template>
        </table>
    </figure>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    props: {
        data: {
            type: Object as PropType<Array<Array<unknown>>>,
            required: true,
        },
    },
})
</script>

<style lang="scss">
figure.simple-table{
    table{
        margin: 0 auto;
    }
}
</style>
