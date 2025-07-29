# 🗄️ Configuration Supabase - Portfolio TWA

Guide complet pour configurer Supabase et l'envoi d'emails automatique.

## 📋 Étapes de configuration

### 1. 🏗️ Créer la structure de base de données

Dans votre dashboard Supabase, allez dans l'**SQL Editor** et exécutez le script `supabase-schema.sql` :

```sql
-- Copiez/collez le contenu du fichier supabase-schema.sql
```

### 2. 🔑 Configurer les variables d'environnement

1. Copiez `.env.example` vers `.env` :
```bash
cp .env.example .env
```

2. Remplissez vos vraies valeurs dans `.env` :
```env
# Trouvez ces valeurs dans Supabase Dashboard > Settings > API
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhb...votre_cle_anonyme

# Pour l'envoi d'emails (étape 3)
RESEND_API_KEY=re_...votre_cle_resend
```

📍 **Où trouver vos clés Supabase :**
- Dashboard Supabase > **Settings** > **API**
- URL : Section "Project URL"
- Anon Key : Section "Project API keys" > "anon public"

### 3. 📧 Configurer l'envoi d'emails

#### Option A : Avec Resend (Recommandé)

1. Créez un compte sur [Resend.com](https://resend.com)
2. Générez une API key
3. Ajoutez `RESEND_API_KEY` dans votre `.env`

#### Option B : Avec SendGrid ou autres

Modifiez la fonction `send-quote-email` pour utiliser votre service préféré.

### 4. 🚀 Déployer l'Edge Function

1. Installez Supabase CLI :
```bash
npm install -g supabase
```

2. Connectez-vous à votre projet :
```bash
supabase login
supabase link --project-ref votre-project-ref
```

3. Créez la fonction :
```bash
supabase functions new send-quote-email
```

4. Remplacez le contenu par `supabase-email-function.ts`

5. Déployez :
```bash
supabase functions deploy send-quote-email
```

6. Configurez les variables :
```bash
supabase secrets set RESEND_API_KEY=votre_cle_resend
```

### 5. ✅ Tester la configuration

1. Lancez le projet :
```bash
npm run dev
```

2. Testez le formulaire de devis :
   - Sélectionnez "Développement Web"
   - Remplissez le questionnaire complet
   - Vérifiez que vous recevez l'email

## 🔧 Dépannage

### Erreur "Missing environment variables"
- Vérifiez que `.env` existe et contient les bonnes valeurs
- Redémarrez le serveur de développement après modification

### Erreur "Cannot insert into table"
- Vérifiez que le schéma SQL a été exécuté correctement
- Vérifiez les politiques RLS (Row Level Security)

### Email non reçu
- Vérifiez les logs de l'Edge Function dans Supabase Dashboard
- Vérifiez votre API key du service email
- Vérifiez vos spams

### Base de données inaccessible
- Vérifiez votre plan Supabase (RLS, branches, etc.)
- Créez une branche de développement si nécessaire

## 📊 Fonctionnalités incluses

### Base de données
- ✅ Table `quote_requests` avec tous les champs du questionnaire
- ✅ Index optimisés pour les recherches
- ✅ RLS (Row Level Security) configuré
- ✅ Triggers pour `updated_at` automatique
- ✅ Vues pour statistiques

### Backend
- ✅ Sauvegarde automatique des demandes
- ✅ Envoi d'email de notification instantané
- ✅ Template HTML professionnel
- ✅ Gestion d'erreurs complète
- ✅ Logs détaillés

### Frontend
- ✅ Integration Supabase seamless
- ✅ Loading states et feedback utilisateur
- ✅ Gestion d'erreurs gracieuse
- ✅ Reset automatique du formulaire
- ✅ Validation des données

## 🎯 Prochaines étapes

1. **Dashboard admin** : Interface pour gérer les demandes
2. **Email de suivi** : Relances automatiques
3. **Intégration CRM** : Sync avec votre CRM préféré
4. **Analytics** : Statistiques de conversion
5. **A/B Testing** : Optimiser le formulaire

## 🆘 Besoin d'aide ?

Si vous rencontrez des problèmes :

1. Vérifiez les logs dans la console du navigateur
2. Vérifiez les logs de l'Edge Function dans Supabase
3. Testez la connexion avec `testSupabaseConnection()`
4. Contactez le support Supabase si nécessaire

---

📧 Une fois configuré, chaque demande de devis sera automatiquement sauvegardée et vous recevrez un email de notification complet avec toutes les informations du prospect !