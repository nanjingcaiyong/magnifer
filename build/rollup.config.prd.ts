import baseConfig from './rollup.config.base';
import terser from '@rollup/plugin-terser';
import { merge } from 'webpack-merge';
import { RollupOptions } from 'rollup'

const prdConfig: RollupOptions = {
  output: {
    plugins: [terser()]
  }
}

export default merge(baseConfig, prdConfig)
