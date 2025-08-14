import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  
  // Optimisations de performance
  build: {
    // Code splitting optimisé
    rollupOptions: {
      output: {
        manualChunks: {
          // Séparer les gros packages
          'vendor': ['react', 'react-dom'],
          'three': ['three', '@react-three/fiber', '@react-three/drei'],
          'animations': ['framer-motion', 'gsap'],
          'ui': ['lucide-react', 'react-hook-form'],
          'supabase': ['@supabase/supabase-js'],
          'router': ['react-router-dom']
        }
      }
    },
    
    // Compression optimisée
    minify: 'terser',
    
    // Taille des chunks optimisée
    chunkSizeWarningLimit: 1000
  },
  
  // Optimisations serveur dev
  server: {
    hmr: {
      overlay: false // Éviter l'overlay d'erreur qui peut ralentir
    }
  },
  
  // Optimisations des assets
  assetsInclude: ['**/*.woff2', '**/*.woff'],
  
  // Optimisations CSS
  css: {
    devSourcemap: false // Désactiver sourcemaps CSS en dev pour plus de rapidité
  }
})
