import path from 'path'
import { Configuration, DefinePlugin } from 'webpack'
import { VueLoaderPlugin } from 'vue-loader'
import { getGitHash } from './secrets'
import { merge } from 'webpack-merge'
import nodeExternals from 'webpack-node-externals'

// ----------------------------------------------------------------------------
// Constants
// ----------------------------------------------------------------------------

// Assume we are running webpack from the project root (../)
const rootDir = path.resolve()

export const isDev = (process.env.NODE_ENV === 'development')
export const gitHash = getGitHash(rootDir)
export const publicPath = '/public/'

export const distDir = path.resolve(rootDir, 'dist')
export const distApiDir = path.resolve(distDir, 'api')
export const distReadmeDir = path.resolve(distDir, 'readme')
export const distWebDir = path.resolve(distDir, 'web')
export const distWebPublicDir = path.resolve(distDir, 'web', 'public')
export const distSsgDir = path.resolve(distDir, 'ssg')
export const manifestFilePath = path.resolve(distDir, 'ssg', 'ssr-manifest.json')

export const srcDir = path.resolve(rootDir, 'src')
export const srcApiDir = path.resolve(srcDir, 'api')
export const srcReadmeDir = path.resolve(srcDir, 'readme')
export const srcWebDir = path.resolve(srcDir, 'web')
export const staticDir = path.resolve(srcDir, 'web', 'static')

// ----------------------------------------------------------------------------
// Base
// ----------------------------------------------------------------------------

export const commonConfig: Configuration = {
    mode: isDev
        ? 'development'
        : 'production',
    devtool: 'source-map',

    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json', 'scss', '.css'],
        alias: {
            // Need to match aliases in tsconfig.json
            '@': path.resolve(srcDir),
        },
    },

    plugins: [
        new DefinePlugin({
            __VUE_OPTIONS_API__: JSON.stringify(false),
            __VUE_PROD_DEVTOOLS__: JSON.stringify(false),

            'DEFINE.IS_DEV': JSON.stringify(isDev),
            'DEFINE.IS_SSR': "(typeof window === 'undefined')",
            'DEFINE.GIT_HASH': JSON.stringify(gitHash),
        }),
        new VueLoaderPlugin(),
    ],

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        appendTsSuffixTo: [/\.vue$/],
                    },
                }],
            },
            {
                test: /\.vue$/,
                use: 'vue-loader',
            },
        ],
    },
}

export const commonNodeConfig = merge(commonConfig, {
    target: 'node',

    module: {
        rules: [
            {
                // Do not inject css in the server bundle
                test: /\.(css|sass|scss)$/,
                use: 'null-loader',
            },
            {
                // Do not inject fonts in the server bundle
                test: /\.(ttf|eot|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'null-loader',
            },
            {
                test: /\.(svg)$/i,
                type: 'asset/source',
            },
            {
                test: /\.(jpe?g|png|gif|webp)$/i,
                use: [
                    {
                        loader: 'responsive-loader',
                        options: {
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            adapter: require('responsive-loader/sharp'),
                            format: 'webp',
                            publicPath: publicPath,
                            emitFile: false,
                        },
                    },
                ],
            },
        ],
    },

    output: {
        // This tells the server bundle to use Node-style exports
        libraryTarget: 'commonjs2',
    },

    externals: [
        // Do not externalize dependencies that need to be processed by webpack.
        // You should also whitelist deps that modify `global` (e.g. polyfills)
        nodeExternals({
            allowlist: [
                /^vue*/,
                /\.(css|sass|scss)$/,
                /\.(vue)$/,
                /\.(html)$/,
            ],
        }),
    ],
})
