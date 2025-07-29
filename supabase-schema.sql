-- ================================================
-- 📋 PORTFOLIO TWA - SUPABASE SCHEMA
-- Structure de base de données pour les demandes de devis
-- ================================================

-- Supprimer la table si elle existe déjà (pour les mises à jour)
DROP TABLE IF EXISTS quote_requests CASCADE;

-- Créer la table principale pour les demandes de devis
CREATE TABLE quote_requests (
    -- Identifiants et métadonnées
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- 🛠️ Étape 1: Type de service
    service_type TEXT NOT NULL CHECK (service_type IN ('Développement Web', 'Intelligence Artificielle', 'Growth Marketing')),
    
    -- 👤 Étape 2: Informations générales (obligatoires)
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    company_name TEXT,
    business_sector TEXT,
    has_existing_website BOOLEAN,
    existing_website_url TEXT,
    
    -- 🎯 Étape 3: Objectifs du projet
    project_goals TEXT[], -- Array pour choix multiples
    project_description TEXT,
    
    -- ⚙️ Étape 4: Fonctionnalités souhaitées (pour développement web)
    desired_features TEXT[], -- Array pour choix multiples
    need_design BOOLEAN,
    
    -- 🛒 Étape 5: E-commerce (conditionnel)
    product_count TEXT,
    payment_methods TEXT[], -- Array pour choix multiples
    delivery_needed BOOLEAN,
    
    -- ⏰ Étape 6: Délais & budget
    ideal_launch_date DATE,
    budget_range TEXT,
    
    -- 🔧 Étape 7: Maintenance & suivi
    need_training BOOLEAN,
    need_maintenance TEXT CHECK (need_maintenance IN ('Oui', 'Non', 'À discuter')),
    
    -- 💬 Étape 8: Autres besoins
    additional_notes TEXT,
    
    -- 📞 Étape 9: Contact préféré
    preferred_contact TEXT CHECK (preferred_contact IN ('Email', 'Téléphone', 'Visio')),
    
    -- 📊 Statut et suivi interne
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'in_progress', 'quoted', 'accepted', 'completed', 'cancelled')),
    internal_notes TEXT, -- Notes internes pour Jérémy
    estimated_price DECIMAL(10,2), -- Prix estimé en euros
    final_price DECIMAL(10,2), -- Prix final négocié
    contract_signed_at TIMESTAMP WITH TIME ZONE,
    project_completed_at TIMESTAMP WITH TIME ZONE,
    
    -- 📧 Suivi email
    email_sent_at TIMESTAMP WITH TIME ZONE,
    email_status TEXT DEFAULT 'pending' CHECK (email_status IN ('pending', 'sent', 'failed', 'bounced'))
);

-- ================================================
-- 🔍 INDEX POUR OPTIMISER LES RECHERCHES
-- ================================================

-- Index pour les recherches fréquentes
CREATE INDEX idx_quote_requests_email ON quote_requests(email);
CREATE INDEX idx_quote_requests_service_type ON quote_requests(service_type);
CREATE INDEX idx_quote_requests_created_at ON quote_requests(created_at DESC);
CREATE INDEX idx_quote_requests_status ON quote_requests(status);
CREATE INDEX idx_quote_requests_email_status ON quote_requests(email_status);

-- Index composé pour les recherches combinées
CREATE INDEX idx_quote_requests_service_status ON quote_requests(service_type, status);

-- ================================================
-- 🔒 ROW LEVEL SECURITY (RLS)
-- ================================================

-- Activer RLS pour sécuriser l'accès
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre l'insertion publique (formulaire web)
CREATE POLICY "Allow public insert" ON quote_requests
    FOR INSERT TO anon
    WITH CHECK (true);

-- Politique pour permettre la lecture aux utilisateurs authentifiés seulement
CREATE POLICY "Allow authenticated read" ON quote_requests
    FOR SELECT TO authenticated
    USING (true);

-- Politique pour permettre la mise à jour aux utilisateurs authentifiés
CREATE POLICY "Allow authenticated update" ON quote_requests
    FOR UPDATE TO authenticated
    USING (true)
    WITH CHECK (true);

-- ================================================
-- 🔄 TRIGGER POUR MISE À JOUR AUTOMATIQUE
-- ================================================

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pour appeler la fonction sur UPDATE
CREATE TRIGGER update_quote_requests_updated_at 
    BEFORE UPDATE ON quote_requests 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- ================================================
-- 📊 VUES UTILES POUR LES STATISTIQUES
-- ================================================

-- Vue pour les statistiques par service
CREATE OR REPLACE VIEW quote_stats_by_service AS
SELECT 
    service_type,
    COUNT(*) as total_requests,
    COUNT(*) FILTER (WHERE status = 'pending') as pending_requests,
    COUNT(*) FILTER (WHERE status = 'completed') as completed_requests,
    ROUND(AVG(final_price), 2) as avg_price,
    DATE_TRUNC('month', created_at) as month
FROM quote_requests
GROUP BY service_type, DATE_TRUNC('month', created_at)
ORDER BY month DESC, service_type;

-- Vue pour le dashboard récent
CREATE OR REPLACE VIEW recent_quote_requests AS
SELECT 
    id,
    created_at,
    first_name,
    last_name,
    email,
    company_name,
    service_type,
    status,
    budget_range,
    preferred_contact
FROM quote_requests
WHERE created_at >= NOW() - INTERVAL '30 days'
ORDER BY created_at DESC;

-- ================================================
-- 📧 TABLE POUR LOGS EMAIL (optionnel)
-- ================================================

CREATE TABLE email_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    quote_request_id UUID REFERENCES quote_requests(id) ON DELETE CASCADE,
    email_type TEXT NOT NULL, -- 'quote_request', 'follow_up', 'quote_sent', etc.
    recipient_email TEXT NOT NULL,
    subject TEXT NOT NULL,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT DEFAULT 'sent' CHECK (status IN ('sent', 'failed', 'bounced')),
    error_message TEXT,
    
    -- Index
    FOREIGN KEY (quote_request_id) REFERENCES quote_requests(id)
);

CREATE INDEX idx_email_logs_quote_request ON email_logs(quote_request_id);
CREATE INDEX idx_email_logs_sent_at ON email_logs(sent_at DESC);

-- ================================================
-- 🎉 SCHEMA CRÉÉ AVEC SUCCÈS !
-- ================================================

-- Insérer un exemple de test (optionnel)
INSERT INTO quote_requests (
    service_type,
    first_name,
    last_name,
    email,
    company_name,
    business_sector,
    has_existing_website,
    project_goals,
    project_description,
    desired_features,
    need_design,
    budget_range,
    preferred_contact
) VALUES (
    'Développement Web',
    'Test',
    'User',
    'test@example.com',
    'Test Company',
    'E-commerce',
    false,
    ARRAY['Présenter votre activité', 'Vendre en ligne (e-commerce)'],
    'Site e-commerce pour vendre nos produits artisanaux',
    ARRAY['Site vitrine', 'Boutique e-commerce', 'Formulaire de contact'],
    true,
    '2000€ - 5000€',
    'Email'
);

-- Afficher le résultat
SELECT 'Schema créé avec succès ! 🎉' as status;