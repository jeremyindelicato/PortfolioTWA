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
          'three': ['three', '@react-three/fiber', '@react-three/drei'],
          'animations': ['framer-motion', 'gsap'],
          'ui': ['lucide-react', 'react-hook-form'],
        }
      }
    },
    
    // Compression optimisée
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Supprimer console.log en production
        drop_debugger: true
      }
    },
    
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
