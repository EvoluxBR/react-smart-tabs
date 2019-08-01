import typescript from 'rollup-plugin-typescript';
import scss from 'rollup-plugin-scss'

export default {
  input: './src/components/tabs/index.jsx',
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
    typescript(),
    scss({output: './dist/bundle.css',})
  ]
}