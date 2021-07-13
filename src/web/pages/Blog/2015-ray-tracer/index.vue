<template>
    <BlogPost
        :title="TITLE"
        :image="require('./img/10-final-scene/chess-3.png').src"
        :created-at="CREATED_AT"
    >
        <p>
            After working 150-something hours in the past two weeks, I've finally finished my CS488 ray tracer project. If I included the 60 hours I spent on my simple ray tracer from Assignment 4, then my total hour count is about 210 over 3 weeks! Man, I really hope this is the last time I ever have to work this hard (70 hours/week). But now that I'm finished, I can finally get some sleep and catch up on my other courses. Without any further ramblings from my sleep-deprived mind, here's an image gallery of my rendered images!
        </p>

        <h2>
            1. Refractions
        </h2>

        <p>
            You'd think that copying Snell's and Fresnel equations from the textbook would be simple and straight forward but this objective actually took me the longest to complete. I can't believe it took me 40 hours to debug my code to find an incorrect minus sign. And when I say debugging, I mean reading through a 100 MB log file that contains every matrix and vector used to render each pixel!
        </p>

        <p>
            For this objective I placed a glass sphere with varying refraction indices infront of two boxes and put everything inside a cube room. I generated these initial images without applying Beer's Law.
        </p>

        <div class="grid grid-2">
            <SimpleImage :img="require('./img/1-refraction/1-refraction-1-no-attenuation.png')">
                Refraction Index 1.0
            </SimpleImage>
            <SimpleImage :img="require('./img/1-refraction/1-refraction-2-no-attenuation.png')">
                Refraction Index 1.5
            </SimpleImage>
        </div>

        <p>
            For these higher refraction indices, I got a weird black circle inside my sphere. My guess is that anything outside the dark circle (i.e. the light outer ring) are experiencing total internal reflection. As a result, those light rings are only seeing reflections instead of both reflections and refractions. It's odd that the Fresnel equations does not provide a smooth interpolation between reflections and refractions.
        </p>
        <p>
            Also note that the horizontal line in these spheres are simply reflections of my sunset background.
        </p>

        <div class="grid grid-2">
            <SimpleImage :img="require('./img/1-refraction/1-refraction-3-no-attenuation.png')">
                Refraction Index 2.5
            </SimpleImage>
            <SimpleImage :img="require('./img/1-refraction/1-refraction-4-no-attenuation.png')">
                Refraction Index 4.5
            </SimpleImage>
        </div>

        <h3>
            Beer's Law
        </h3>

        <p>
            For some reason, I decided to mention Beer's Law when writing my objectives list when refraction alone is enough for a valid objective. Ah me and my big mouth...
        </p>
        <p>
            I re-rendered the above images after implementing Beer's Law using a <strong>very</strong> crude approximation. Instead of taking account of the material's internal attenuation factors, I simply used the inverse bouding volume size. While not realistic, it does improve my non-attenuated images (somewhat... maybe?).
        </p>

        <div class="grid grid-4">
            <SimpleImage :img="require('./img/1-refraction/1-refraction-1.png')">
                Refraction Index 1.0
            </SimpleImage>
            <SimpleImage :img="require('./img/1-refraction/1-refraction-2.png')">
                Refraction Index 1.5
            </SimpleImage>
            <SimpleImage :img="require('./img/1-refraction/1-refraction-3.png')">
                Refraction Index 2.5
            </SimpleImage>
            <SimpleImage :img="require('./img/1-refraction/1-refraction-4.png')">
                Refraction Index 4.5
            </SimpleImage>
        </div>

        <h3>
            Translucency
        </h3>

        <p>
            Turns out transluency is implemented the same way as glossy reflections so this extra feature was trivial to implement.
        </p>

        <SimpleImage :img="require('./img/1-refraction/1-refraction-5.png')">
            Translucency in a Cornell Box
        </SimpleImage>

        <h2>
            2. Glossy Reflections
        </h2>

        <p>
            This objective was actually the simplest to implement. All I had to do was perform Monte-Carlo sampling on a Phong-distributed hemisphere.
            Once the exponent value is over 10000, the glossiness is not noticable enough to see and the material can be approximated to a true mirror.
        </p>

        <div class="grid grid-2">
            <SimpleImage :img="require('./img/2-glossy-reflections/2-reflection-1.png')">
                Glossy Reflections with Varying Distribution Exponents
            </SimpleImage>

            <SimpleTable
                :data="[
                    [
                        'Sphere',
                        'Exponent Value'
                    ],
                    [
                        'Bottom Left',
                        1,
                    ],
                    [
                        'Bottom Center',
                        10,
                    ],
                    [
                        'Bottom Right',
                        100,
                    ],
                    [
                        'Top Left',
                        1000,
                    ],
                    [
                        'Top Center',
                        10000,
                    ],
                    [
                        'Top Right',
                        100000,
                    ],
                ]"
            />
        </div>

        <h2>
            3. Perlin Noise
        </h2>

        <p>
            Not much to say here... I ported Ken Perlin's <a href="http://mrl.nyu.edu/~perlin/noise/">Java implementation</a> and then experimented with different scales and octaves until I found a texture that seemed realistic. The columns from left to right varies the octaves from 1 to 4. The rows from bottom to top varies the scaling from 1 to 4.
        </p>

        <div class="grid grid-2">
            <SimpleImage :img="require('./img/3-perlin-noise/3-perlin-noise-1.png')">
                Marble Texture
            </SimpleImage>
            <SimpleImage :img="require('./img/3-perlin-noise/3-perlin-noise-2.png')">
                Wood Texture
            </SimpleImage>
        </div>

        <p>
            One thing that stumped me while implementing this was that the noise generator function is a 3D function. This means that for texturing a surface, I had to use the uv-mapped 2D surface coordinate with a z-value of 0 instead of the actual 3D coordinate.
        </p>

        <h2>
            4. Texture Mapping
        </h2>

        <p>
            This was a pretty straight-forward implementation from my course notes. However, this did require a significant amount of refactoring. Before this objective, all of my visible classes such as <code>Material</code> and <code>Background</code> only stored the necessary colours. After refactoring, these classes store <code>Texture</code> instead. Of course to maintain backwards-compatibility and keep my interfaces uniform, I implemented both a <code>SolidColourTexture</code> class and an <code>ImageTexture</code> class.
        </p>

        <h3>
            Sphere Mapping
        </h3>

        <div class="grid grid-2">
            <SimpleImage :img="require('./img/4-texture-mapping/4-texture-mapping-1.png')">
                Sphere Mapping
            </SimpleImage>
            <SimpleImage :img="require('./img/4-texture-mapping/earthmap1k.png')">
                Earth Texture
            </SimpleImage>
        </div>

        <h3>
            Cube Mapping
        </h3>

        <p>
            The most annoying part for this objective is that I had to reboot into Windows to use Photoshop to create these cube textures. I can't believe there isn't a user-friendly alternative on Linux yet.
        </p>

        <div class="grid grid-2">
            <SimpleImage :img="require('./img/4-texture-mapping/4-texture-mapping-3.png')">
                Cube Mapping with a Debug Texture
            </SimpleImage>
            <SimpleImage :img="require('./img/4-texture-mapping/debug-cube.png')">
                Debug Texture
            </SimpleImage>
        </div>

        <div class="grid grid-2">
            <SimpleImage :img="require('./img/4-texture-mapping/4-texture-mapping-4.png')">
                Cube Mapping
            </SimpleImage>
            <SimpleImage :img="require('./img/4-texture-mapping/minecraft-cube.png')">
                Minecraft Cube Texture
            </SimpleImage>
        </div>

        <h3>
            Mesh Mapping
        </h3>

        <p>
            To map a mesh, I first send out a ray from its centroid to an intermediate bounding container (either a sphere or cube) and use the bounding container to map the points.
        </p>

        <SimpleImage :img="require('./img/4-texture-mapping/4-texture-mapping-2.png')">
            Mesh Mapping
        </SimpleImage>

        <p>
            With the magic of polymorphism, I'm also able to choose the type of intermediate container to perform the mapping.
        </p>

        <SimpleImage :img="require('./img/4-texture-mapping/4-texture-mapping-5.png')">
            Sphere and Cube Mapping For Mesh
        </SimpleImage>

        <h2>
            5. Bump Mapping
        </h2>

        <p>
            With the uv-mapping from the previous objective, it was easy to implement bump mapping.
        </p>

        <div class="grid grid-3">
            <SimpleImage :img="require('./img/5-bump-mapping/5-bump-mapping-1.png')">
                Light at <code>x=-200</code>
            </SimpleImage>
            <SimpleImage :img="require('./img/5-bump-mapping/5-bump-mapping-2.png')">
                Light at <code>x=0</code>
            </SimpleImage>
            <SimpleImage :img="require('./img/5-bump-mapping/5-bump-mapping-3.png')">
                Light at <code>x=200</code>
            </SimpleImage>
        </div>

        <SimpleImage :img="require('./img/5-bump-mapping/earthbump1k.png')">
            Bump Map
        </SimpleImage>
        <SimpleImage :img="require('./img/5-bump-mapping/5-bump-mapping-4.png')">
            The Earth can't be complete without the moon!
        </SimpleImage>

        <h2>
            6. Bounding Volume Hierarchy
        </h2>

        <p>
            When there are only a few objects, using a tree-hierachy to cache the scene was more expensive than a simple array. For more complex scenes (most use cases), using a tree-hierarchy significantly improved the rendering time.
        </p>

        <SimpleTable
            :data="[
                [
                    'Scene',
                    'Rendering Time without BVH (s)',
                    'Rendering Time with BVH (s)',
                ],
                [
                    'Cornell Box',
                    2.92,
                    3.30,
                ],
                [
                    'Chess Board',
                    163.22,
                    33.44,
                ],
            ]"
        />

        <div class="grid grid-2">
            <SimpleImage :img="require('./img/6-bvh/cornell-box.png')">
                Cornell Box
            </SimpleImage>
            <SimpleImage :img="require('./img/6-bvh/chess-1.png')">
                Chess Board
            </SimpleImage>
        </div>

        <h2>
            7. Anti-Aliasing
        </h2>

        <div class="grid grid-3">
            <SimpleImage :img="require('./img/7-antialias/cornell-box-no-antialiasing.png')">
                No Anti-Aliasing
            </SimpleImage>
            <SimpleImage :img="require('./img/7-antialias/cornell-box-supersampling.png')">
                Super Sampling 4x
            </SimpleImage>
            <SimpleImage :img="require('./img/7-antialias/cornell-box-adaptive-sampling.png')">
                Adaptive Sampling Depth 2 <br>
                Threshold 0.01
            </SimpleImage>
        </div>

        <SimpleImage :img="require('./img/7-antialias/cornell-box-adaptive-sampling-debug.png')">
            Where Additional Sampling was Performed
        </SimpleImage>

        <p>
            Although there are a couple jagged edges in adaptive sampling, it's still a big improvement over no anti-aliasing and it has a much better performance than super sampling.
        </p>

        <SimpleTable
            :data="[
                [
                    'Anti-Aliasing',
                    'Render Time (s)',
                ],
                [
                    'No Anti-Aliasing',
                    2.8,
                ],
                [
                    'Super Sampling',
                    36.80,
                ],
                [
                    'Adaptive Sampling',
                    11.24,
                ],
            ]"
        />

        <h2>
            8. Soft Shadows
        </h2>

        <p>
            This was one of the first Monte-Carlo techniques that I implemented. It was implemented by sampling random points on area lights. After 49 samples (7x7 grid), there isn't much improvement.
        </p>

        <div class="grid grid-4">
            <SimpleImage :img="require('./img/8-soft-shadows/8-soft-shadows-1.png')">
                1 Sample
            </SimpleImage>
            <SimpleImage :img="require('./img/8-soft-shadows/8-soft-shadows-4.png')">
                4 Samples
            </SimpleImage>
            <SimpleImage :img="require('./img/8-soft-shadows/8-soft-shadows-7.png')">
                49 Samples
            </SimpleImage>
            <SimpleImage :img="require('./img/8-soft-shadows/8-soft-shadows-10.png')">
                100 Samples
            </SimpleImage>
        </div>

        <h2>
            9. Depth of Field
        </h2>

        <p>
            Another Monte-Carlo technique by sampling various points on the camera.
        </p>

        <div class="grid grid-3">
            <SimpleImage :img="require('./img/9-dof/9-dof-1.png')">
                Focal Distance of 250
            </SimpleImage>
            <SimpleImage :img="require('./img/9-dof/9-dof-2.png')">
                Focal Distance of 500
            </SimpleImage>
            <SimpleImage :img="require('./img/9-dof/9-dof-3.png')">
                Focal Distance of 750
            </SimpleImage>
        </div>

        <h2>
            10. Final Scene
        </h2>

        <p>
            For my final scene, I wanted to render a chess board onto a real photo. Ideally, it should blend seemlessly into the background image like CGI. Unfortunately I made my final scene too complex so it won't be able to finish before the deadline (I killed the process after it made less than 10% progress in 9 hours with 40 threads).
        </p>

        <SimpleImage :img="require('./img/10-final-scene/chess-2-bv.png')">
            Preview of Original Final Scene with Bounding Volumes instead of Mesh
        </SimpleImage>

        <p>
            To save time, I designed this alternative scene with only 3 chess-pieces instead of all 16. Sadly this was also not able to finish in full resolution before the deadline. <em>Sigh</em>, I really wish Waterloo have better undergrad servers for doing these heavy computations.
        </p>

        <SimpleImage :img="require('./img/10-final-scene/chess-3-small.png')">
            Preview of Final Scene 2
        </SimpleImage>

        <h3>
            Update
        </h3>

        <p>
            After giving up on the undergrad machines, I spent $20 on an c4.8xlarge instance on Amazon EC2 to render my image before the report's deadline. I can't believe 36 virtual threads on Intel Xeon processors beat the 56 threads on AMD processors on our CS servers.
        </p>

        <SimpleImage :img="require('./img/10-final-scene/chess-3.png')">
            Final Scene 2
        </SimpleImage>
    </BlogPost>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import dayjs from 'dayjs'

export const TITLE = 'Finally, A Ray Tracer!'
export const CREATED_AT = dayjs.utc('2015-07-22')

export default defineComponent({
    setup() {
        return {
            TITLE,
            CREATED_AT,
        }
    },
})
</script>
