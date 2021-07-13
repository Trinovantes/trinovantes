import path from 'path'
import { merge } from 'webpack-merge'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import { commonConfig, isDev, staticDir, srcWebDir, distWebDir, distWebPublicDir, publicPath, manifestFilePath } from './webpack.common'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { Chunk } from 'webpack'
import { WebpackManifestPlugin } from 'webpack-manifest-plugin'

// ----------------------------------------------------------------------------
// Web
// ----------------------------------------------------------------------------

function createFilenameFn(ext: string) {
    return (pathData: unknown): string => {
        const defaultChunkName = isDev
            ? `[name].${ext}`
            : `[name].[contenthash].${ext}`

        const data = pathData as { chunk: Chunk }
        const chunkId = data.chunk.id
        if (typeof chunkId !== 'string') {
            return defaultChunkName
        }

        const pathParts = chunkId.split('_')
        pathParts.reverse()
        if (pathParts[0] !== 'vue') {
            return defaultChunkName
        }

        const fileName = (pathParts[1] === 'index')
            ? pathParts[2]
            : pathParts[1]

        return defaultChunkName.replace('[name]', fileName)
    }
}

export default merge(commonConfig, {
    target: 'web',

    entry: {
        main: path.resolve(srcWebDir, 'entryClient.ts'),
    },

    output: {
        path: distWebPublicDir,
        publicPath: publicPath,
        filename: createFilenameFn('js'),
        chunkFilename: createFilenameFn('js'),
    },

    optimization: {
        chunkIds: 'named',
    },

    devServer: {
        historyApiFallback: {
            index: 'app.html',
        },
        contentBase: [
            distWebDir,
            staticDir,
        ],
        contentBasePublicPath: [
            '/',
            '/',
        ],
        index: 'app.html',
        writeToDisk: (filePath) => {
            return filePath.endsWith('.html')
        },
        proxy: {
            '/api': 'http://localhost:3000',
        },
    },

    module: {
        rules: [
            {
                test: /\.(sass|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            additionalData: (content: string, loaderContext: { resourcePath: string }): string => {
                                return (loaderContext.resourcePath.endsWith('sass'))
                                    ? '@use "sass:math"\n @import "@/web/assets/css/variables.scss"\n' + content
                                    : '@use "sass:math";  @import "@/web/assets/css/variables.scss"; ' + content
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(ttf|eot|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                type: 'asset',
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
                        },
                    },
                ],
            },
        ],
    },

    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: staticDir,
                    to: distWebDir,
                    noErrorOnMissing: true,
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: createFilenameFn('css'),
            chunkFilename: createFilenameFn('css'),
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(srcWebDir, 'index.html'),
            filename: path.resolve(distWebDir, 'app.html'),
        }),
        new WebpackManifestPlugin({
            fileName: manifestFilePath,
        }),
    ],
})
