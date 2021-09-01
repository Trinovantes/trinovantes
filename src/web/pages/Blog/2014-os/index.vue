<script lang="ts">
import { defineComponent } from 'vue'
import dayjs from 'dayjs'

export const TITLE = 'Adventures of Writing an OS Kernel from Scratch on a Cortex M3 Board'
export const CREATED_AT = dayjs.utc('2014-02-18')

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
        :image="require('./img/os-wow-lcd-display.jpg').src"
    >
        <p>
            This term I'm taking SE350 (<a href="http://www.reddit.com/r/pics/comments/iofva/found_in_my_universitys_operating_system_lab_the/c25gbqm">formerly known as ECE354</a>) a.k.a. Operating Systems a.k.a. one of the heaviest workload courses in my program. For this course, we have a cumulative lab with 4 deliverables. At the end of this term, we'll have a fully working OS kernel for the Keil MCB1700 Cortex-M3 Board with the following features:
        </p>

        <ul>
            <li>
                <strong>Part 1</strong>
                <ul>
                    <li>Basic multiprogramming environment</li>
                    <li>5 Priority queues</li>
                    <li>Simple memory management</li>
                </ul>
            </li>
            <li>
                <strong>Part 2</strong>
                <ul>
                    <li>Message-based IPC (Interprocess Communication)</li>
                    <li>Basic timing Services and a Wall Clock</li>
                    <li>System console interrupt-driven I/O</li>
                </ul>
            </li>
            <li>
                <strong>Part 3</strong>
                <ul>
                    <li>Stress tests</li>
                </ul>
            </li>
            <li>
                <strong>Part 4</strong>
                <ul>
                    <li>Documentation</li>
                </ul>
            </li>
        </ul>

        <p>
            For this lab, I'll be working with my classmates Fasih A., Josh K., and John Z. With any luck, we should be able to get a decent amount of sleep and not kill each other by the end of this term. Because we have to write a 30-ish page report at the end documenting all of our work and what we've learned, I thought it would be a good idea to start a journal about our (mis)adventures starting from the beginning.
        </p>

        <Heading>
            Part 1: The adventure begins...
        </Heading>

        <Heading :size="3">
            Jan 11
        </Heading>
        <ul>
            <li>
                Made a new private GitHub repo with the default C <code>.gitignore</code> file. Good enough...
            </li>
        </ul>

        <Heading :size="3">
            Jan 18
        </Heading>
        <ul>
            <li>
                <strong>Upper year:</strong> Oh by the way, you'll be writing your OS in C89 instead of C99 or C++. You know, the one where you have to declare all of your variables at the top of your methods?
            </li>
            <li>
                <strong>Me:</strong> Fuck, so it's going to be like VB6?
            </li>
        </ul>

        <Heading :size="3">
            Jan 19
        </Heading>
        <ul>
            <li>
                Josh is trying to run an ARM simulator inside a Windows VM on his Macbook (Yo dawg, I hear you like simulators so we put an ARM simulator inside your Windows simulator so you can simulate your OS while simulating Windows OS).
            </li>
            <li>
                <strong>Josh:</strong> How the fuck do we create a linked list for the OS's memory allocator if our OS doesn't have a memory allocator yet?
            </li>
            <li>
                Oh, we don't actually need dynamic memory; we can just stick the pointer for <code>next*</code> inside the blocks that we allocate! Wait, maybe we should use a doubly linked list to make <code>free()</code> easier and faster. Since we're given a pointer the block that we want to free, we can just modify the <code>next*</code> and <code>prev*</code> pointers and do it in O(1) time instead of O(n) time.
            </li>
            <li>
                Man, we just can't escape the tradeoff between performance and memory in computers.
            </li>
            <li>
                Why is our memory allocator returning blocks of <code>0x800</code> instead of <code>0x100</code>? What kind of compiler just assumes pointer arithmetic (<code>pointer + constant</code>) is in bit mode and that the constant should be multiplied by 8 just in case?
            </li>
        </ul>

        <Heading :size="3">
            Jan 20
        </Heading>
        <ul>
            <li>
                Apparently our memory allocator is returnning blocks of <code>0x800</code> because of pointer arithmetic. Since our doubly linked list has two pointers (8 bytes) and we're adding a constant to a node pointer, the compiler automatically multiplies it by the size of the object.
            </li>
            <li>
                We should zero out our memory during initialization stage since hardware memory is not guaranteed to be all zero everytime. Ok, we'll use XOR since that's the fastest way to zero out memory.
            </li>
            <li>
                <strong>Josh:</strong> Stephen, if you want the function that zeros out memory in assembly then you write it. Oh wait, then I have to code review assembly... Nevermind, we'll do it in C.
            </li>
        </ul>

        <Heading :size="3">
            Jan 21
        </Heading>
        <ul>
            <li>
                Implemented a linked list for our scheduler's queue. At least our memory allocator is working today.
            </li>
            <li>
                Well it compiled and works on the simulator, <code>git add commit</code> done!
            </li>
        </ul>

        <Heading :size="3">
            Jan 22
        </Heading>
        <ul>
            <li>
                Huh, we can't flash the board's memory.
            </li>
            <li>
                Fuck, this was the broken board? Time to switch computers...
            </li>
            <li>
                Fuck, invalid memory access. Dammit Josh, you're zeroing out the memory wrong and now we're getting hard faults!

                <ul>
                    <li>
                        Fixed it by adding extra padding to the end of the <code>for</code> loop so that it ends 8 bytes before the actual end of DRAM.
                    </li>
                    <li>
                        This is why I said we should align the start of heap with <code>0x100</code>'s but noooo... nobody listens to Stephen.
                    </li>
                </ul>
            </li>
            <li>
                Fuck, missing algorithm <code>0x0000000H</code> to <code>0x00007FFH</code>. What does that even mean?!?!
            </li>
            <li>
                OMG IT WORKS! NOBODY TOUCH ANYTHING. COMMIT EVERYTHING!
            </li>
        </ul>

        <Heading :size="3">
            Jan 23
        </Heading>
        <p>
            To avoid confusing each other when we say "doing OS" (this lab) vs. "doing OS" (taking notes from the lectures), we have officially dubbed our project "OS WOW".
        </p>

        <SimpleImage :img="require('./img/os-wow.jpg')">
            OS WOW
        </SimpleImage>

        <Heading :size="3">
            Jan 24
        </Heading>
        <ul>
            <li>
                We went to the OS lab after dinner. The lab is empty at 8:30 p.m. on a Friday night. Well at least it'll be quite amusing when we see people in here pulling all nighters next week.
            </li>
            <li>
                We need some music in this lab to calm ourselves.
            </li>
            <li>
                Our memory allocator needs to be changed since we now need more metadata in the block header like the owner's <code>pid</code>.
                <ul>
                    <li>
                        Also it turns out that we were returnning the head of the block instead of where the user memory area begins. Need to fix that...
                    </li>
                    <li>
                        <strong>Josh:</strong> We need to make the data pointer to a <code>void**</code>!
                    </li>
                    <li>
                        <strong>Me:</strong> No we need to make that a <code>void*</code>!
                    </li>
                    <li>
                        <strong>Josh:</strong> Oh wait nevermind, I need to get some sleep.
                    </li>
                    <li>
                        Okay, let's just allocate a fixed size header with enough room for future headers. For now let's <code>#define</code> the header size to be <code>0x10</code> and then take the difference between <code>0x100</code>, our block size, to get the actual user usable memory size.
                    </li>
                </ul>
            </li>
            <li>
                We've just found out that the heap size needs to be fixed between the OS image and stack. This means that out of our total <code>0x8000</code> bytes available SRAM, we can probably allocate <code>0x3000</code> bytes for the heap. Therefore, we will have a total of 48 blocks to distribute between the OS and user processes. Oh well, we can reize the blocks later by change the <code>#define BLOCK_SIZE</code>. We'll just keep it aligned to <code>0x100</code> for now since it'll make debugging a lot easier.
            </li>
            <li>
                To help with debugging, we'll initialize all the memory first with a constant non-zero value since <code>0</code> is actually a valid memory address on this board. This way, we can easily tell if our code did or didn't write to memory properly.
                <ul>
                    <li>
                        It's too bad that we write in big endian but the memory inspector window displays the 4 bytes as little endian so <code>0xDEADBEEF</code> becomes <code>EF BE AD DE</code>.
                    </li>
                    <li>
                        <code>0xDEADBEEF</code>, <code>0xDEADBEEF</code> everywhere...
                    </li>
                </ul>
            </li>
            <li>
                Death threat counter: 5
            </li>
        </ul>

        <Heading :size="3">
            Jan 25
        </Heading>
        <ul>
            <li>
                Okay so the user sets the process table (which is currently allocated as a global static variable) and then the kernel uses that table to create the process control blocks (PCB) for the queues? I thought all of the tables lives in the kernel space? Well I guess this makes more sense because otherwise how can the user tell the kernel where are all of its processes? Let's try to implement the scheduler now.
            </li>
            <li>
                The lab manual says that we should have a memory table but where should we put it? Can we just put the <code>pid</code> inside the memory block? It'll definitely be easier but the manual doesn't explicity say that we need to allocate a new table.
                <ul>
                    <li>
                        Regardless of where we put it, we need some way to know who's the original owner of the block. When <code>release_memory_block(void*)</code> is called, we need to check the block's owner's <code>pid</code> with the current process's <code>pid</code>. Otherwise, greedy users can just modify the owner <code>pid</code> of every block in the heap to itself, call free on all of them, and then request every block for itself.
                    </li>
                    <li>
                        Actually, let's create a new memory table in kernel space so that it'll be harder for the user to modify the blocks' owner's <code>pid</code>. <em>Yay security by obscurity</em>.
                    </li>
                </ul>
            </li>
            <li>
                Oh god there's so many compiler errors...
                <ul>
                    <li>
                        What do you mean you can't find symbol reference to <code>proc_table</code>? It's right here!
                    </li>
                    <li>
                        Let's <code>git stash</code> and incrementally add back our changes one by one.
                    </li>
                    <li>
                        Okay so the error is coming from this header where we defined <code>proc_table</code>. Did we <code>extern</code> it properly? How does <code>extern</code> even work in C89?
                        <ul>
                            <li>
                                <strong>Stephen:</strong> In C++, it just tells the compiler that it exists somewhere and it's the linker's problem. All <code>extern</code> does is to tell the compiler to not mangle the name.
                            </li>
                            <li>
                                WHY CAN'T IT FIND THE FUCKING SYMBOL!
                            </li>
                            <li>
                                An hour later... <strong>John:</strong> Wait, did we even include <code>user_proc.c</code> in our project files? Fuck. <em>Josh kicks a chair.</em>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li>
                Fuck, why is the <code>printf</code> now hard faulting? Their starter code must be broken. Let's just use <code>putc</code>. You know what? let's just remove all the <code>printf</code> and use breakpoints intead.
                <ul>
                    <li>
                        Later... <strong>Josh:</strong> Oh I know why our <code>printf</code> isn't working; we're calling it before we call <code>init_printf()</code>. <em>Josh puts the chair back then kicks it down again</em>
                    </li>
                </ul>
            </li>
            <li>
                Our scheduler works but it gets a hard fault the second time it dispatches the null process. Dammit our linked list implementation has bugs in the <code>push()</code> and <code>pop()</code> methods. Wait it's still hard faulting. Sigh it's going to be a long night.
                <ul>
                    <li>
                        I think our stack is getting corrupted by an infinite recursion since the end of <code>k_release_processor()</code> just calls the function pointer to next null process which then calls <code>k_release_processor()</code> again. It'll never return and we'll overflow our stack!
                    </li>
                    <li>
                        What if we just take that function pointer call out? Wow it worked. Oh I see, the context swicher modified already modified our program counter and stack pointer so we were actually calling the next process twice.
                    </li>
                </ul>
            </li>
            <li>
                OMG THE SCHEDULER WORKS! <code>git commit</code> everything and let's go home, it's already past midnight.
            </li>
            <li>
                Death threat counter: 7
            </li>
        </ul>

        <Heading :size="3">
            Jan 26
        </Heading>
        <ul>
            <li>
                Okay let's split up to two groups today.
                <ul>
                    <li>
                        Josh and Fasih will implement changing priorities.
                        <ul>
                            <li>
                                Added a new method for our linked list structure to allow us to linearly <code>search</code> and <code>delete</code> from the current priority's queue and then <code>push</code> to the end of the new priority's queue.
                            </li>
                            <li>
                                Also added preemption check so that if the new priority is greater than the current process's priority, we need to preempt the current process by calling <code>release_processor</code>.
                            </li>
                        </ul>
                    </li>
                    <li>
                        John and I will implement the memory table.
                        <ul>
                            <li>
                                We want to implement some kind of protection for our memory manager so that a greedy user can't just release the memory blocks of other users. To do so, we need to update <code>request_memory_block()</code> so that it stores the requester's <code>pid</code> with the return block.
                            </li>
                            <li>
                                The easiest solution would be to just store the <code>pid</code> inside the memory block's header but it would be extremely <em>easy</em> for a malicious user to calculate the offset to the <code>pid</code> field for everybody else's blocks.
                            </li>
                            <li>
                                Nah, we'll just create a memory table before the start of the heap so that we can obscure the acutal location of owner <code>pid</code>. Again, <em>security by obscurity</em>.
                            </li>
                            <li>
                                The main problem now is that when the kernel requests memory off the heap, our global <code>current_pcb</code> variable is still referring to the process that made the system call. <strong>Note:</strong> We need to refactor our code so that our kernel gets its own heap when we have the time. It's a pretty bad idea for the kernel and user to share the same heap.
                            </li>
                            <li>
                                We got around this by creating <code>k_request_memory()</code> and <code>k_release_memory()</code>. These two simply wrap around the actual <code>request_memory()</code> and <code>release_memory()</code> calls. Before the call, it overrides the global <code>current_pcb</code> variable with a "dummy kernel pcb" and then after the call, it restores <code>current_pcb</code> to its original value.
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li>
                Oh god so many merge conflicts...
                <ul>
                    <li>
                        Okay finally fixed all of these conflicts so let's now test our user processes. Good, the basic tests passed. Now let's try an edge case: get process A to request all of the memory blocks, get another process B to try to request memory and get blocked, get A to release all of its memory, and see if B gets unblocked.
                    </li>
                    <li>
                        Wait, why isn't it running B after A?
                    </li>
                    <li>
                        Let's add a breakpoint in <code>get_next_process()</code>. Okay, let's inspect the queues... Why the fuck is the blocked queue empty? Where did B disappear to then?!
                    </li>
                    <li>
                        Dammit our <code>switch_process()</code> that does the context switch is wrong so process B never gets pushed to the blocked queue. It's going to be a long night...
                    </li>
                </ul>
            </li>
        </ul>

        <Heading :size="3">
            Jan 27
        </Heading>
        <ul>
            <li>
                Apparently we also need to implement preemption we we release memory (i.e. when a process releases memory and there's another process with higher priority that's currently blocked on memory, we need to preempt the current process). Well that's just a simple <code>if</code> statement in our <code>release_memory()</code> method. It can't be that bad, right?
            </li>
            <li>
                Why the fuck are we hard faulting again?! Sigh, it's going to be another long night in the lab but at least there's more people in here now.
            </li>
            <li>
                Okay, it's hardfaulting on this line during inialization where it's trying to <code>push</code> the new PCBs to the ready queue. Let's step through this <code>for</code> loop.
                <ul>
                    <li>
                        Okay, <code>push PCB[0]</code> at <code>0x10000510</code>.
                    </li>
                    <li>
                        Okay, <code>push PCB[1]</code> at <code>0x10000520</code>.
                    </li>
                    <li>
                        Okay, <code>push PCB[2]</code> at <code>0x00005230</code>. Wait, what?
                    </li>
                </ul>
            </li>
            <li>
                Maybe our <code>pcb_t*</code> array is corrupt?
                <ul>
                    <li>
                        Let's step through how it's allocating memory for <code>pcb_t**</code> and its elements.
                    </li>
                    <li>
                        There! It's overriding the pointer to the 2nd <code>pcb_t</code>.
                    </li>
                    <li>
                        Wait why is our <code>start_of_heap</code> variable only at <code>0x1000050A</code> instead of <code>0x1000051C</code>? The contents of the first <code>pcb_t</code> is overwriting our pointer to the 2nd <code>pcb_t</code>.
                    </li>
                    <li>
                        What the fuck is this line doing <code>start_of_heap += NUM_PROCESSES * sizeof(pcb_t*)</code> ?!?!
                        <ul>
                            <li>
                                <strong>Note:</strong> <code>NUM_PROCESSES</code> is a macro to 7
                            </li>
                            <li>
                                Why is it only adding <code>0xA</code> (10) instead of <code>0x1C</code> (28)?
                            </li>
                            <li>
                                Guess we're stepping through the assembly.
                            </li>
                            <li>
                                Wow... that line generated <code>move r2, #4</code> and then <code>adds r2, #6</code>. It's literally adding 6 to 4. Great we just found our first compiler bug.
                            </li>
                            <li>
                                Fuck it, we'll just hardcode <code>0x1C</code> and label it <code>#WONTFIX</code>.
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>

        <Heading :size="3">
            Jan 28
        </Heading>
        <ul>
            <li>
                Wait the lab manual says that we have to get our user processes to print out its test results. Fasih, you fix it. I'm tired...
            </li>
        </ul>

        <Heading :size="3">
            Jan 29
        </Heading>
        <ul>
            <li>
                All that's left to do is documentation. Let's just take turns writing comments for each of our methods in <code>k_process.c</code>
            </li>
            <li>
                Alright, <code>zip</code> and submit!
            </li>
            <li>
                Well, time to study for SE380 (Feedback Control) quiz tomorrow...
            </li>
        </ul>

        <Heading :size="3">
            Feb 5
        </Heading>
        <ul>
            <li>
                <strong>Demo day!</strong> Hurray we sniped the last slot so we all get to sleep in until 9 a.m.
            </li>
            <li>
                Apparently we didn't implement a FIFO context switcher. Right now, we're pushing any memory blocked process to the front of the ready queue instead of the end of the ready queue when there's free memory available.
            </li>
            <li>
                Even though our memory table was a nice feature, the TA said that we may encounter problems with message passing in part two since it's assuming that whoever requests memory will also free that memory. For message passing, the sender should only have to request a memory block, write its message to the block, and send it off with a system call. The recipient should be the one that frees the memory block.
            </li>
        </ul>

        <Heading>
            Part 2
        </Heading>
        <p>
            For part two, we have to implement message passing, keyboard interrupts, and timer interrupts. In part one, we simply used busy waiting for <code>printf</code> that waited until the <code>THR</code> (Transmission Holding Register) is empty before writing the next character to the <code>uart</code> (<a href="http://en.wikipedia.org/wiki/Universal_asynchronous_receiver/transmitter">Universal Asynchronous Receiver/Transmitter</a>). In part two, we need an interrupt routine that handles <code>THRE</code> interrupts (Transmission Holding Register Empty interrupts). After getting a <code>THRE</code> interrupt, our interrupt process then needs to get the next message in its pending messages queue, store it in a buffer, free the message's memory, and write the next chacacter in our buffer to the <code>THR</code>.
        </p>
        <p>
            As for the timer interrupts, we just need to increment an internal counter everytime we get an interrupt and deliver any delayed messages that have expired. Finally, we also need to implement a digital clock on the terminal that updates every second. Overall, it doesn't look too bad and we have about a month before it's due. Unfortunately, we also have at least 3 midterms (depending on our electives) and 3 major assignments between part one and part two.
        </p>

        <Heading :size="3">
            Mar 1
        </Heading>
        <ul>
            <li>
                Well the deadline is only less than a week and we haven't even started yet. GG
            </li>
            <li>
                Since we just got destoryed in our CS341 (Algorithms) midterm yesterday, let's just add the new sample code and let's just call it a day. We got a SE380 midterm tomorrow.
            </li>
        </ul>

        <Heading :size="3">
            Mar 2
        </Heading>
        <ul>
            <li>
                It turns out that the compiler bug from part one (where it was adding 6 instead of multiplying by 4) was because we're adding a macro value to an <code>int</code>. Apparently all we have to do was wrap that macro with an explicit cast to <code>uint32_t</code> to get the correct result. C is weird...
            </li>
            <li>
                Stephen spent all day refactoring the kernel linked list implementation to not request/release memory because we already know at compile time how many nodes we need for the PCBs and memory blocks. All we have to do is simply pass the nodes around and change their next/prev pointers.
            </li>
            <li>
                John worked on removing the memory table because doing a linear search to validate <code>release_memory_block()</code> calls are quite expensive and the <code>kernel_pcb</code> hack is going to bite us in the ass sooner or later.
            </li>
            <li>
                Fasih and Josh worked on fixing bugs in our scheduler and refactoring so that we can actually understand that clusterfuck of nested if statements.
            </li>
        </ul>

        <Heading :size="3">
            Mar 3
        </Heading>
        <ul>
            <li>
                I doubt anyone is going to be working on OS today because we have a SE380 midterm tomorrow.
            </li>
        </ul>

        <Heading :size="3">
            Mar 4
        </Heading>
        <ul>
            <li>
                Josh gave up on last minute studying because the midterm's weight will get shifted to the final if we do better on the final. He spent the afternoon working on the message-blocked queues.
            </li>
            <li>
                2 hours later... Fuck.
            </li>
            <li>
                Let's just go cry ourselves to sleep tonight...
            </li>
        </ul>

        <Heading :size="3">
            Mar 5
        </Heading>
        <ul>
            <li>
                Stephen just spent the night LaTeXing his CO487 (Applied Cryptography) assignment.
            </li>
            <li>
                Josh is still debugging send and receive messages while yelling at me to LaTeX faster.
            </li>
            <li>
                John tried to copy and paste <code>strncpy</code>, <code>strcmp</code>, and <code>strlen</code> implementations from FreeBSD source while trying to teach the first years working in the lab how to implement a BST.
            </li>
            <li>
                Fasih started working on timers.
            </li>
            <li>
                Josh later blackmailed the rest of us that he won't drive us to get groceries until OS is finished. We could technically just take the bus but it's too cold to take the bus.
            </li>
        </ul>

        <Heading :size="3">
            Mar 6
        </Heading>
        <ul>
            <li>
                I spent the afternoon writing some basic user test processes to test the new message passing APIs that Josh implmented yesterday. Since Fasih isn't done with timers yet, we can't test <code>delayed_send()</code> yet.
            </li>
            <li>
                Someone didnt set their git author properly so I just see a bunch of commits by <code>unknown</code>.
                <ul>
                    <li>
                        It's probably John and Josh working on the keyboard interrupt routine and the KCD (keyboard code decoder).
                    </li>
                    <li>
                        Since the interrupt routine needs to send/receive messages and request/release memory blocks, they also need to use our kernel functions. However, the problem is that the interrupt routine should not be preempted by the scheduler or be blocked by memory. I can't believe they got lazy and just copy and pasted the original kernel functions and just removed the calls to the scheduler. Better add this to the list of things to refactor afterwards.
                    </li>
                    <li>
                        After debugging all night, Josh learnt that a compiler warning is actually what's breaking his code. Apparently, if you have a macro to a function that returns a <code>void*</code>, the star should be beside the function name instead of the type name. Otherwise, the compiler will say <code>type qualifier on return type is meaningless</code>.
                    </li>
                </ul>
            </li>
            <li>
                In other news, the SE380 midterm class results are up. Wow, that class average and standard deviation is terrible! I'm scared to get our midterms back in class tomorrow...
            </li>
            <li>
                Death threat counter: 9
            </li>
        </ul>

        <Heading :size="3">
            Mar 7
        </Heading>
        <ul>
            <li>
                John and Josh continued to work on the KCD and keyboard interrupt routine.
            </li>
            <li>
                Fasih finally finished the timers so we worked on integration and testing. Great, we're hard faulting everytime an interrupt occurs. G fucking G.
            </li>
            <li>
                Let's just disable interrupts everywhere to see if we can narrow down the source.
                <ul>
                    <li>
                        It seems that we can't disable interrupts when making a system call from user mode otherwise we hard fault. We should probably be more careful in where we're disabling interrupts and make sure we re-enable it before calling <code>k_release_processor</code>.
                    </li>
                    <li>
                        A classmate later suggested that we should try and see if <code>printf</code> can work alone without any variables passed in. Oh, we don't hardfault anymore! Why the fuck is <code>printf</code> broken when we have interrupts? Let's go to the author's "webpage":http://www.sparetimelabs.com/tinyprintf/tinyprintf.php and see if there's anything that we missed.
                    </li>
                    <li>
                        <strong>Are you fucking kidding me?</strong> According to this <a href="http://stackoverflow.com/questions/3865713/is-va-start-etc-reentrant">StackOverflow question</a>, it's probably because <code>va_start()</code> used by <code>printf()</code> isn't re-entrant safe on our platform (i.e. the behaviour is undefined if we get interrupted, have everything saved onto the stack, and then restore the system state from the stack). It would've been great if we learned this when we covered system interrupts instead of spending the past 10 hours debugging by trial and error.
                    </li>
                </ul>
            </li>
            <li>
                Death threat counter: 10
            </li>
        </ul>

        <Heading :size="3">
            Mar 8
        </Heading>
        <ul>
            <li>
                Since everyone else is working on the CS349 (User Interfaces) assignment, I spent the day implenting the clock process (as a user-level process). It's surprisingly simple because all the necessary APIs have already been implemented. All I had to do was to just send a 1000 ms delayed message to itself in an infinite loop. Since it'll get blocked by <code>receive_message</code> after the delayed send, the clock process will only print once a second.
            </li>
            <li>
                The console display doesn't seem to work properly. For some reason, it's double printing everything I type after a carriage return. There's probably something wrong with how the keyboard interrupt process handles its input buffer before passing it to the KCD.
            </li>
        </ul>

        <Heading :size="3">
            Mar 9
        </Heading>
        <ul>
            <li>
                I had to do some research on how the board actually prints and how interrupts gets triggered to fix the double printing.
            </li>
            <li>
                Also, it seems that the <code>'\0'</code> character is actually important at the end of input to our THR otherwise the THRE interrupt never gets triggered again. Even though it prints out a space on the simulator, it doesn't actually show up on Putty when we open a serial port to our board.
            </li>
            <li>
                Okay this <code>a2i</code> function included with the <code>printf</code> file doesn't work as expected so we can't manually set the clock time
                <ul>
                    <li>
                        Do we really have to write a complete <code>atoi</code> implementation?
                    </li>
                    <li>
                        Oh wait, we can just hard code the value since we only need to parse 2 digits at a time
                    </li>
                    <li>
                        Wait why is hour 99 being displayed as 0? Dammit Stephen, it's supposed to be <code>mod 100</code> not <code>mod 99</code>.
                    </li>
                </ul>
            </li>
            <li>
                Now that we can finally start the clock, why isn't our clock printing more than once?
            </li>
            <li>
                We need to swap the global <code>current_pcb</code> variable with the message's sender's PCB in the timer interrupt routine because we could get interrupted while the <code>current_pcb</code> variable is not the message's original sender. Thus when we tried to forward the message via <code>send_message</code>, it will overwrite the message's <code>sender_pid</code> with the global <code>current_pcb</code>.
            </li>
        </ul>

        <Heading :size="3">
            Mar 12
        </Heading>
        <ul>
            <li>
                <strong>Demo day!</strong> Hurray, we sniped the last slot again so we all get to sleep in till 9 a.m. again.
            </li>
            <li>
                So far so good, all of the API that we implmented worked as expected.
            </li>
            <li>
                Wait a minute... shouldn't the wall clock reset to <code>00:00:00</code> after <code>23:59:59</code>? Fuck, why did I make it <code>mod 100</code> and how did it make it past everyone during code reviews?
            </li>
            <li>
                Oh wow, they're making us check for error cases even though it wasn't specified in the lab manual. We should talk to the lab instructor later because this was not in the specifications.
            </li>
            <li>
                For the last part of our demo, we were given a couple of object files that contained their private test processes and we had to link with them to show the TA that the output is correct.
                <ul>
                    <li>
                        Hmm, for some reason we're getting linking errors with undefined symbols everywhere...
                    </li>
                    <li>
                        Okay so we're not linking properly because we didn't use their specified names for the process table. I don't recall this being in the lab manual either...
                    </li>
                    <li>
                        Fuck, it hard faulted for all three test cases. GG marks.
                    </li>
                </ul>
            </li>
        </ul>

        <Heading>
            Part 3
        </Heading>

        <Heading :size="3">
            Mar 17
        </Heading>
        <ul>
            <li>
                First things first: fix the hard fault.
                <ul>
                    <li>
                        We may not have the original source code but we can still read the disassembly in the object files. Thankfully, we're dealing with RISC assembly so it's simple for me to read.
                    </li>
                    <li>
                        Okay it seems to be hard faulting once their process calls <code>release_processor()</code>. Our scheduler is hard faulting?
                    </li>
                    <li>
                        It seems that we hard fault as soon as we try to go from handler mode (in the scheduler) to thread mode (the new process), our OS just hard faults. This is happening when we try to start the null process... Wait no, it's happening when we try to start the Wall Clock process. The <code>current_pcb</code> PID field isn't even being set so it defaulted to 0 (i.e. the null process).

                        <ul>
                            <li>
                                Fuck, we were initializing the Wall Clock's process table entry in our own test process file. When we switched to their object file, Wall Clock was never initialized in the process table. No shit it's going to hard fault, the stack is empty so <code>BL 0xFFFF FFF9</code> will set the <code>PC</code> to <code>0</code>!
                            </li>
                            <li>
                                Well at least I finally figured out what that weird branch instruction from the sample code does. Apparently, it's a <a href="http://infocenter.arm.com/help/index.jsp?topic=/com.arm.doc.dui0552a/Babefdjc.html">special instruction</a> from the board that moves the stack pointer up 8 words and writes those 8 values to <code>R0-R3</code>, <code>R11</code>, <code>LR</code>, <code>PC</code>, and <code>xPSR</code>. At the very least, our stack needs to contain the correct <code>PC</code> value (i.e. the start of the process) at <code>SP + 0x18</code>. Since this was never set, we ended up branching to address <code>0x0</code> (which is actually a valid address on this board) thus causing us to hard fault.
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li>
                I later implemented backspace for our console IO because I'm tired of restarting an input on a new line every time I mistype something.
            </li>
            <li>
                Got <code>atoi()</code> working as well. <em>I'm on fire tonight!</em> It may not be as efficient as the <code>cstdlib</code> implementation but it's good enough for our purposes. This sure beats hardcoding <code>input_buffer[4] - '0'</code> to extract the digits, character by character.
            </li>
        </ul>

        <Heading :size="3">
            Mar 18
        </Heading>
        <ul>
            <li>
                Let's add some error checking to our inputs even though it wasn't specified in the lab manual, just sayin'. Weird, we're hard faulting when we try to enter an invalid input. Oh! Our error message buffer is overflowing our stack because I declared a <code>char</code> array of size 80. <strong>Solution: double the stack size of every process!</strong> Yay, it worked!
            </li>
            <li>
                If there's one thing I learned this term, it's that buffer and stack overflows are real and are usually hard to deal with without virtual memory. Thankfully we still have enough unused memory that we can easily double the stack size.
            </li>
            <li>
                All that's left for this deliverable is to implement the stress tests and another keyboard command which Fasih and John wanted to do. I guess I'll try to do something extra to get bonus marks...
            </li>
            <li>
                Got the LCD display to work!
            </li>
        </ul>

        <SimpleImage :img="require('./img/os-wow-lcd-display.jpg')">
            OS WOW on the LCD Display
        </SimpleImage>

        <Heading :size="3">
            Mar 22
        </Heading>
        <ul>
            <li>
                Fasih and John finished the remaining processes without any problems. It's amazing how easy development gets becomes once all the base APIs are bullet proof.
            </li>
            <li>
                Time to do code review and run <code>astyle</code> before we <code>zip</code> this up
            </li>
        </ul>

        <Heading :size="3">
            Mar 26
        </Heading>
        <ul>
            <li>
                <strong>Last demo day!</strong> Yay, we sniped the last slot 3rd time in a row so we get to sleep in late again.
            </li>
            <li>
                Well there wasn't that much to implement for this deliverable so it's actually a very short demo. The TA just asked us a couple of questions about the expected behaviour of our system when we toggle the priorities of our stress tests such as deadlocks and starvation.
            </li>
            <li>
                We finally went through an entire demo session without fucking up!
            </li>
        </ul>

        <Heading>
            Part 4
        </Heading>

        <Heading :size="3">
            Mar 29
        </Heading>
        <ul>
            <li>
                We split up all of the requried parts of the documentation based on how much work we did in the previous parts. Josh will be merging everything together and proofreading it because he was too busy with his elective's assignments when we were doing part 3.
            </li>
            <li>
                Fasih went to the lab to write the benchmark processes and collect the raw data.
            </li>
            <li>
                Josh spent the day working on his Feedback prelab so I guess he'll do his share of the documentation tomorrow.
            </li>
            <li>
                John and I spent the day at home writing our share of the documentation in <code>LaTeX</code>.

                <ul>
                    <li>
                        On a side note, I really love the <code>bytefield</code> package for drawing the memory maps!
                    </li>
                    <li>
                        Well, we're done our share of the work. Can't believe it's finally over... and just in time for CS341 and CO489 assignments that's due next Friday! Fuck it, I'm playing Diablo 3 tonight, I deserve a break!
                    </li>
                </ul>
            </li>
        </ul>
    </BlogPost>
</template>
