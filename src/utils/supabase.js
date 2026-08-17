// ================================================
// SUPABASE CLIENT - CONFIGURATION
// Utilitaires pour interagir avec Supabase
// ================================================

import { createClient } from '@supabase/supabase-js';

// Configuration Supabase (variables d'environnement)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

// Créer le client Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ================================================
// FONCTIONS POUR LES DEMANDES DE DEVIS
// ================================================

/**
 * Sauvegarder une nouvelle demande de devis
 * @param {Object} quoteData - Données du formulaire de devis
 * @returns {Promise<Object>} Résultat de l'insertion
 */
export async function saveQuoteRequest(quoteData) {
  try {
    console.log('Sauvegarde de la demande de devis...', quoteData);

    // Préparer les données pour l'insertion
    const dbData = {
      // Étape 1: Service type
      service_type: quoteData.serviceType,
      
      // Étape 2: Informations générales
      first_name: quoteData.firstName,
      last_name: quoteData.lastName,
      email: quoteData.email,
      company_name: quoteData.companyName || null,
      business_sector: quoteData.businessSector || null,
      has_existing_website: quoteData.hasExistingWebsite,
      existing_website_url: quoteData.existingWebsiteUrl || null,
      
      // Étape 3: Objectifs du projet
      project_goals: quoteData.projectGoals || [],
      project_description: quoteData.projectDescription || null,
      
      // Étape 4: Fonctionnalités souhaitées
      desired_features: quoteData.desiredFeatures || [],
      need_design: quoteData.needDesign,
      
      // Étape 5: E-commerce (conditionnel)
      product_count: quoteData.productCount || null,
      payment_methods: quoteData.paymentMethods || [],
      delivery_needed: quoteData.deliveryNeeded,
      
      // Étape 6: Délais & budget
      ideal_launch_date: quoteData.idealLaunchDate || null,
      budget_range: quoteData.budgetRange || null,
      
      // Étape 7: Maintenance & suivi
      need_training: quoteData.needTraining,
      need_maintenance: quoteData.needMaintenance || null,
      
      // Étape 8: Autres besoins
      additional_notes: quoteData.additionalNotes || null,
      
      // Étape 9: Contact préféré
      preferred_contact: quoteData.preferredContact || null,
      
      // Métadonnées
      status: 'pending',
      email_status: 'pending'
    };

    // Insérer dans la base de données
    const { data, error } = await supabase
      .from('quote_requests')
      .insert([dbData])
      .select()
      .single();

    if (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      throw new Error(`Erreur de sauvegarde: ${error.message}`);
    }

    console.log('Demande sauvegardée avec succès:', data.id);
    return { success: true, data };

  } catch (error) {
    console.error('Erreur dans saveQuoteRequest:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Envoyer l'email de notification via Edge Function
 * @param {Object} quoteData - Données de la demande de devis
 * @returns {Promise<Object>} Résultat de l'envoi
 */
export async function sendQuoteEmail(quoteData) {
  try {
    console.log('Envoi de l\'email de notification...');

    // Appeler l'Edge Function
    const { data, error } = await supabase.functions.invoke('send-quote-email', {
      body: quoteData
    });

    if (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      throw new Error(`Erreur d'envoi email: ${error.message}`);
    }

    console.log('Email envoyé avec succès');
    return { success: true, data };

  } catch (error) {
    console.error('Erreur dans sendQuoteEmail:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Mettre à jour le statut email d'une demande
 * @param {string} requestId - ID de la demande
 * @param {string} status - Nouveau statut ('sent', 'failed', etc.)
 * @returns {Promise<Object>} Résultat de la mise à jour
 */
export async function updateEmailStatus(requestId, status) {
  try {
    const { data, error } = await supabase
      .from('quote_requests')
      .update({ 
        email_status: status,
        email_sent_at: status === 'sent' ? new Date().toISOString() : null
      })
      .eq('id', requestId);

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Erreur updateEmailStatus:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Processus complet: sauvegarder + envoyer email
 * @param {Object} formData - Données du formulaire
 * @returns {Promise<Object>} Résultat complet
 */
export async function submitQuoteRequest(formData) {
  try {
    console.log('Démarrage du processus complet de demande de devis...');

    // 1. Sauvegarder en base de données
    const saveResult = await saveQuoteRequest(formData);
    if (!saveResult.success) {
      throw new Error(saveResult.error);
    }

    const savedRequest = saveResult.data;

    // 2. Envoyer l'email de notification
    const emailResult = await sendQuoteEmail(savedRequest);
    
    // 3. Mettre à jour le statut email
    await updateEmailStatus(
      savedRequest.id, 
      emailResult.success ? 'sent' : 'failed'
    );

    if (!emailResult.success) {
      console.warn('Demande sauvegardée mais email non envoyé:', emailResult.error);
      // On ne lance pas d'erreur car la demande est sauvegardée
    }

    console.log('Processus terminé avec succès!');
    
    return {
      success: true,
      data: savedRequest,
      emailSent: emailResult.success,
      message: emailResult.success 
        ? 'Demande envoyée avec succès ! Vous recevrez une réponse sous 24h.'
        : 'Demande enregistrée ! L\'email de confirmation suivra sous peu.'
    };

  } catch (error) {
    console.error('Erreur dans submitQuoteRequest:', error);
    return {
      success: false,
      error: error.message,
      message: 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer.'
    };
  }
}

// ================================================
// FONCTIONS POUR LES DEMANDES DE DEVIS IA
// ================================================

/**
 * Sauvegarder une nouvelle demande de devis IA
 * @param {Object} aiQuoteData - Données du formulaire de devis IA
 * @returns {Promise<Object>} Résultat de l'insertion
 */
export async function saveAiQuoteRequest(aiQuoteData) {
  try {
    console.log('Sauvegarde de la demande de devis IA...', aiQuoteData);

    // Préparer les données pour l'insertion
    const dbData = {
      // 1. Infos de base
      first_name: aiQuoteData.firstName,
      last_name: aiQuoteData.lastName,
      email: aiQuoteData.email,
      company_name: aiQuoteData.companyName || null,
      business_sector: aiQuoteData.businessSector || null,
      ai_need_description: aiQuoteData.aiNeedDescription,
      
      // 2. Objectif du projet
      ai_project_goals: aiQuoteData.aiProjectGoals || [],
      ai_custom_goal: aiQuoteData.aiCustomGoal || null,
      
      // 3. Données disponibles
      has_data_available: aiQuoteData.hasDataAvailable,
      data_types: aiQuoteData.dataTypes || [],
      data_volume: aiQuoteData.dataVolume || null,
      
      // 4. Fonctionnalités souhaitées
      ai_desired_features: aiQuoteData.aiDesiredFeatures || [],
      
      // 5. Délai et budget
      project_start_timeline: aiQuoteData.projectStartTimeline || null,
      ai_budget_range: aiQuoteData.aiBudgetRange || null,
      
      // 6. Complément
      need_technical_support: aiQuoteData.needTechnicalSupport,
      need_future_maintenance: aiQuoteData.needFutureMaintenance,
      ai_additional_notes: aiQuoteData.aiAdditionalNotes || null,
      
      // 7. Préférence de contact
      preferred_contact: aiQuoteData.preferredContact,
      
      // Métadonnées
      status: 'pending',
      email_status: 'pending'
    };

    // Insérer dans la base de données
    const { data, error } = await supabase
      .from('ai_quote_requests')
      .insert([dbData])
      .select()
      .single();

    if (error) {
      console.error('Erreur lors de la sauvegarde IA:', error);
      throw new Error(`Erreur de sauvegarde IA: ${error.message}`);
    }

    console.log('Demande IA sauvegardée avec succès:', data.id);
    return { success: true, data };

  } catch (error) {
    console.error('Erreur dans saveAiQuoteRequest:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Envoyer l'email de notification IA via Edge Function
 * @param {Object} aiQuoteData - Données de la demande de devis IA
 * @returns {Promise<Object>} Résultat de l'envoi
 */
export async function sendAiQuoteEmail(aiQuoteData) {
  try {
    console.log('Envoi de l\'email de notification IA...');

    // Appeler l'Edge Function (réutilise la même fonction avec un flag IA)
    const { data, error } = await supabase.functions.invoke('send-quote-email', {
      body: { ...aiQuoteData, isAI: true }
    });

    if (error) {
      console.error('Erreur lors de l\'envoi de l\'email IA:', error);
      throw new Error(`Erreur d'envoi email IA: ${error.message}`);
    }

    console.log('Email IA envoyé avec succès');
    return { success: true, data };

  } catch (error) {
    console.error('Erreur dans sendAiQuoteEmail:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Mettre à jour le statut email d'une demande IA
 * @param {string} requestId - ID de la demande
 * @param {string} status - Nouveau statut ('sent', 'failed', etc.)
 * @returns {Promise<Object>} Résultat de la mise à jour
 */
export async function updateAiEmailStatus(requestId, status) {
  try {
    const { data, error } = await supabase
      .from('ai_quote_requests')
      .update({ 
        email_status: status,
        email_sent_at: status === 'sent' ? new Date().toISOString() : null
      })
      .eq('id', requestId);

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Erreur updateAiEmailStatus:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Processus complet IA: sauvegarder + envoyer email
 * @param {Object} formData - Données du formulaire IA
 * @returns {Promise<Object>} Résultat complet
 */
export async function submitAiQuoteRequest(formData) {
  try {
    console.log('Démarrage du processus complet de demande de devis IA...');

    // 1. Sauvegarder en base de données
    const saveResult = await saveAiQuoteRequest(formData);
    if (!saveResult.success) {
      throw new Error(saveResult.error);
    }

    const savedRequest = saveResult.data;

    // 2. Envoyer l'email de notification
    const emailResult = await sendAiQuoteEmail(savedRequest);
    
    // 3. Mettre à jour le statut email
    await updateAiEmailStatus(
      savedRequest.id, 
      emailResult.success ? 'sent' : 'failed'
    );

    if (!emailResult.success) {
      console.warn('Demande IA sauvegardée mais email non envoyé:', emailResult.error);
      // On ne lance pas d'erreur car la demande est sauvegardée
    }

    console.log('Processus IA terminé avec succès!');
    
    return {
      success: true,
      data: savedRequest,
      emailSent: emailResult.success,
      message: emailResult.success 
        ? 'Demande IA envoyée avec succès ! Vous recevrez une réponse sous 24h.'
        : 'Demande IA enregistrée ! L\'email de confirmation suivra sous peu.'
    };

  } catch (error) {
    console.error('Erreur dans submitAiQuoteRequest:', error);
    return {
      success: false,
      error: error.message,
      message: 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer.'
    };
  }
}

// ================================================
// FONCTIONS POUR LES DEMANDES DE DEVIS GROWTH
// ================================================

/**
 * Sauvegarder une nouvelle demande de devis Growth
 * @param {Object} growthQuoteData - Données du formulaire de devis Growth
 * @returns {Promise<Object>} Résultat de l'insertion
 */
export async function saveGrowthQuoteRequest(growthQuoteData) {
  try {
    console.log('Sauvegarde de la demande de devis Growth...', growthQuoteData);

    // Préparer les données pour l'insertion
    const dbData = {
      // 1. Infos de base
      first_name: growthQuoteData.firstName,
      last_name: growthQuoteData.lastName,
      email: growthQuoteData.email,
      company_name: growthQuoteData.companyName || null,
      business_sector: growthQuoteData.businessSector || null,
      has_existing_website: growthQuoteData.hasExistingWebsite,
      existing_website_url: growthQuoteData.existingWebsiteUrl || null,

      // 2. Objectif de la mission
      growth_main_goals: growthQuoteData.growthMainGoals || [],
      growth_custom_goal: growthQuoteData.growthCustomGoal || null,

      // 3. Services souhaités
      growth_desired_services: growthQuoteData.growthDesiredServices || [],
      growth_custom_service: growthQuoteData.growthCustomService || null,

      // 4. Ciblage & données
      target_audience: growthQuoteData.targetAudience || null,
      has_existing_database: growthQuoteData.hasExistingDatabase,
      lead_sources: growthQuoteData.leadSources || [],

      // 5. KPI & ambitions
      growth_objectives: growthQuoteData.growthObjectives || null,
      wants_detailed_reporting: growthQuoteData.wantsDetailedReporting,
      has_tested_growth_tools: growthQuoteData.hasTestedGrowthTools,
      tested_tools_details: growthQuoteData.testedToolsDetails || null,

      // 6. Délai & budget
      project_start_timeline: growthQuoteData.projectStartTimeline || null,
      growth_budget_range: growthQuoteData.growthBudgetRange || null,

      // 7. Autres besoins
      additional_services: growthQuoteData.additionalServices || [],
      growth_custom_additional: growthQuoteData.growthCustomAdditional || null,

      // 8. Remarques / Contexte
      growth_additional_notes: growthQuoteData.growthAdditionalNotes || null,
      preferred_contact: growthQuoteData.preferredContact,
      
      // Métadonnées
      status: 'pending',
      email_status: 'pending'
    };

    // Insérer dans la base de données
    const { data, error } = await supabase
      .from('growth_quote_requests')
      .insert([dbData])
      .select()
      .single();

    if (error) {
      console.error('Erreur lors de la sauvegarde Growth:', error);
      throw new Error(`Erreur de sauvegarde Growth: ${error.message}`);
    }

    console.log('Demande Growth sauvegardée avec succès:', data.id);
    return { success: true, data };

  } catch (error) {
    console.error('Erreur dans saveGrowthQuoteRequest:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Envoyer l'email de notification Growth via Edge Function
 * @param {Object} growthQuoteData - Données de la demande de devis Growth
 * @returns {Promise<Object>} Résultat de l'envoi
 */
export async function sendGrowthQuoteEmail(growthQuoteData) {
  try {
    console.log('Envoi de l\'email de notification Growth...');

    // Appeler l'Edge Function (réutilise la même fonction avec un flag Growth)
    const { data, error } = await supabase.functions.invoke('send-quote-email', {
      body: { ...growthQuoteData, isGrowth: true }
    });

    if (error) {
      console.error('Erreur lors de l\'envoi de l\'email Growth:', error);
      throw new Error(`Erreur d'envoi email Growth: ${error.message}`);
    }

    console.log('Email Growth envoyé avec succès');
    return { success: true, data };

  } catch (error) {
    console.error('Erreur dans sendGrowthQuoteEmail:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Mettre à jour le statut email d'une demande Growth
 * @param {string} requestId - ID de la demande
 * @param {string} status - Nouveau statut ('sent', 'failed', etc.)
 * @returns {Promise<Object>} Résultat de la mise à jour
 */
export async function updateGrowthEmailStatus(requestId, status) {
  try {
    const { data, error } = await supabase
      .from('growth_quote_requests')
      .update({ 
        email_status: status,
        email_sent_at: status === 'sent' ? new Date().toISOString() : null
      })
      .eq('id', requestId);

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Erreur updateGrowthEmailStatus:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Processus complet Growth: sauvegarder + envoyer email
 * @param {Object} formData - Données du formulaire Growth
 * @returns {Promise<Object>} Résultat complet
 */
export async function submitGrowthQuoteRequest(formData) {
  try {
    console.log('Démarrage du processus complet de demande de devis Growth...');

    // 1. Sauvegarder en base de données
    const saveResult = await saveGrowthQuoteRequest(formData);
    if (!saveResult.success) {
      throw new Error(saveResult.error);
    }

    const savedRequest = saveResult.data;

    // 2. Envoyer l'email de notification
    const emailResult = await sendGrowthQuoteEmail(savedRequest);
    
    // 3. Mettre à jour le statut email
    await updateGrowthEmailStatus(
      savedRequest.id, 
      emailResult.success ? 'sent' : 'failed'
    );

    if (!emailResult.success) {
      console.warn('Demande Growth sauvegardée mais email non envoyé:', emailResult.error);
      // On ne lance pas d'erreur car la demande est sauvegardée
    }

    console.log('Processus Growth terminé avec succès!');
    
    return {
      success: true,
      data: savedRequest,
      emailSent: emailResult.success,
      message: emailResult.success 
        ? 'Demande Growth envoyée avec succès ! Vous recevrez une réponse sous 24h.'
        : 'Demande Growth enregistrée ! L\'email de confirmation suivra sous peu.'
    };

  } catch (error) {
    console.error('Erreur dans submitGrowthQuoteRequest:', error);
    return {
      success: false,
      error: error.message,
      message: 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer.'
    };
  }
}

// ================================================
// FONCTIONS POUR LE FORMULAIRE DE CONTACT
// ================================================

/**
 * Envoyer l'email de contact via Edge Function
 * @param {Object} contactData - Données du formulaire de contact
 * @returns {Promise<Object>} Résultat de l'envoi
 */
export async function sendContactEmail(contactData) {
  try {
    console.log('Envoi de l\'email de contact...');

    // Appeler l'Edge Function avec un flag contact
    const { data, error } = await supabase.functions.invoke('send-quote-email', {
      body: { ...contactData, isContact: true }
    });

    if (error) {
      console.error('Erreur lors de l\'envoi de l\'email de contact:', error);
      throw new Error(`Erreur d'envoi email contact: ${error.message}`);
    }

    console.log('Email de contact envoyé avec succès');
    return { success: true, data };

  } catch (error) {
    console.error('Erreur dans sendContactEmail:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Processus complet contact: envoyer email
 * @param {Object} formData - Données du formulaire de contact
 * @returns {Promise<Object>} Résultat complet
 */
export async function submitContactForm(formData) {
  try {
    console.log('Envoi du formulaire de contact...');

    // Envoyer l'email de contact
    const emailResult = await sendContactEmail(formData);
    
    if (!emailResult.success) {
      throw new Error(emailResult.error);
    }

    console.log('Formulaire de contact envoyé avec succès!');
    
    return {
      success: true,
      emailSent: true,
      message: 'Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.'
    };

  } catch (error) {
    console.error('Erreur dans submitContactForm:', error);
    return {
      success: false,
      error: error.message,
      message: 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer.'
    };
  }
}

// ================================================
// FONCTIONS UTILITAIRES
// ================================================

/**
 * Récupérer les statistiques des demandes de devis (Web + IA)
 * @returns {Promise<Object>} Statistiques
 */
export async function getQuoteStats() {
  try {
    const { data, error } = await supabase
      .from('quote_stats_by_service')
      .select('*');

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Récupérer les statistiques spécifiques IA
 * @returns {Promise<Object>} Statistiques IA
 */
export async function getAiQuoteStats() {
  try {
    const { data, error } = await supabase
      .from('ai_quote_stats')
      .select('*');

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Récupérer les statistiques spécifiques Growth
 * @returns {Promise<Object>} Statistiques Growth
 */
export async function getGrowthQuoteStats() {
  try {
    const { data, error } = await supabase
      .from('growth_quote_stats')
      .select('*');

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Récupérer les demandes récentes (pour admin)
 * @returns {Promise<Object>} Demandes récentes
 */
export async function getRecentQuotes() {
  try {
    const { data, error } = await supabase
      .from('recent_quote_requests')
      .select('*')
      .limit(20);

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ================================================
// CONFIGURATION ET VALIDATION
// ================================================

/**
 * Vérifier la connexion Supabase
 * @returns {Promise<boolean>} État de la connexion
 */
export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase
      .from('quote_requests')
      .select('count')
      .limit(1);

    return !error;
  } catch (error) {
    console.error('❌ Erreur de connexion Supabase:', error);
    return false;
  }
}

/**
 * Valider la configuration
 * @returns {Object} État de la configuration
 */
export function validateSupabaseConfig() {
  const issues = [];
  
  if (!supabaseUrl || supabaseUrl === 'YOUR_SUPABASE_URL') {
    issues.push('VITE_SUPABASE_URL non configurée');
  }
  
  if (!supabaseAnonKey || supabaseAnonKey === 'YOUR_SUPABASE_ANON_KEY') {
    issues.push('VITE_SUPABASE_ANON_KEY non configurée');
  }

  return {
    isValid: issues.length === 0,
    issues
  };
}

// Export par défaut
export default {
  supabase,
  // Fonctions Web
  submitQuoteRequest,
  saveQuoteRequest,
  sendQuoteEmail,
  updateEmailStatus,
  // Fonctions IA
  submitAiQuoteRequest,
  saveAiQuoteRequest,
  sendAiQuoteEmail,
  updateAiEmailStatus,
  // Fonctions Growth
  submitGrowthQuoteRequest,
  saveGrowthQuoteRequest,
  sendGrowthQuoteEmail,
  updateGrowthEmailStatus,
  // Fonctions Contact
  submitContactForm,
  sendContactEmail,
  // Fonctions utilitaires
  getQuoteStats,
  getAiQuoteStats,
  getGrowthQuoteStats,
  getRecentQuotes,
  testSupabaseConnection,
  validateSupabaseConfig
};