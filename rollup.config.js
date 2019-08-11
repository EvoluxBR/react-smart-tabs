import typescript from 'rollup-plugin-typescript';
import scss from 'rollup-plugin-scss';
import {terser} from "rollup-plugin-terser";

export default {
  input: './src/components/index.tsx',
  external: ['react', 'uuid'],
  output: {
    file: './dist/bundle.js',
    format: 'umd',
    name: 'react-smart-tabs',
    globals: {
        react: "React",
        uuid: "uuid",
    }
  },
  plugins: [
    typescript({
      typescript: require('typescript'),
     }),
    scss({output: './dist/bundle.css',}),
    terser(),
  ]
}