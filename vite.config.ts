import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Split the bundle into smaller chunks for faster initial load
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React runtime — loads first, cached aggressively
          'vendor-react': ['react', 'react-dom'],
          // Lucide icons — large lib, separate chunk
          'vendor-icons': ['lucide-react'],
        },
      },
    },
    // Increase chunk size warning threshold (informational only)
    chunkSizeWarningLimit: 600,
  },
})
