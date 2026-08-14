import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],

    // ---------- Dev server ----------
    server: {
      host: '0.0.0.0',
      port: 5173,
      strictPort: false,
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://127.0.0.1:8000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },

    // ---------- Production build ----------
    build: {
      outDir: 'dist',
      sourcemap: false,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          // Function form required for Vite 8 (rolldown)
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react-dom') || id.includes('react/')) return 'react'
              if (id.includes('react-router-dom')) return 'router'
              if (id.includes('framer-motion')) return 'motion'
              if (id.includes('recharts')) return 'recharts'
              if (id.includes('lucide-react')) return 'lucide'
              return 'vendor'
            }
          },
        },
      },
    },

    // ---------- Preview (after build) ----------
    preview: {
      host: '0.0.0.0',
      port: 4173,
      strictPort: false,
    },
  }
})
