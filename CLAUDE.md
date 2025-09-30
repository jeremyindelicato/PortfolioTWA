# 🤖 CLAUDE CONTEXT - Portfolio TWA

## 📊 ÉTAT ACTUEL DU PROJET (30 Sep 2025)

### ✅ **QUESTIONNAIRE IA - TERMINÉ**
- **Table Supabase :** `ai_quote_requests` créée et fonctionnelle
- **RLS :** Désactivé volontairement (simplicité > sécurité pour ce cas)
- **Interface :** 8 étapes complètes avec animations Framer Motion
- **Backend :** Fonctions Supabase intégrées (`submitAiQuoteRequest`, etc.)
- **Email :** Template IA spécifique avec Edge Function modifiée
- **Status :** 100% fonctionnel ✅

### 🎬 **BACKGROUNDS & LOADER - RÉCEMMENT OPTIMISÉS**
- **Remplacement vidéos MP4 → GIFs :** `backgrounddark.gif` + `backgroundlight.gif`
- **Responsive adaptatif :** Mobile (scale 1.1 + blur), Tablet (scale 1.05), Desktop (standard)
- **Loader intelligent :** Affiché uniquement sur page d'accueil + première visite
- **Performance :** `loading="eager"` + `decoding="async"` + sessionStorage tracking
- **Status :** 100% optimisé ✅

### 🔧 **ARCHITECTURE MISE EN PLACE**
- **QuoteModal.jsx :** Support Web + IA avec logique conditionnelle
- **supabase.js :** Fonctions séparées pour Web et IA
- **Edge Function :** Templates email différenciés (💻 Web, 🤖 IA)
- **Pattern.jsx :** Backgrounds GIF responsive avec overlays adaptatifs
- **LoaderController :** Gestion intelligente avec sessionStorage
- **Migration SQL :** `/migrations/create_ai_quote_requests.sql`

### 📋 **PROCHAINE ÉTAPE : QUESTIONNAIRE GROWTH**
- Service à ajouter après les vacances
- Structure déjà en place pour faciliter l'ajout
- Suivre le même pattern que l'IA

### 🗂️ **FICHIERS CLÉS MODIFIÉS**
- `src/components/QuoteModal.jsx` - Interface questionnaire
- `src/components/Pattern.jsx` - Backgrounds GIF responsive
- `src/components/Loader.jsx` - Terminal loader stylé
- `src/contexts/ThemeContext.jsx` - getGifSource() au lieu de getVideoSource()
- `src/App.jsx` - LoaderController intelligent
- `src/utils/supabase.js` - Fonctions backend
- `migrations/create_ai_quote_requests.sql` - Schema DB
- `edge-function-modified.js` - Template email IA

### 🎨 **ASSETS BACKGROUNDS**
- `src/assets/autre/backgrounddark.gif` (686 KB) - Mode sombre
- `src/assets/autre/backgroundlight.gif` (6.2 MB) - Mode clair
- ~~`background-video.mp4`~~ - Remplacé par GIF
- ~~`background-video-white.mp4`~~ - Remplacé par GIF

### 🔑 **VARIABLES D'ENVIRONNEMENT**
- VITE_SUPABASE_URL=https://qdwvokjeerhficpwbmwz.supabase.co
- VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
- RESEND_API_KEY configurée dans Supabase Edge Functions

### 🚨 **POINTS IMPORTANTS**
- RLS désactivé sur `ai_quote_requests` pour simplicité
- Edge Function supporte flag `isAI: true` pour différencier les templates
- Questionnaire IA : 8 étapes (vs 9 pour Web avec e-commerce conditionnel)
- Reset form inclut tous les champs IA
- **Loader :** Uniquement première visite sur `/` (sessionStorage tracking)
- **Backgrounds :** GIFs avec responsive breakpoints (≤768px, 769-1024px, >1024px)

### 📧 **EMAIL SYSTEM**
- Template Web : couleur orange, sections développement
- Template IA : couleur bleue, sections spécifiques IA
- Sujet automatique selon le type de demande

---

## 🎯 **COMMANDES UTILES**

### Développement
```bash
npm run dev          # Lancer l'app
npm run build        # Build production
```

### Supabase
```sql
-- Voir les demandes IA
SELECT * FROM ai_quote_requests ORDER BY created_at DESC;

-- Réactiver RLS si besoin (non recommandé)
ALTER TABLE ai_quote_requests ENABLE ROW LEVEL SECURITY;
```

### Edge Functions
```bash
supabase functions deploy send-quote-email
```

---

## 📝 **NOTES DE SESSION**
- **Retour de vacances (30 Sep 2025) :** Optimisations UX/Performance
- **Questionnaire IA :** Complètement terminé et testé ✅
- **Backgrounds optimisés :** Remplacement vidéos → GIFs responsive ✅
- **Loader amélioré :** Restriction à la page d'accueil uniquement ✅
- **Prêt pour développement Growth :** Architecture en place
- **Système email :** Fonctionnel avec Resend

### 🔄 **CHANGEMENTS RÉCENTS (30 Sep 2025)**
1. **Remplacement MP4 → GIF :** Performance et compatibilité
2. **Responsive backgrounds :** Adaptatifs mobile/tablet/desktop
3. **Loader intelligent :** SessionStorage + restriction à l'accueil
4. **ThemeContext mis à jour :** getGifSource() implémenté

**🎉 PROJET OPTIMISÉ : SUCCESS ✅**