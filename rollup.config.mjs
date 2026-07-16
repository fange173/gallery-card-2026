import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

const dev = process.env.ROLLUP_WATCH;

const plugins = [
  nodeResolve({}),
  commonjs(),
  !dev &&
  terser({
    format: {
      comments: false,
    },
    mangle: {
      safari10: true,
    },
  }),
];

export default [
  {
    input: 'src/gallery-card.js',
    output: {
      file: 'gallery-card.js',
      format: 'es',
      sourcemap: dev ? true : false,
    },
    plugins: [...plugins],
    watch: {
      exclude: 'node_modules/**',
    },
  },
];
