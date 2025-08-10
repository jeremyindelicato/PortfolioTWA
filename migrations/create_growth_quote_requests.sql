-- Création de la table pour les demandes de devis Growth
CREATE TABLE growth_quote_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- 🧑‍💼 1. Infos de base
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company_name TEXT,
  business_sector TEXT,
  has_existing_website TEXT CHECK (has_existing_website IN ('Oui', 'Non')),
  existing_website_url TEXT,
  
  -- 🎯 2. Objectif de la mission
  growth_main_goals TEXT[] DEFAULT '{}',
  growth_custom_goal TEXT,
  
  -- 🛠️ 3. Services souhaités
  growth_desired_services TEXT[] DEFAULT '{}',
  growth_custom_service TEXT,
  
  -- 🎯 4. Ciblage & données
  target_audience TEXT,
  has_existing_database TEXT CHECK (has_existing_database IN ('Oui', 'Non')),
  lead_sources TEXT[] DEFAULT '{}',
  
  -- 📊 5. KPI & ambitions
  growth_objectives TEXT,
  wants_detailed_reporting TEXT CHECK (wants_detailed_reporting IN ('Oui', 'Non')),
  has_tested_growth_tools TEXT CHECK (has_tested_growth_tools IN ('Oui', 'Non')),
  tested_tools_details TEXT,
  
  -- ⏰ 6. Délai & budget
  project_start_timeline TEXT,
  growth_budget_range TEXT,
  
  -- 🧠 7. Autres besoins
  additional_services TEXT[] DEFAULT '{}',
  growth_custom_additional TEXT,
  
  -- 📝 8. Remarques / Contexte
  growth_additional_notes TEXT,
  preferred_contact TEXT NOT NULL CHECK (preferred_contact IN ('Email', 'Téléphone', 'Visio')),
  
  -- Métadonnées
  status TEXT DEFAULT 'pending',
  email_status TEXT DEFAULT 'pending',
  email_sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour optimiser les requêtes
CREATE INDEX idx_growth_quote_requests_created_at ON growth_quote_requests(created_at DESC);
CREATE INDEX idx_growth_quote_requests_status ON growth_quote_requests(status);
CREATE INDEX idx_growth_quote_requests_email ON growth_quote_requests(email);

-- Trigger pour updated_at (réutilise la fonction existante)
CREATE TRIGGER update_growth_quote_requests_updated_at
    BEFORE UPDATE ON growth_quote_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Vue pour les statistiques Growth
CREATE VIEW growth_quote_stats AS
SELECT 
  COUNT(*) as total_requests,
  COUNT(*) FILTER (WHERE status = 'pending') as pending_requests,
  COUNT(*) FILTER (WHERE status = 'processed') as processed_requests,
  COUNT(*) FILTER (WHERE email_status = 'sent') as emails_sent,
  COUNT(DISTINCT growth_budget_range) as budget_ranges_count
FROM growth_quote_requests;

-- Commentaires pour documentation
COMMENT ON TABLE growth_quote_requests IS 'Demandes de devis pour les services de Growth Marketing';
COMMENT ON COLUMN growth_quote_requests.growth_main_goals IS 'Objectifs principaux de la mission Growth (choix multiples)';
COMMENT ON COLUMN growth_quote_requests.growth_desired_services IS 'Services Growth souhaités (scrapping, leads, automation, etc.)';
COMMENT ON COLUMN growth_quote_requests.target_audience IS 'Description de la cible idéale du client';
COMMENT ON COLUMN growth_quote_requests.growth_objectives IS 'KPI et ambitions chiffrées du client';