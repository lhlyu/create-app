import typescript from "@rollup/plugin-typescript";
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import terser from '@rollup/plugin-terser'
import strip from '@rollup/plugin-strip'

export default {
    input: 'src/index.ts',
    output: [
        {
            file: './dist/index.mjs',
            format: 'es',
        }
    ],
    plugins: [
        typescript(),
        json(),
        resolve(),
        babel({ babelHelpers: 'bundled' }),
        commonjs(),
        terser(),
        strip(),
    ]
}
