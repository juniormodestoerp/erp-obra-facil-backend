import { defineConfig, Options } from 'tsup'

const nodeConfig: Options = {
  name: 'node',
  platform: 'node',
  entry: ['./src/**/*.{ts,tsx,js,jsx,svg,png,jpg,jpeg}'],
  outDir: './dist',
  splitting: false,
  sourcemap: true,
  clean: true,
  format: ['cjs'],
  loader: {
    '.sh': 'copy',
    '.cer': 'copy',
    '.key': 'copy',
    '.pem': 'copy',
    '.svg': 'copy',
    '.png': 'copy',
    '.jpg': 'copy',
    '.jpeg': 'copy',
  },
  ignoreWatch: ['**/node_modules/**'],
}

const prismaConfig: Options = {
  name: 'prisma',
  platform: 'node',
  entry: ['./prisma/**/*.{ts,tsx,js,jsx,prisma}'],
  outDir: './dist/prisma',
  splitting: false,
  sourcemap: true,
  clean: true,
  format: ['cjs'],
  loader: {
    '.prisma': 'copy',
  },
  ignoreWatch: ['**/node_modules/**'],
}

export default defineConfig([nodeConfig, prismaConfig])
