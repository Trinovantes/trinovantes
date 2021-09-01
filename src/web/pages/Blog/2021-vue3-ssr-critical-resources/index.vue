<script lang="ts">
import dayjs from 'dayjs'
import { defineComponent } from 'vue'

export const TITLE = 'Critical Webpack Resource Injection for Vue 3 SSR Applications'
export const CREATED_AT = dayjs.utc('2021-09-03')

export default defineComponent({
    setup() {
        return {
            TITLE,
            CREATED_AT,
        }
    },
})
</script>

<template>
    <BlogPost
        :title="TITLE"
        :created-at="CREATED_AT"
    >
        <p>
            Vue 3 has been officially released for almost a year but presently, at the time of writing this post, its Server Side Rendering (SSR) support is still <em>very</em> lackluster
            &mdash; unless you use an opinionated toolchain like Nuxt 3 (still not released), Quasar 2, or Vite &mdash; you're somewhat screwed as a Webpack user.
        </p>

        <p>
            One important feature back in Vue 2 (<a href="https://github.com/vuejs/vue-next/issues/4385">but strangely missing in Vue 3</a>) was the ability for the SSR renderer to return a list of critical CSS and JavaScript files needed by all the Vue components rendered on the current page in the SSR context object.
        </p>

        <CodeBlock
            :code="require('./raw/vue2-ssr-template.html')"
            language="html"
        />

        <Heading>
            Why is this feature important?
        </Heading>

        <p>
            Even without this list of critical CSS, as long as the SSR markup includes the main entry point <code>main.js</code>, then Webpack's client-injected runtime will asynchronously load the missing CSS and JavaScript files for the current page's components.
        </p>

        <CodeBlock
            :code="require('./raw/vue3-ssr-handler.js')"
            language="js"
        />

        <p>
            Consider the following component hierarchy for a hypothetical Vue 3 SSR website:
        </p>

        <SimpleImage :img="require('./img/example-vue3-hierarchy.png')">
            Component Hierarchy of a Possible Vue 3 SSR Website
        </SimpleImage>

        <p>
            If we simply render <code>main.js</code> and let Webpack load the rest, then the user will briefly see a Flash of Unstyled Content (FOUC) because all the HTML was rendered on the server but our components' CSS and JavaScript are not resolved until much later.
        </p>

        <div class="grid grid-3">
            <SimpleImage :img="require('./img/fouc-1.png')">
                Initial page load where only <code>vendor.css</code> is loaded (CSS from <code>node_modules</code> such as UI libraries, hence the styled buttons)
            </SimpleImage>
            <SimpleImage :img="require('./img/fouc-2.png')">
                After <code>MainLayout.vue</code>'s CSS is loaded
            </SimpleImage>
            <SimpleImage :img="require('./img/fouc-3.png')">
                After <code>HomePage.vue</code>'s CSS is loaded
            </SimpleImage>
        </div>

        <Heading :size="3">
            Why is this feature missing in Vue 3?
        </Heading>

        <p>
            I didn't follow Vue 3's development too closely so I can only speculate based on my experience of reading the source code.
            Optimistically, I believe it's due to Vue 3 wanting to become toolchain-agnostic.
            Back in Vue 2, everything was assumed to be bundled with Webpack. In Vue 3, we have Vite and Webpack for bundling Vue applications (I guess Parcel and Gulp also exists but who uses those anymore?).
            As a result, it would not make sense for Vue 3's SSR renderer (<code>renderToString</code>) to accept a Webpack-specific <code>manifest.json</code> to generate the list of critical resources.
        </p>

        <Heading>
            Naive Solution
        </Heading>

        <p>
            A naive solution would be to simply preload <em>every</em> CSS and JavaScript file in our Webpack <code>manifest.json</code> file (from <a href="https://www.npmjs.com/package/webpack-manifest-plugin">webpack-manifest-plugin</a>).
            However, this is extremely wasteful as it requires our users to load tens of megabytes worth of CSS or JavaScript, many of which they do not even need, and it would likely kill our web performance scores.
            In addition, we would also get a bunch of warnings in our console.
        </p>

        <CodeBlock
            :code="require('./raw/naive/wasteful-prefetch.txt')"
        />

        <Heading>
            My Webpack 5 Solution
        </Heading>

        <p>
            One thing I noticed while playing around with Vue 3 is that we can already determine what components the current route will load without any additional toolchain support.
        </p>

        <CodeBlock
            :code="require('./raw/solution/getMatchedComponents.ts')"
            language="ts"
        />

        <p>
            Unfortunately, this isn't particularly useful because this function only returns a list of components and not their actual output files.
        </p>

        <CodeBlock
            :code="require('./raw/solution/getMatchedComponents-output.json')"
            language="js"
        />

        <p>
            Our goal is to thus map this list of components into their actual output files.
            One important observation here is that each component object has a <code>__file</code> property.
            By default, <code>vue-loader</code> only injects this property in development builds.
            Luckily, we can configure the loader to insert this property in production builds as well by setting <code>exposeFilename: true</code> in our Webpack configuration.
        </p>

        <p>
            With a unique per-component property, we have a potential manifest lookup key.
            The simpliest solution would be to have a one-to-one mapping from the Vue file name to the output CSS and JavaScript files.
            For example, <code>MainLayout.vue</code> could correspond to <code>MainLayout.css</code> and <code>MainLayout.js</code>.
            If we can force Webpack to output files (also known as "chunks") in this manner, then it would be a trivial task of manipulating each component's <code>__file</code> property to get the output file names.
        </p>

        <p>
            For large components, this is already Webpack's default behavior: each component's id (inside Webpack) is just their full path with slashes and dots replaced by underscores e.g. <code>src_web_layouts_MainLayout_MainLayout_vue</code>.
            All we have to do for this case is to pass a function into Webpack's <code>output.filename</code> config to convert this name into <code>MainLayout.css</code> and <code>MainLayout.js</code>.
        </p>

        <p>
            One optimization Webpack performs is merging multiple small files into a single large file.
            The problem is that this new file has an incomprehensible name that does not tell us what Vue components are located inside of it.
            We can resolve this by configuring Webpack's chunking algorithm to split every file regardless of the output file's size so that it never merges any components.
        </p>

        <CodeBlock
            :code="require('./raw/solution/webpack-config.ts')"
            language="ts"
        />

        <CodeBlock
            :code="require('./raw/solution/createOutputNameFn.ts')"
            language="ts"
        />

        <p>
            Finally putting everything together in our HTTP handler:
        </p>

        <CodeBlock
            :code="require('./raw/solution/ssr-handler.ts')"
            language="ts"
        />

        <CodeBlock
            :code="require('./raw/solution/VueSsrRenderer.ts')"
            language="ts"
        />

        <Heading :size="3">
            Limitations
        </Heading>

        <ul class="spaced">
            <li>
                <strong>Your component file names must be globally unique.</strong>
                For example, you cannot have multiple components named <code>Header.vue</code> in different directories since <code>createOutputNameFn</code> only returns the file name.
            </li>
            <li>
                <p>
                    You are exposing your repository directory structure to your users.
                    If we were to open our bundled JavaScript files, we can clearly see our source directory paths in the source.
                </p>

                <SimpleImage :img="require('./img/leaking-src-directory-structure.png')">
                    If we inspect the JavaScript bundle of one of my SSR websites <a href="https://www.holomemes.moe">HoloMemes</a>, we can clearly see my project's directory structure
                </SimpleImage>

                <p>
                    Obviously this isn't a problem if your source code is already open source.
                    For closed-source projects, this is something to consider but it shouldn't be an issue as long as your directory or file names are not confidential or politically-sensitive.
                </p>
            </li>
            <li>
                Your users will be loading a separate CSS and JavaScript file for each individual component.
                However, I think the upside of avoiding FOUC outweighs the performance penalty of a few extra network connections.
            </li>
            <li>
                <code>getMatchedComponents</code> cannot determine which asynchronous components are loaded.
                As a result, even though they are still be rendered on the server by <code>renderToString</code>, their CSS and JavaScript will not be loaded until after they are resolved on the frontend which will result in a FOUC.
                There's no way around this other than avoiding asynchronous components altogether (i.e. do not use <code>defineAsyncComponent</code> in SSR applications).
            </li>
            <li>
                <p>
                    Finally, you can only have one entry point in your Webpack config.
                </p>

                <CodeBlock
                    :code="require('./raw/limitations/one-webpack-entry.ts')"
                    language="ts"
                />

                <p>
                    If you try to add another entry point (e.g. for a service worker), Webpack would combine any shared vendor code between all your entry points into a new vendor file.
                    As a result, <code>createOutputNameFn</code> would try to output multiple initial vendor files with the same name thus throwing an exception.
                </p>

                <p>
                    This shouldn't be a big issue since most projects should only need one entry point per configuration.
                    If your SSR application does have multiple entry points, you would have to instead duplicate your configuration and output each entry point to a different directory.
                </p>
            </li>
        </ul>
    </BlogPost>
</template>
