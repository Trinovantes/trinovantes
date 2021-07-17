import path from 'path'
import { merge } from 'webpack-merge'
import { srcWebDir, publicPath, manifestFilePath, distWebPublicDir, distWebDir, distSsgDir, commonNodeConfig } from './webpack.common'
import { PuppeteerPrerenderPlugin } from 'puppeteer-prerender-plugin'
import { Configuration, DefinePlugin } from 'webpack'
import { prerenderRoutes } from './routes'

// ----------------------------------------------------------------------------
// Server
// ----------------------------------------------------------------------------

export default (async(): Promise<Configuration> => merge(commonNodeConfig, {
    entry: {
        www: `${srcWebDir}/entryServer.ts`,
    },

    output: {
        path: distSsgDir,
    },

    plugins: [
        new DefinePlugin({
            'DEFINE.PUBLIC_DIR': JSON.stringify(distWebPublicDir),
            'DEFINE.PUBLIC_PATH': JSON.stringify(publicPath),
            'DEFINE.CLIENT_ENTRY_JS': JSON.stringify('main.js'),
            'DEFINE.CLIENT_ENTRY_CSS': JSON.stringify('main.css'),
            'DEFINE.MANIFEST_FILE': JSON.stringify(manifestFilePath),
        }),
        new PuppeteerPrerenderPlugin({
            enabled: true,
            enablePageJs: false,
            entryDir: distWebDir,
            entryFile: path.resolve(distSsgDir, 'www.js'),
            routes: [
                '/404',
                ...await prerenderRoutes,
            ],
            renderFirstRouteAlone: true,
            puppeteerOptions: {
                headless: true,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                ],
            },
        }),
    ],
}))()
