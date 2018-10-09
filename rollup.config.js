import multiEntry from 'rollup-plugin-multi-entry';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
import { uglify } from "rollup-plugin-uglify";


export default {
  input: 'lib/**/*.js',
  plugins: [multiEntry(), terser()],

  output: {
    file: 'bundle.js',
    format: 'cjs',
    sourcemap: 'inline',
  },
};
