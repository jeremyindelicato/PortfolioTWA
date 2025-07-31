# 🤖 CLAUDE CONTEXT - Portfolio TWA

## 📊 ÉTAT ACTUEL DU PROJET (31 Jul 2025)

### ✅ **QUESTIONNAIRE IA - TERMINÉ**
- **Table Supabase :** `ai_quote_requests` créée et fonctionnelle
- **RLS :** Désactivé volontairement (simplicité > sécurité pour ce cas)
- **Interface :** 8 étapes complètes avec animations Framer Motion
- **Backend :** Fonctions Supabase intégrées (`submitAiQuoteRequest`, etc.)
- **Email :** Template IA spécifique avec Edge Function modifiée
- **Status :** 100% fonctionnel ✅

### 🔧 **ARCHITECTURE MISE EN PLACE**
- **QuoteModal.jsx :** Support Web + IA avec logique conditionnelle
- **supabase.js :** Fonctions séparées pour Web et IA
- **Edge Function :** Templates email différenciés (💻 Web, 🤖 IA)
- **Migration SQL :** `/migrations/create_ai_quote_requests.sql`

### 📋 **PROCHAINE ÉTAPE : QUESTIONNAIRE GROWTH**
- Service à ajouter après les vacances
- Structure déjà en place pour faciliter l'ajout
- Suivre le même pattern que l'IA

### 🗂️ **FICHIERS CLÉS MODIFIÉS**
- `src/components/QuoteModal.jsx` - Interface questionnaire
- `src/utils/supabase.js` - Fonctions backend
- `migrations/create_ai_quote_requests.sql` - Schema DB
- `edge-function-modified.js` - Template email IA

### 🔑 **VARIABLES D'ENVIRONNEMENT**
- VITE_SUPABASE_URL=https://qdwvokjeerhficpwbmwz.supabase.co
- VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
- RESEND_API_KEY configurée dans Supabase Edge Functions

### 🚨 **POINTS IMPORTANTS**
- RLS désactivé sur `ai_quote_requests` pour simplicité
- Edge Function supporte flag `isAI: true` pour différencier les templates
- Questionnaire IA : 8 étapes (vs 9 pour Web avec e-commerce conditionnel)
- Reset form inclut tous les champs IA

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
- Utilisateur parti en vacances 1 semaine (31 Jul 2025)
- Questionnaire IA complètement terminé et testé
- Prêt pour développement Growth au retour
- Système email fonctionnel avec Resend

**🎉 PROJET IA : SUCCESS ✅**