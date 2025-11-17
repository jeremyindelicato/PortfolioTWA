import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { compression } from 'vite-plugin-compression2'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      // Optimiser le Fast Refresh
      fastRefresh: true
    }),
    // Compression Brotli pour production
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false
    }),
    // Compression Gzip pour fallback
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024,
      deleteOriginFile: false
    })
  ],

  // Optimisations de performance
  build: {
    // Target moderne browsers pour code plus léger
    target: 'es2020',

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
        },
        // Noms de fichiers optimisés avec hash
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: ({ name }) => {
          if (/\.(woff2?|eot|ttf|otf)$/i.test(name ?? '')) {
            return 'fonts/[name]-[hash][extname]';
          }
          if (/\.(png|jpe?g|svg|gif|webp|avif)$/i.test(name ?? '')) {
            return 'images/[name]-[hash][extname]';
          }
          if (/\.css$/i.test(name ?? '')) {
            return 'css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    },

    // Compression optimisée avec terser
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Enlever console.log en prod
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
        passes: 2 // Double passe pour meilleure compression
      },
      mangle: {
        safari10: true // Compatibilité Safari
      }
    },

    // Taille des chunks optimisée
    chunkSizeWarningLimit: 800,

    // CSS Code Splitting
    cssCodeSplit: true,

    // Sourcemaps désactivés en prod pour performances
    sourcemap: false,

    // Optimiser les assets
    assetsInlineLimit: 4096, // Inline assets < 4kb en base64

    // Report bundle size
    reportCompressedSize: true
  },

  // Optimisations serveur dev
  server: {
    hmr: {
      overlay: false // Éviter l'overlay d'erreur qui peut ralentir
    },
    // Preload modules
    warmup: {
      clientFiles: ['./src/main.jsx', './src/App.jsx']
    }
  },

  // Optimisations des assets
  assetsInclude: ['**/*.woff2', '**/*.woff', '**/*.webm'],

  // Optimisations CSS
  css: {
    devSourcemap: false // Désactiver sourcemaps CSS en dev
  },

  // Optimisations de résolution
  resolve: {
    // Éviter de résoudre des extensions inutiles
    extensions: ['.mjs', '.js', '.jsx', '.json']
  },

  // Optimisations des dépendances
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      '@supabase/supabase-js'
    ],
    // Forcer le pre-bundling
    force: false
  }
})
