import { defineConfig } from 'tsup'

export default defineConfig({
  loader: {
    '.sh': 'copy',
    '.cer': 'copy',
    '.key': 'copy',
    '.pem': 'copy',
  },
})
