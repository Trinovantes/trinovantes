import path from 'path'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import SitemapPlugin from 'sitemap-webpack-plugin'
import { WebpackManifestPlugin } from 'webpack-manifest-plugin'
import { VueLoaderPlugin } from 'vue-loader'
import { createOutputNameFn } from './createOutputNameFn'

export default {
    target: 'web',

    entry: {
        main: path.resolve('src/web/entryClient.ts'),
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader',
                    options: {
                        // Sets __file property in ComponentOptions in production
                        exposeFilename: true,
                    },
                }],
            },
        ]
    },

    optimization: {
        // Do not mangle names in production
        chunkIds: 'named',

        // Do not merge chunks so we can output each component to named files
        // e.g. HomePage.vue -> HomePage.js HomePage.css
        splitChunks: {
            chunks: 'all',
            minSize: 0,
        },
    },

    output: {
        filename: createOutputNameFn('js', true),
        chunkFilename: createOutputNameFn('js', false),
    },

    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: createOutputNameFn('css', true),
            chunkFilename: createOutputNameFn('css', false),
        }),
        new WebpackManifestPlugin({
            fileName: 'ssr-manifest.json',
        }),
    ]
}
