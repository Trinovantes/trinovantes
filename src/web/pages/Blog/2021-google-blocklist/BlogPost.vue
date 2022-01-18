<script lang="ts">
import dayjs from 'dayjs'
import { computed, defineComponent, ref } from 'vue'

export const TITLE = 'Blocking Spam Websites from Google Search in Firefox'
export const CREATED_AT = dayjs.utc('2021-09-12')

export default defineComponent({
    setup() {
        const spamSites = ref([
            'medium.com',
            'quora.com',
            'dev.to',
            'dzone.com',
            'issuehunt.io',
            'fossies.org',
            'csdn.net',
            'gitcom.org',
            'adoclib.com',
            'aliyun',
            'gitmemory',
            'codegrepper',
            'bleepcoder',
            'githubmemory',
            'programmersought',
            'semicolonworld',
        ])

        const domainInputRef = ref<HTMLInputElement | null>(null)
        const addSite = () => {
            if (!domainInputRef.value) {
                throw new Error('Failed to find domainInputRef')
            }

            const site = domainInputRef.value.value
            if (!site) {
                return
            }

            spamSites.value.unshift(site)
            domainInputRef.value.value = ''
        }

        const removeSite = (idx: number) => {
            spamSites.value.splice(idx, 1)
        }

        const baseUrl = 'https://www.google.com/search?q=%s'
        const bookmarkUrl = computed(() => `${baseUrl}${spamSites.value.map((site) => `+-${site}`).join('')}`)

        return {
            TITLE,
            CREATED_AT,

            spamSites,
            domainInputRef,
            addSite,
            removeSite,

            baseUrl,
            bookmarkUrl,
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
            Whenever I try to use Google to look up a programming or tech related problem, my search results are often filled with useless spam.
            Most of them are either low-effort blogspam tutorials <em>*ahem*</em> or are just GitHub or Stack Overflow mirrors.
            It's unfortunate that despite me constantly clicking and immediately bouncing back, they still rank quite high in search rankings.
            In addition, Google also does not allow me to block certain websites from my personal search results.
        </p>

        <p>
            Luckily, there is a little known feature in Firefox that allows us to create our own search engine using bookmarks.
            Bookmarks in Firefox can be aliased to a shortcut so that it can be quickly accessed by typing the alias in the search bar.
            In addition, we can also type additional text after the alias which will get substituted into our bookmark URL with the <code>%s</code> variable.
        </p>

        <SimpleImage :img="require('./img/bookmark.png')">
            We can create a custom Google search engine by creating a bookmark in Firefox with a short keyword and point to <code>{{ baseUrl }}</code>
        </SimpleImage>

        <SimpleImage :img="require('./img/search.png')">
            Afterwards we can use our custom search engine by simply prefixing our queries with <code>g</code> in Firefox's search bar
        </SimpleImage>

        <SimpleImage :img="require('./img/results.png')">
            Our search results now automatically excludes all the spam websites
        </SimpleImage>

        <div class="url-generator">
            <TextHeading>
                Search Url
            </TextHeading>

            <p>
                Here is the actual URL that I use for my personal bookmark. Feel free to use it as is or edit it to suit your needs.
            </p>

            <CodeBlock
                :code="bookmarkUrl"
                language="txt"
            />

            <div class="editor">
                <div class="domain-input">
                    <input
                        ref="domainInputRef"
                        type="text"
                        placeholder="Domain to Exclude (e.g. medium.com)"
                        @keyup.enter="addSite"
                    >
                    <button
                        title="Add to exclude query"
                        @click="addSite"
                    >
                        Add
                    </button>
                </div>

                <div
                    v-for="(site, idx) in spamSites"
                    :key="idx"
                    class="site"
                >
                    <button
                        :title="`Remove ${site} from exclude query`"
                        @click="removeSite(idx)"
                    >
                        Remove
                    </button>
                    <span>
                        {{ site }}
                    </span>
                </div>
            </div>
        </div>
    </BlogPost>
</template>

<style lang="scss" scoped>
.url-generator{
    border: 1px solid $dark;
    padding: $padding * 2;

    .editor{
        display: grid;
        gap: $padding;

        button{
            background: $light-on-light;
            border: 1px solid $light-on-light;
            border-radius: math.div($padding, 4);
            cursor: pointer;
            display: block;
            line-height: 1;
            padding: math.div($padding, 2) $padding;
            transition: 0.5s;

            &:hover{
                background: $light-on-dark;
            }
        }

        .domain-input,
        .site{
            display: flex;
            gap: $padding;

            input{
                flex: 1;
            }

            span{
                display: block;
                flex: 1;
            }
        }
    }
}
</style>
