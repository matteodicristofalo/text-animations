import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import copy from 'rollup-plugin-copy';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es',
    preserveModules: true,
    preserveModulesRoot: 'src'
  },
  plugins: [
    typescript(),
    peerDepsExternal(),
    resolve(),
    preserveCssImports(),
    copy({
      targets: [
        {
          src: 'src/**/*.{css,scss}',
          dest: 'dist',
        }
      ],
      flatten: false
    })
  ],
}

function preserveCssImports() {
  return {
    name: 'preserve-scss-import',

    resolveId(source, importer) {
      if (!importer) return null;

      if (source.endsWith('.css') || source.endsWith('.scss'))
        return { id: source, external: true };

      return null;
    }
  };
}