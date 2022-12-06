import { defineConfig } from 'vite'
//@ts-ignore
import * as path from 'path'
import react from '@vitejs/plugin-react'

// @ts-ignore
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    AutoImport({
      include: [
        /\.[tj]sx?$/,
      ],
      imports: [
        'react',
        {
          'lodash-es': ['throttle']
        }
      ],
      dirs: [
        './src/components'
      ],
      dts: './src/auto-imports.d.ts',
      vueTemplate: false,
      presetOverriding: true,
      eslintrc: {
        enabled: false,
        filepath: './.eslintrc-auto-import.json', 
        globalsPropValue: true, 
      },
    }),
  ],
  clearScreen: true,
  server: {
    strictPort: true,
  },
  envPrefix: ['VITE_', 'TAURI_'],
  build: {
    target: ['es2021', 'chrome100', 'safari13'],
    minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
    sourcemap: !!process.env.TAURI_DEBUG,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
})
