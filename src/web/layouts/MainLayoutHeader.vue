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

<template>
    <header class="main-layout-header">
        <div class="container">
            <router-link to="/" class="home-btn">
                {{ APP_NAME }}
            </router-link>

            <div class="hspace" />

            <nav>
                <router-link to="/about">
                    About
                </router-link>
                <router-link to="/blog">
                    Blog
                </router-link>
                <router-link to="/projects">
                    Projects
                </router-link>
            </nav>
        </div>
    </header>
</template>

<style lang="scss">
.main-layout-header{
    background: $dark;
    line-height: $header-line-height;

    .container{
        display: flex;
        padding-left: $padding;
        padding-right: $padding;

        @media (max-width: $mobile-breakpoint) {
            flex-direction: column;
            padding: 0;
        }
    }

    a{
        text-decoration: none;
        transition: 0.5s;
    }

    a.home-btn{
        color: white;
        font-size: 1.5rem;
        font-weight: 900;

        align-items: center;
        display: flex;
        padding: $padding;

        &:hover{
            color: $primary-on-dark;
        }

        @media (max-width: $mobile-breakpoint) {
            justify-content: center;
            padding: $padding * 2;
        }
    }

    nav{
        display: flex;
        overflow: hidden;

        @media (max-width: $mobile-breakpoint) {
            > *{
                flex: 1;
            }
        }

        a{
            color: $light-on-dark;
            font-size: 1rem;
            font-weight: bold;

            display: block;
            line-height: $header-height;
            padding: 0 $padding;
            position: relative;

            @media (max-width: $mobile-breakpoint) {
                text-align: center;
            }

            &:after{
                opacity: 0;

                background: $primary-on-dark;
                content: '';
                display: block;
                position: absolute;
                top: 0; left: 0;
                width: 100%; height: math.div($padding, 4);
            }

            &.router-link-exact-active,
            &:hover{
                color: $primary-on-dark;

                &:after{
                    opacity: 1;
                }
            }

            &:not(.router-link-exact-active):hover{
                &:after{
                    animation-name: fadeInDown;
                    animation-duration: 0.5s;
                }
            }
        }
    }
}
</style>
