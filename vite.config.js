import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { compression } from 'vite-plugin-compression2'
import { VitePWA } from 'vite-plugin-pwa'

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
    }),
    // Service Worker PWA pour caching intelligent
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', '*.webp', '*.webm', '*.svg'],
      manifest: {
        name: 'Jeremy Indelicato - Portfolio TWA',
        short_name: 'Portfolio TWA',
        description: 'Portfolio professionnel de Jérémy Indelicato - AI & Data Scientist',
        theme_color: '#3F8391',
        background_color: '#040F11',
        display: 'standalone',
        icons: [
          {
            src: '/logo-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/logo-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 50 * 1024 * 1024, // 50 MB (pour heronew.webp)
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,webm,woff2,woff}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 an
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|webp|gif)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 jours
              }
            }
          },
          {
            urlPattern: /\.(?:js|css)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 7 jours
              }
            }
          }
        ]
      }
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
