<template>
    <article class="container text-container about-page">
        <h1>
            {{ title }}
        </h1>

        <section>
            <p>
                {{ desc }}
            </p>

            <p>
                I got interested in programming back in <em :title="yearsSinceStartedProgramming">grade 6</em> when I found a "How to build your own website" book from my local library.
            </p>

            <p>
                I completed my Bachelor of Software Engineering (<strong>B.SE</strong>) in 2016 from University of Waterloo.
                I then studied under <a href="https://patricklam.ca">Patrick Lam</a> and received my Masters of Mathematics (<strong>MMath</strong>) in 2019.
                My <a href="https://github.com/Trinovantes/masters">masters thesis</a> explores the process of automating student assignment grading through static analysis in LLVM.
            </p>

            <h2>Interesting stuff I've done in school:</h2>

            <ul>
                <li>Built the frontend for <a href="https://github.com/SanaMobile/sana.protocol_builder">Sana medical procedure editor</a> using Backbone.js and Marionette.js for my undergrad capstone project (2015-2016)</li>
                <li>Wrote a ray tracer with refractions, bounded volume hierarchy optimization, depth of field, soft shadows, texture and bump mapping, etc. (July 2015)</li>
                <li>Wrote an OS kernel for a Cortex M3 board (Mar 2014)</li>
                <li>Wrote a MIPS compiler and assembler for a subset of C (Nov 2012)</li>
                <li>Built a <a href="https://github.com/Trinovantes/2D-Shooter">2D scrolling shooter game</a> with C# and XNA (June 2011)</li>
                <li>Served as my high school yearbook's Editor-in-Chief (2010-2011)</li>
            </ul>

            <h2>Internships during my undergrad:</h2>

            <p>
                During my undergrad, I've alternated between four months of school and four months of internships (co-ops).
                This allowed me to gain real-world experience and to apply the theoretical concepts learned in class.
            </p>

            <ul>
                <li>Rocscience (Jan 2015 - Apr 2015)</li>
                <li>Lookout (May 2014 - Aug 2014)</li>
                <li>IBM (Sept 2013 - Dec 2013)</li>
                <li>500px (Jan 2013 - Apr 2013)</li>
                <li>Pilot Interactive (May 2012 - Aug 2012)</li>
            </ul>
        </section>

        <aside>
            <SimpleImage
                :img="require('@/web/assets/img/profile.jpg?size=400')"
                :enable-zoom="false"
                title="Stephen Li"
                class="profile"
            />

            <Contact />
        </aside>
    </article>
</template>

<script lang="ts">
import { createPageHeadOptions, TwitterCard } from '@/web/utils/PageHeadOptions'
import { ResponsiveImage } from '@/web/utils/ResponsiveLoader'
import { defineComponent, onMounted, ref } from 'vue'
import { useMeta } from 'vue-meta'
import Contact from '@/web/components/Contact/Contact.vue'
import { APP_DESC } from '@/common/Constants'

export default defineComponent({
    name: 'AboutPage',

    components: {
        Contact,
    },

    setup() {
        const title = 'About'
        const desc = `Hi, I'm Stephen. ${APP_DESC}`

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const img = require('@/web/assets/img/profile.jpg?size=200') as ResponsiveImage

        useMeta(createPageHeadOptions({
            title,
            desc,
            image: img.src,
            imageSize: TwitterCard.Summary,
        }))

        const startedProgramming = 2004
        const yearsSinceStartedProgramming = ref('')
        onMounted(() => {
            yearsSinceStartedProgramming.value = `${new Date().getFullYear() - startedProgramming} years ago!`
        })

        return {
            title,
            desc,
            yearsSinceStartedProgramming,
        }
    },
})
</script>

<style lang="scss">
article.about-page{
    @media (max-width: $big-mobile-breakpoint) {
        grid-template-columns: minmax(0, 1fr);

        aside {
            grid-row-start: 2;
        }
    }

    aside{
        img{
            border-radius: 50%;
        }

        .contact{
            margin: 0 auto;
            margin-top: $column-gap;
            width: -moz-fit-content;
            width: fit-content;
        }
    }
}
</style>
