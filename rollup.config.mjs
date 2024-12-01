import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postCss from 'rollup-plugin-postcss';
import preserveDirectives from 'rollup-preserve-directives'

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es',
  },
  plugins: [
    postCss({
      extract: true,
      modules: true,
    }),
    typescript(),
    peerDepsExternal(),
    resolve(),
    preserveDirectives(),
  ],
}