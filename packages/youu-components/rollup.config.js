import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import LessNpmImport from 'less-plugin-npm-import';
import copy from 'rollup-plugin-copy';

const extensions = ['.js', '.jsx', '.ts', '.tsx', '.es6', '.es', '.mjs'];

const config = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.es.js',
      format: 'es',
    },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
    },
  ],
  external: ['antd', 'react'],
  plugins: [
    postcss({
      extract: true,
      inject: false,
      use: {
        less: {
          plugins: [new LessNpmImport({ prefix: '~' })],
          javascriptEnabled: true,
        },
      },
      plugins: [],
    }),
    nodeResolve({ extensions }),
    typescript(),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      extensions,
      presets: [['@babel/preset-typescript'], ['@babel/preset-env', { modules: false }], ['@babel/preset-react']],
    }),
    copy({
      targets: [{ src: 'src/**/*.less', dest: 'dist' }],
      verbose: true,
      flatten: false,
    }),
  ],
};

export default config;
