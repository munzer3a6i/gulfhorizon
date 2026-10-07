import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Dev-only escape hatch: with ALLOW_MISSING_ASSETS=1, imports of asset files that don't exist yet
 * resolve to an empty string instead of failing the build.
 */
function allowMissingAssets() {
  return {
    name: 'allow-missing-assets',
    enforce: 'pre',
    resolveId(source, importer) {
      if (!process.env.ALLOW_MISSING_ASSETS || !importer || !/\.(svg|png|jpe?g|webp)$/.test(source)) return null
      const full = resolve(dirname(importer), source)
      return existsSync(full) ? null : `\0missing-asset:${full}`
    },
    load(id) {
      if (id.startsWith('\0missing-asset:')) return 'export default ""'
      return null
    },
  }
}

export default defineConfig({
  plugins: [allowMissingAssets(), react(), tailwindcss()],
})
