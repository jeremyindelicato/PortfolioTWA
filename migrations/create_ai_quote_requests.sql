-- Création de la table pour les demandes de devis IA
CREATE TABLE ai_quote_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- 🧑‍💼 1. Infos de base
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company_name TEXT,
  business_sector TEXT,
  ai_need_description TEXT NOT NULL,
  
  -- 🎯 2. Objectif du projet  
  ai_project_goals TEXT[] DEFAULT '{}',
  ai_custom_goal TEXT,
  
  -- 📊 3. Données disponibles
  has_data_available TEXT CHECK (has_data_available IN ('Oui', 'Non', 'En cours')),
  data_types TEXT[] DEFAULT '{}',
  data_volume TEXT,
  
  -- ⚙️ 4. Fonctionnalités souhaitées
  ai_desired_features TEXT[] DEFAULT '{}',
  
  -- ⏰ 5. Délai et budget
  project_start_timeline TEXT,
  ai_budget_range TEXT,
  
  -- 📝 6. Complément
  need_technical_support TEXT CHECK (need_technical_support IN ('Oui', 'Non', 'Les deux')),
  need_future_maintenance TEXT CHECK (need_future_maintenance IN ('Oui', 'Non', 'À discuter')),
  ai_additional_notes TEXT,
  
  -- 7. Préférence de contact
  preferred_contact TEXT NOT NULL CHECK (preferred_contact IN ('Email', 'Téléphone', 'Visio')),
  
  -- Métadonnées
  status TEXT DEFAULT 'pending',
  email_status TEXT DEFAULT 'pending',
  email_sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour optimiser les requêtes
CREATE INDEX idx_ai_quote_requests_created_at ON ai_quote_requests(created_at DESC);
CREATE INDEX idx_ai_quote_requests_status ON ai_quote_requests(status);
CREATE INDEX idx_ai_quote_requests_email ON ai_quote_requests(email);

-- Trigger pour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_ai_quote_requests_updated_at
    BEFORE UPDATE ON ai_quote_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Vue pour les statistiques IA
CREATE VIEW ai_quote_stats AS
SELECT 
  COUNT(*) as total_requests,
  COUNT(*) FILTER (WHERE status = 'pending') as pending_requests,
  COUNT(*) FILTER (WHERE status = 'processed') as processed_requests,
  COUNT(*) FILTER (WHERE email_status = 'sent') as emails_sent,
  COUNT(DISTINCT ai_budget_range) as budget_ranges_count
FROM ai_quote_requests;

-- Commentaires pour documentation
COMMENT ON TABLE ai_quote_requests IS 'Demandes de devis pour les services d''Intelligence Artificielle';
COMMENT ON COLUMN ai_quote_requests.ai_need_description IS 'Description brève du besoin en IA (en une phrase)';
COMMENT ON COLUMN ai_quote_requests.ai_project_goals IS 'Objectifs principaux du projet IA (choix multiples)';
COMMENT ON COLUMN ai_quote_requests.data_types IS 'Types de données disponibles (Textes, Images, Données tabulaires, etc.)';
COMMENT ON COLUMN ai_quote_requests.ai_desired_features IS 'Fonctionnalités souhaitées pour le projet IA';