import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import pkg from '../package.json';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import type { RollupOptions } from 'rollup'
import json from '@rollup/plugin-json';
export default {
  input: './src/index.ts',
  output: {
    file: `dist/${pkg.name}.min.js`,
    name: 'Magnifier', // UMD 导出全局变量名
    banner:
    `/**
      * @name ${pkg.name}
      * @author ${pkg.author}
      * @description ${pkg.description}
      */`,
    format: 'umd'
  },
  plugins: [
    nodeResolve({
    }),
    commonjs(),
    babel({ babelHelpers: 'bundled' }),
    json(), // 处理.json
    replace({
      preventAssignment: true
    }),
    typescript()
  ]
} as RollupOptions

