<template>
    <Header />
    <main class="full-height-container">
        <router-view />
    </main>
    <Footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from './Header.vue'
import Footer from './Footer.vue'

export default defineComponent({
    name: 'MainLayout',

    components: {
        Header,
        Footer,
    },
})
</script>

<style lang="scss">
.container{
    margin-left: auto;
    margin-right: auto;
    max-width: $max-page-width;
    padding-left: $padding * 2;
    padding-right: $padding * 2;
    width: 80%;

    @media (max-width: $mobile-breakpoint) {
        width: 100%;
    }
}

.full-height-container{
    min-height: calc(100vh - #{$header-height} - #{$footer-height});

    @media (max-width: $mobile-breakpoint) {
        min-height: calc(100vh - #{$header-height-mobile} - #{$footer-height});
    }
}

.vertical-container{
    display: flex;
    gap: $padding * 2;

    flex-direction: column;
    justify-content: center;
}

.text-container{
    padding-top: $vspace;
    padding-bottom: $vspace;

    display: grid;
    gap: $column-gap;
    grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);

    &.full-width{
        grid-template-columns: minmax(0, 1fr);
    }

    &.left-sidebar{
        grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
    }

    @media (max-width: $mobile-breakpoint) {
        grid-template-columns: minmax(0, 1fr);
    }

    > h1{
        grid-column: 1 / -1;
        margin: 0;
    }

    h2, h3, h4, h5, h6,
    p,
    pre,
    ul,
    ol,
    figure,
    .grid,
    .callout{
        margin: ($padding * 2) 0;

        &:first-child{
            margin-top: 0;
        }

        &:last-child{
            margin-bottom: 0;
        }
    }

    h2, h3, h4, h5, h6{
        margin-top: ($padding * 4);

        & + h2,
        & + h3,
        & + h4,
        & + h5,
        & + h6{
            margin-top: $padding * 2;
        }
    }

    h2{
        position: relative;

        &:before{
            background: $dark;
            content: '';
            display: block;
            width: math.div($padding, 2); height: 100%;
            position: absolute;
            top: 0; left: -($padding * 2);
        }
    }

    ul, ol{
        padding-left: $padding * 2;

        ul, ol{
            margin: $padding 0 !important;
        }
    }
    ul{
        list-style-type: disc;
    }
    ol{
        list-style-type: decimal;
    }

    em{
        font-style: italic;
    }

    strong{
        font-weight: bold;
    }

    code{
        background: $light-on-light;
        border-radius: math.div($padding, 4);
        font-family: 'Courier New', Courier, monospace;
        padding: math.div($padding, 4) math.div($padding, 2);
    }

    table{
        thead{
            font-weight: bold;

            tr{
                border-top: 1px solid;
            }
        }

        tr{
            border-bottom: 1px solid;
        }

        td{
            padding: math.div($padding, 2) $padding;
        }
    }

    .grid{
        display: grid;
        gap: $padding * 2;

        > *{
            margin: 0 !important;
        }
    }

    @for $i from 2 through 6{
        .grid-#{$i}{
            grid-template-columns: repeat(#{$i}, 1fr);
        }
    }

}
</style>
