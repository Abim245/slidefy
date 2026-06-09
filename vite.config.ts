import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx, type ManifestV3Export } from '@crxjs/vite-plugin'
import manifest from './manifest.json'

const manifestConfig = manifest as unknown as ManifestV3Export

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest: manifestConfig })],
  build: {
    sourcemap: false,
    target: 'chrome89',
    rollupOptions: {
      input: {"content": "src/content"}
    }
},
optimizeDeps: {
    force: true
}
})
