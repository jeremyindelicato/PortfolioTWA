// ================================================
// 🗄️ SUPABASE CLIENT - CONFIGURATION
// Utilitaires pour interagir avec Supabase
// ================================================

import { createClient } from '@supabase/supabase-js';

// Configuration Supabase (variables d'environnement)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

// Créer le client Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ================================================
// 📋 FONCTIONS POUR LES DEMANDES DE DEVIS
// ================================================

/**
 * Sauvegarder une nouvelle demande de devis
 * @param {Object} quoteData - Données du formulaire de devis
 * @returns {Promise<Object>} Résultat de l'insertion
 */
export async function saveQuoteRequest(quoteData) {
  try {
    console.log('💾 Sauvegarde de la demande de devis...', quoteData);

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
      console.error('❌ Erreur lors de la sauvegarde:', error);
      throw new Error(`Erreur de sauvegarde: ${error.message}`);
    }

    console.log('✅ Demande sauvegardée avec succès:', data.id);
    return { success: true, data };

  } catch (error) {
    console.error('❌ Erreur dans saveQuoteRequest:', error);
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
    console.log('📧 Envoi de l\'email de notification...');

    // Appeler l'Edge Function
    const { data, error } = await supabase.functions.invoke('send-quote-email', {
      body: quoteData
    });

    if (error) {
      console.error('❌ Erreur lors de l\'envoi de l\'email:', error);
      throw new Error(`Erreur d'envoi email: ${error.message}`);
    }

    console.log('✅ Email envoyé avec succès');
    return { success: true, data };

  } catch (error) {
    console.error('❌ Erreur dans sendQuoteEmail:', error);
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
    console.error('❌ Erreur updateEmailStatus:', error);
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
    console.log('🚀 Démarrage du processus complet de demande de devis...');

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
      console.warn('⚠️ Demande sauvegardée mais email non envoyé:', emailResult.error);
      // On ne lance pas d'erreur car la demande est sauvegardée
    }

    console.log('🎉 Processus terminé avec succès!');
    
    return {
      success: true,
      data: savedRequest,
      emailSent: emailResult.success,
      message: emailResult.success 
        ? 'Demande envoyée avec succès ! Vous recevrez une réponse sous 24h.'
        : 'Demande enregistrée ! L\'email de confirmation suivra sous peu.'
    };

  } catch (error) {
    console.error('❌ Erreur dans submitQuoteRequest:', error);
    return {
      success: false,
      error: error.message,
      message: 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer.'
    };
  }
}

// ================================================
// 📊 FONCTIONS UTILITAIRES
// ================================================

/**
 * Récupérer les statistiques des demandes de devis
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
// 🔧 CONFIGURATION ET VALIDATION
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
  submitQuoteRequest,
  saveQuoteRequest,
  sendQuoteEmail,
  updateEmailStatus,
  getQuoteStats,
  getRecentQuotes,
  testSupabaseConnection,
  validateSupabaseConfig
};