import { merge } from 'webpack-merge'
import { commonNodeConfig, distReadmeDir, srcReadmeDir } from './webpack.common'

// ----------------------------------------------------------------------------
// Api
// ----------------------------------------------------------------------------

export default merge(commonNodeConfig, {
    entry: {
        generateReadme: `${srcReadmeDir}/generateReadme.ts`,
    },

    output: {
        path: distReadmeDir,
    },
})
