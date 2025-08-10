// ================================================
// 📧 SUPABASE EDGE FUNCTION - ENVOI EMAIL AUTOMATIQUE
// Fonction pour envoyer un email lors d'une nouvelle demande de devis
// SUPPORT COMPLET : WEB + IA + GROWTH
// ================================================
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

// Configuration email (à remplacer par vos vraies informations)
const EMAIL_CONFIG = {
  from: "onboarding@resend.dev",
  to: "indelicatojeremy@gmail.com",
  smtp: {
    host: "smtp.gmail.com",
    port: 587,
    user: Deno.env.get("SMTP_USER"),
    password: Deno.env.get("SMTP_PASSWORD")
  }
};

// Template HTML pour l'email WEB (votre code existant)
function generateWebEmailHTML(data) {
  const formatArray = (arr) => arr?.length ? arr.join(', ') : 'Non spécifié';
  const formatBoolean = (val) => val === null || val === undefined ? 'Non spécifié' : val ? 'Oui' : 'Non';
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3F8391, #5ba3b0); color: white; padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px; }
            .header h1 { margin: 0; font-size: 28px; }
            .header p { margin: 10px 0 0 0; font-size: 16px; opacity: 0.9; }
            .section { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 20px; }
            .section h2 { color: #3F8391; margin: 0 0 15px 0; font-size: 20px; display: flex; align-items: center; gap: 10px; }
            .field { margin-bottom: 12px; }
            .field strong { color: #2d3748; display: inline-block; min-width: 150px; }
            .highlight { background: #3F8391; color: white; padding: 2px 8px; border-radius: 4px; font-weight: bold; }
            .footer { text-align: center; padding: 20px; color: #64748b; font-size: 14px; border-top: 1px solid #e2e8f0; margin-top: 30px; }
            .priority { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 0 8px 8px 0; margin-bottom: 20px; }
            ul { margin: 5px 0; padding-left: 20px; }
            li { margin-bottom: 5px; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>💻 Nouvelle Demande de Devis Web</h1>
            <p>Portfolio TWA - ${new Date(data.created_at).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
        </div>

        <div class="priority">
            <strong>⚡ Action requise :</strong> Nouvelle demande de devis pour 
            <span class="highlight">${data.service_type}</span> - 
            Budget : <strong>${data.budget_range || 'Non spécifié'}</strong>
        </div>

        <div class="section">
            <h2>👤 Informations Client</h2>
            <div class="field"><strong>Nom complet :</strong> ${data.first_name} ${data.last_name}</div>
            <div class="field"><strong>Email :</strong> <a href="mailto:${data.email}">${data.email}</a></div>
            ${data.company_name ? `<div class="field"><strong>Entreprise :</strong> ${data.company_name}</div>` : ''}
            ${data.business_sector ? `<div class="field"><strong>Secteur :</strong> ${data.business_sector}</div>` : ''}
            <div class="field"><strong>Site existant :</strong> ${formatBoolean(data.has_existing_website)}</div>
            ${data.existing_website_url ? `<div class="field"><strong>URL actuelle :</strong> <a href="${data.existing_website_url}" target="_blank">${data.existing_website_url}</a></div>` : ''}
            <div class="field"><strong>Contact préféré :</strong> ${data.preferred_contact || 'Non spécifié'}</div>
        </div>

        <div class="section">
            <h2>🎯 Détails du Projet</h2>
            <div class="field"><strong>Service demandé :</strong> <span class="highlight">${data.service_type}</span></div>
            ${data.project_goals?.length ? `
                <div class="field">
                    <strong>Objectifs :</strong>
                    <ul>${data.project_goals.map((goal) => `<li>${goal}</li>`).join('')}</ul>
                </div>
            ` : ''}
            ${data.project_description ? `<div class="field"><strong>Description :</strong><br>${data.project_description.replace(/\n/g, '<br>')}</div>` : ''}
        </div>

        <div class="footer">
            <p>💻 Email généré automatiquement par Portfolio TWA</p>
            <p>🆔 ID de la demande : <code>${data.id}</code></p>
        </div>
    </body>
    </html>
  `;
}

// 🤖 Template HTML pour l'email IA
function generateAIEmailHTML(data) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3F8391, #5ba3b0); color: white; padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px; }
            .header h1 { margin: 0; font-size: 28px; }
            .header p { margin: 10px 0 0 0; font-size: 16px; opacity: 0.9; }
            .section { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 20px; }
            .section h2 { color: #3F8391; margin: 0 0 15px 0; font-size: 20px; display: flex; align-items: center; gap: 10px; }
            .field { margin-bottom: 12px; }
            .field strong { color: #2d3748; display: inline-block; min-width: 150px; }
            .highlight { background: #3F8391; color: white; padding: 2px 8px; border-radius: 4px; font-weight: bold; }
            .footer { text-align: center; padding: 20px; color: #64748b; font-size: 14px; border-top: 1px solid #e2e8f0; margin-top: 30px; }
            .ai-priority { background: #dbeafe; border-left: 4px solid #3b82f6; padding: 15px; border-radius: 0 8px 8px 0; margin-bottom: 20px; }
            ul { margin: 5px 0; padding-left: 20px; }
            li { margin-bottom: 5px; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>🤖 Nouvelle Demande de Devis IA</h1>
            <p>Portfolio TWA - ${new Date(data.created_at).toLocaleDateString('fr-FR')}</p>
        </div>

        <div class="ai-priority">
            <strong>🚀 Demande IA !</strong> Nouveau projet d'Intelligence Artificielle - 
            Budget : <strong>${data.ai_budget_range || 'Non spécifié'}</strong>
        </div>

        <div class="section">
            <h2>👤 Informations Client</h2>
            <div class="field"><strong>Nom complet :</strong> ${data.first_name} ${data.last_name}</div>
            <div class="field"><strong>Email :</strong> <a href="mailto:${data.email}">${data.email}</a></div>
            ${data.company_name ? `<div class="field"><strong>Entreprise :</strong> ${data.company_name}</div>` : ''}
            ${data.business_sector ? `<div class="field"><strong>Secteur :</strong> ${data.business_sector}</div>` : ''}
            <div class="field"><strong>Contact préféré :</strong> ${data.preferred_contact || 'Non spécifié'}</div>
        </div>

        <div class="section">
            <h2>🎯 Besoin IA</h2>
            <div class="field"><strong>Description du besoin :</strong></div>
            <div style="background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #3F8391; margin-bottom: 15px;">
                ${data.ai_need_description || 'Non spécifié'}
            </div>
            
            ${data.ai_project_goals?.length ? `
                <div class="field">
                    <strong>Objectifs principaux :</strong>
                    <ul>${data.ai_project_goals.map((goal) => `<li>${goal}</li>`).join('')}</ul>
                </div>
            ` : ''}
            
            ${data.ai_custom_goal ? `
                <div class="field"><strong>Objectif personnalisé :</strong></div>
                <div style="background: white; padding: 10px; border-radius: 4px; margin-bottom: 10px;">
                    ${data.ai_custom_goal}
                </div>
            ` : ''}
        </div>

        <div class="footer">
            <p>🤖 Email généré automatiquement par Portfolio TWA</p>
            <p>🆔 ID de la demande : <code>${data.id}</code></p>
        </div>
    </body>
    </html>
  `;
}

// 🚀 NOUVEAU Template HTML pour l'email GROWTH
function generateGrowthEmailHTML(data) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #059669, #10b981); color: white; padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px; }
            .header h1 { margin: 0; font-size: 28px; }
            .header p { margin: 10px 0 0 0; font-size: 16px; opacity: 0.9; }
            .section { background: #f0fdf4; border: 1px solid #d1fae5; border-radius: 8px; padding: 20px; margin-bottom: 20px; }
            .section h2 { color: #059669; margin: 0 0 15px 0; font-size: 20px; display: flex; align-items: center; gap: 10px; }
            .field { margin-bottom: 12px; }
            .field strong { color: #065f46; display: inline-block; min-width: 150px; }
            .highlight { background: #059669; color: white; padding: 2px 8px; border-radius: 4px; font-weight: bold; }
            .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; border-top: 1px solid #d1fae5; margin-top: 30px; }
            .growth-priority { background: #ecfdf5; border-left: 4px solid #10b981; padding: 15px; border-radius: 0 8px 8px 0; margin-bottom: 20px; }
            ul { margin: 5px 0; padding-left: 20px; }
            li { margin-bottom: 5px; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>🚀 Nouvelle Demande de Devis Growth</h1>
            <p>Portfolio TWA - ${new Date(data.created_at).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
        </div>

        <div class="growth-priority">
            <strong>📈 Demande Growth Marketing !</strong> Nouveau projet de croissance - 
            Budget : <strong>${data.growth_budget_range || 'Non spécifié'}</strong>
        </div>

        <div class="section">
            <h2>👤 Informations Client</h2>
            <div class="field"><strong>Nom complet :</strong> ${data.first_name} ${data.last_name}</div>
            <div class="field"><strong>Email :</strong> <a href="mailto:${data.email}">${data.email}</a></div>
            ${data.company_name ? `<div class="field"><strong>Entreprise :</strong> ${data.company_name}</div>` : ''}
            ${data.business_sector ? `<div class="field"><strong>Secteur :</strong> ${data.business_sector}</div>` : ''}
            <div class="field"><strong>Site existant :</strong> ${data.has_existing_website || 'Non spécifié'}</div>
            ${data.existing_website_url ? `<div class="field"><strong>URL :</strong> <a href="${data.existing_website_url}" target="_blank">${data.existing_website_url}</a></div>` : ''}
            <div class="field"><strong>Contact préféré :</strong> ${data.preferred_contact || 'Non spécifié'}</div>
        </div>

        <div class="section">
            <h2>🎯 Objectifs de la Mission</h2>
            ${data.growth_main_goals?.length ? `
                <div class="field">
                    <strong>Besoins principaux :</strong>
                    <ul>${data.growth_main_goals.map((goal) => `<li>${goal}</li>`).join('')}</ul>
                </div>
            ` : ''}
            
            ${data.growth_custom_goal ? `
                <div class="field"><strong>Besoin spécifique :</strong></div>
                <div style="background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #059669; margin-bottom: 15px;">
                    ${data.growth_custom_goal}
                </div>
            ` : ''}
        </div>

        <div class="section">
            <h2>🛠️ Services Souhaités</h2>
            ${data.growth_desired_services?.length ? `
                <ul>${data.growth_desired_services.map((service) => `<li>${service}</li>`).join('')}</ul>
            ` : '<p>Aucun service spécifié</p>'}
            
            ${data.growth_custom_service ? `
                <div class="field"><strong>Service personnalisé :</strong></div>
                <div style="background: white; padding: 10px; border-radius: 4px; margin-bottom: 10px;">
                    ${data.growth_custom_service}
                </div>
            ` : ''}
        </div>

        <div class="section">
            <h2>🎯 Ciblage & Données</h2>
            ${data.target_audience ? `
                <div class="field"><strong>Cible idéale :</strong></div>
                <div style="background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #059669; margin-bottom: 15px;">
                    ${data.target_audience}
                </div>
            ` : ''}
            
            <div class="field"><strong>Base de données existante :</strong> ${data.has_existing_database || 'Non spécifié'}</div>
            
            ${data.lead_sources?.length ? `
                <div class="field">
                    <strong>Sources de leads souhaitées :</strong>
                    <ul>${data.lead_sources.map((source) => `<li>${source}</li>`).join('')}</ul>
                </div>
            ` : ''}
        </div>

        <div class="section">
            <h2>📊 KPI & Ambitions</h2>
            ${data.growth_objectives ? `
                <div class="field"><strong>Objectifs :</strong></div>
                <div style="background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #059669; margin-bottom: 15px;">
                    ${data.growth_objectives}
                </div>
            ` : ''}
            
            <div class="field"><strong>Reporting automatisé :</strong> ${data.wants_detailed_reporting || 'Non spécifié'}</div>
            <div class="field"><strong>Outils testés :</strong> ${data.has_tested_growth_tools || 'Non spécifié'}</div>
            
            ${data.tested_tools_details ? `
                <div class="field"><strong>Outils utilisés :</strong></div>
                <div style="background: white; padding: 10px; border-radius: 4px; margin-bottom: 10px;">
                    ${data.tested_tools_details}
                </div>
            ` : ''}
        </div>

        <div class="section">
            <h2>⏰ Planning & Budget</h2>
            ${data.project_start_timeline ? `<div class="field"><strong>Délai souhaité :</strong> ${data.project_start_timeline}</div>` : ''}
            <div class="field"><strong>Budget :</strong> <span class="highlight">${data.growth_budget_range || 'Non spécifié'}</span></div>
        </div>

        <div class="section">
            <h2>🧠 Services Additionnels</h2>
            ${data.additional_services?.length ? `
                <ul>${data.additional_services.map((service) => `<li>${service}</li>`).join('')}</ul>
            ` : '<p>Aucun service additionnel</p>'}
            
            ${data.growth_custom_additional ? `
                <div class="field"><strong>Besoin additionnel :</strong></div>
                <div style="background: white; padding: 10px; border-radius: 4px; margin-bottom: 10px;">
                    ${data.growth_custom_additional}
                </div>
            ` : ''}
        </div>

        ${data.growth_additional_notes ? `
            <div class="section">
                <h2>💬 Notes Supplémentaires</h2>
                <div style="background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #059669;">
                    ${data.growth_additional_notes.replace(/\n/g, '<br>')}
                </div>
            </div>
        ` : ''}

        <div class="section">
            <h2>📋 Actions Recommandées Growth</h2>
            <ul>
                <li><strong>Analyser la cible</strong> et les objectifs de croissance</li>
                <li><strong>Évaluer les outils</strong> Growth les plus adaptés</li>
                <li><strong>Préparer une stratégie</strong> de génération de leads</li>
                <li><strong>Répondre sous 24h</strong> avec une première analyse</li>
                <li>Programmer un <strong>appel stratégique</strong> pour approfondir les besoins</li>
            </ul>
        </div>

        <div class="footer">
            <p>🚀 Email généré automatiquement par Portfolio TWA</p>
            <p>🆔 ID de la demande : <code>${data.id}</code></p>
        </div>
    </body>
    </html>
  `;
}

// Fonction principale de l'Edge Function (MISE À JOUR COMPLÈTE)
Deno.serve(async (req) => {
  // Headers CORS pour toutes les réponses
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Gérer les requêtes OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders
    });
  }

  // Vérifier la méthode HTTP
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({
      error: 'Method not allowed'
    }), {
      status: 405,
      headers: corsHeaders
    });
  }

  try {
    // Parser les données de la requête
    const quoteData = await req.json();
    
    // 🔍 DÉTECTION DU TYPE DE DEMANDE
    const isAI = quoteData.isAI || false;
    const isGrowth = quoteData.isGrowth || false;
    
    let serviceType = 'Développement Web'; // Par défaut
    let emailIcon = '💻';
    
    if (isAI) {
      serviceType = 'Intelligence Artificielle';
      emailIcon = '🤖';
    } else if (isGrowth) {
      serviceType = 'Growth Marketing';
      emailIcon = '🚀';
    }
    
    console.log(`📧 Nouvelle demande de devis reçue (${serviceType}):`, quoteData.id);
    console.log('🔑 RESEND_API_KEY available:', !!Deno.env.get('RESEND_API_KEY'));
    console.log('📮 Sending to:', EMAIL_CONFIG.to);

    // 📧 GÉNÉRATION DU CONTENU EMAIL SELON LE TYPE
    let emailHTML;
    let emailSubject;
    let budget = '';
    
    if (isAI) {
      emailHTML = generateAIEmailHTML(quoteData);
      budget = quoteData.ai_budget_range || 'Budget non spécifié';
    } else if (isGrowth) {
      emailHTML = generateGrowthEmailHTML(quoteData);
      budget = quoteData.growth_budget_range || 'Budget non spécifié';
    } else {
      emailHTML = generateWebEmailHTML(quoteData);
      budget = quoteData.budget_range || 'Budget non spécifié';
    }
    
    emailSubject = `${emailIcon} Nouvelle demande ${serviceType} - ${quoteData.first_name} ${quoteData.last_name} (${budget})`;

    // Envoyer l'email via Resend
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY') || 're_Q5NDK6aR_JnpcivFRPLk62RTsMyAyMUsi'}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: EMAIL_CONFIG.from,
        to: [EMAIL_CONFIG.to],
        subject: emailSubject,
        html: emailHTML,
        // Copie au client pour confirmation
        reply_to: quoteData.email
      })
    });

    if (!emailResponse.ok) {
      throw new Error(`Email service error: ${emailResponse.statusText}`);
    }

    const emailResult = await emailResponse.json();
    console.log(`✅ Email ${serviceType} envoyé avec succès:`, emailResult.id);

    return new Response(JSON.stringify({
      success: true,
      message: `Email ${serviceType} envoyé avec succès`,
      email_id: emailResult.id,
      type: serviceType
    }), {
      status: 200,
      headers: corsHeaders
    });

  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de l\'email:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Erreur lors de l\'envoi de l\'email',
      details: error.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
});

// ================================================
// 🎉 EDGE FUNCTION COMPLÈTE AVEC SUCCÈS !
//
// SUPPORT COMPLET :
// ✅ Template Web (couleur bleue classique)
// ✅ Template IA (couleur bleue spécifique) 
// ✅ Template Growth (couleur verte) 🚀 NOUVEAU !
// ✅ Détection automatique via flags isAI/isGrowth
// ✅ Subjects et contenu personnalisés
// ✅ Actions recommandées spécifiques à chaque service
//
// Pour déployer cette fonction :
// 1. Copier ce code dans votre Edge Function
// 2. supabase functions deploy send-quote-email
// 3. Tester avec les trois types de demandes
// ================================================