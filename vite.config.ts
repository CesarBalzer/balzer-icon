import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import svgr from 'vite-plugin-svgr'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    copyPublicDir: false,
    sourcemap: true,
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, "lib/index.ts"),
      name: "balzer-icon",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        },
      }
    }
  },
  plugins: [
    react(),
    svgr(),
    dts({ tsconfigPath: './tsconfig.build.json' })
  ]
})
