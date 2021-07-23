<template>
    <BlogPost
        :title="TITLE"
        :created-at="CREATED_AT"
    >
        <p>
            It's hard to imagine that I'll be graduating in about a year and two months from now.
            As I start to search for my 6th and final co-op this September, I started to reminisce about all of my past interviews.
        </p>

        <p>
            Some of them were great and others not so great.
            Apart from the interviews that I knew I failed miserably in, there were also a couple of terrible interviews that made me want to walk out of the room.
            I distinctively remember one interviewer back in first year that asked me to find all the syntax errors on a printed sheet of code.
            Looking back, that particular interview reminded me of the <a href="http://www.jasonbock.net/jb/News/Item/7c334037d1a9437d9fa6506e2f35eaac">If Carpenters Were Hired Like Programmers</a> joke...
        </p>

        <h2 class="tagline">
            If
            <select v-model="currentProfession">
                <option
                    v-for="profession of professions"
                    :key="profession.name"
                    :value="profession"
                >
                    {{ pluralize(profession.name) }}
                </option>
            </select>
            Were Hired Like Programmers
        </h2>

        <dl>
            <dt>Interviewer:</dt>
            <dd>So, you're a {{ currentProfession.name.toLowerCase() }}, are you?</dd>
            <dt>{{ currentProfession.name }}:</dt>
            <dd>That's right, that's what I do.</dd>

            <dt>Interviewer:</dt>
            <dd>How long have you been doing it?</dd>
            <dt>{{ currentProfession.name }}:</dt>
            <dd>Ten years.</dd>

            <dt>Interviewer:</dt>
            <dd>Great, that's good. Now, I have a few technical questions to ask you to see if you're a fit for our team. OK?</dd>
            <dt>{{ currentProfession.name }}:</dt>
            <dd>Sure, that'd be fine.</dd>

            <dt>Interviewer:</dt>
            <dd>First of all, we're working in a subdivision {{ currentProfession.actionVerbPresentProgressive }} a lot of {{ pluralize(currentProfession.product1Category) }}. Have you {{ currentProfession.actionVerbPastSimple }} a lot of {{ currentProfession.product1Specifics }} {{ pluralize(currentProfession.product1Category) }} before?</dd>
            <dt>{{ currentProfession.name }}:</dt>
            <dd>Well, I'm a {{ currentProfession.name.toLowerCase() }}, so I build {{ pluralize(currentProfession.product1Category) }}, and people pretty much {{ currentProfession.product1CustomizationPresentSimple }} they want.</dd>

            <dt>Interviewer:</dt>
            <dd>Yes, I understand that, but can you give me an idea of how much experience you have with {{ currentProfession.product1Specifics }} {{ currentProfession.product1SpecificsCategory }}? Roughly.</dd>
            <dt>{{ currentProfession.name }}:</dt>
            <dd>Gosh, I really don't know. {{ currentProfession.dontCareAboutSpecifics }}. Maybe six months?</dd>

            <dt>Interviewer:</dt>
            <dd>Six months? Well, we were looking for someone with a lot more {{ currentProfession.product1Specifics }} {{ currentProfession.product1SpecificsCategory }} experience, but let me ask you some more questions.</dd>
            <dt>{{ currentProfession.name }}:</dt>
            <dd>Well, OK, but {{ currentProfession.product1SpecificsCategory }} is {{ currentProfession.product1SpecificsCategory }}, you know.</dd>

            <dt>Interviewer:</dt>
            <dd>Yes, well. What about {{ pluralize(currentProfession.product2Category) }}?</dd>
            <dt>{{ currentProfession.name }}:</dt>
            <dd>What about it?</dd>

            <dt>Interviewer:</dt>
            <dd>Have you worked much with {{ currentProfession.product2[0] }}?</dd>
            <dt>{{ currentProfession.name }}:</dt>
            <dd>Sure, {{ currentProfession.product2Alternative.join(', ') }} -- you name it.</dd>

            <dt>Interviewer:</dt>
            <dd>But how many years of {{ currentProfession.product2[0] }} do you have?</dd>
            <dt>{{ currentProfession.name }}:</dt>
            <dd>Gosh, I really don't know -- was I supposed to be counting the {{ currentProfession.product2[0] }}?</dd>

            <dt>Interviewer:</dt>
            <dd>Well, estimate for me.</dd>
            <dt>{{ currentProfession.name }}:</dt>
            <dd>OK, I'd say I have a year and a half of {{ currentProfession.product2[0] }}.</dd>

            <dt>Interviewer:</dt>
            <dd>Would you say you're an entry level {{ currentProfession.product2[0] }} guy or a {{ currentProfession.product2[0] }} guru?</dd>
            <dt>{{ currentProfession.name }}:</dt>
            <dd>A {{ currentProfession.product2[0] }} guru? What's a {{ currentProfession.product2[0] }} guru? Sure, I've used {{ currentProfession.product2[0] }}.</dd>

            <dt>Interviewer:</dt>
            <dd>But you're not a {{ currentProfession.product2[0] }} guru?</dd>
            <dt>{{ currentProfession.name }}:</dt>
            <dd>Well, I'm a {{ currentProfession.name.toLowerCase() }}, so I've worked with all kinds of {{ currentProfession.product2Category }}, you know, and there are some differences, but I think if you're a good {{ currentProfession.name.toLowerCase() }}...</dd>

            <dt>Interviewer:</dt>
            <dd>Yes, yes, but we're using {{ currentProfession.product2[0] }}, is that OK?</dd>
            <dt>{{ currentProfession.name }}:</dt>
            <dd>{{ currentProfession.product2[0].toUpperCase() }} is fine! Whatever you want. I'm a {{ currentProfession.name.toLowerCase() }}.</dd>

            <dt>Interviewer:</dt>
            <dd>What about {{ currentProfession.product2[1] }}?</dd>
            <dt>{{ currentProfession.name }}:</dt>
            <dd>What about it?</dd>

            <dt>Interviewer:</dt>
            <dd>Well we've had some {{ currentProfession.product2[0] }} {{ currentProfession.name.toLowerCase() }}s in here, but come to find out they weren't {{ currentProfession.product2[1] }} {{ pluralize(currentProfession.name.toLowerCase()) }}. Do you have {{ currentProfession.product2[1] }} experience?</dd>
            <dt>{{ currentProfession.name }}:</dt>
            <dd>Sure, a little. It'd be good to have more for my resume, I suppose.</dd>

            <dt>Interviewer:</dt>
            <dd>OK. Hang on let me check off the box...</dd>
            <dt>{{ currentProfession.name }}:</dt>
            <dd>Go right ahead.</dd>

            <dt>Interviewer:</dt>
            <dd>OK, one more thing for today. We're using {{ currentProfession.obscureTool }} to {{ currentProfession.obscureToolPurpose }}. Have you used {{ currentProfession.obscureTool }}?</dd>
            <dt>{{ currentProfession.name }}:</dt>
            <dd>[Turning white...] Well, I know a lot of {{ pluralize(currentProfession.name.toLowerCase()) }} are starting to use {{ currentProfession.obscureToolCategory }} to {{ currentProfession.obscureToolPurpose }} since {{ currentProfession.obscureToolOriginTimePeriod }}, but you know, to be honest I've had more luck with {{ currentProfession.newTools[0] }}. Or {{ currentProfession.newTools[1] }}, for that matter. I find {{ currentProfession.obscureToolProblems[0] }}, and {{ currentProfession.obscureToolProblems[1] }}.</dd>

            <dt>Interviewer:</dt>
            <dd>But other companies are using {{ currentProfession.obscureToolCategory }}. Are you saying {{ currentProfession.obscureToolCategory }} don't work?</dd>
            <dt>{{ currentProfession.name }}:</dt>
            <dd>No, I'm not saying {{ currentProfession.obscureToolCategory }} don't work, exactly, it's just that I think {{ currentProfession.newTools[0] }} will work better.</dd>

            <dt>Interviewer:</dt>
            <dd>Well, our {{ pluralize(currentProfession.coworker) }} have all started using {{ currentProfession.obscureToolCategory }}, and they like it.</dd>
            <dt>{{ currentProfession.name }}:</dt>
            <dd>Well, sure they do, but I {{ currentProfession.obscureToolPurpose }} all day, and -- well, look, I need the work, so I'm definitely willing to use {{ currentProfession.obscureToolCategory }} if you want. I try to keep an open mind.</dd>

            <dt>Interviewer:</dt>
            <dd>OK, well we have a few other candidates we're looking at, so we'll let you know.</dd>
            <dt>{{ currentProfession.name }}:</dt>
            <dd>Well, thanks for your time. I enjoyed meeting you.</dd>
        </dl>
        <p>
            <strong>Next day...</strong>
        </p>
        <dl>
            <dt>Interviewer:</dt>
            <dd>Hello?</dd>
            <dt>{{ currentProfession.name }}:</dt>
            <dd>Hello, remember me? I'm the {{ currentProfession.name.toLowerCase() }} you interviewed for the {{ currentProfession.product2[1] }} job. Just wanted to touch base to see if you've made a decision.</dd>

            <dt>Interviewer:</dt>
            <dd>Actually, we have. We liked your experience overall, but we decided to go with someone who has done a lot of work with {{ currentProfession.product1Specifics }} {{ currentProfession.product1SpecificsCategory }}.</dd>
            <dt>{{ currentProfession.name }}:</dt>
            <dd>Really, is that it? So I lost the job because I didn't have enough {{ currentProfession.product1Specifics }} {{ currentProfession.product1SpecificsCategory }} experience?</dd>

            <dt>Interviewer:</dt>
            <dd>Well, it was partly that, but partly we got the other fellow a lot cheaper.</dd>
            <dt>{{ currentProfession.name }}:</dt>
            <dd>Really -- how much experience does he have?</dd>

            <dt>Interviewer:</dt>
            <dd>Well, he's not really a {{ currentProfession.name.toLowerCase() }}, he's a car salesman -- but he's sold a lot of {{ currentProfession.product1Specifics }} cars and he's worked with {{ currentProfession.product2[0] }} {{ currentProfession.product2Category }} interiors before.</dd>
            <dt>{{ currentProfession.name }}:</dt>
            <dd>[click]</dd>
        </dl>
    </BlogPost>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import { defineComponent, ref } from 'vue'
import pluralize from 'pluralize'
import { Profession, professions } from './professions'

export const TITLE = 'If X Were Hired Like Programmers'
export const CREATED_AT = dayjs.utc('2015-02-14')

export default defineComponent({
    setup() {
        const currentProfession = ref<Profession>(professions[0])

        return {
            TITLE,
            CREATED_AT,
            pluralize,
            professions,
            currentProfession,
        }
    },
})
</script>

<style lang="scss" scoped>
h2.tagline{
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;

    select{
        margin: 0 math.div($padding, 2);
    }
}
</style>
