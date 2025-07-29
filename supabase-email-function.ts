// ================================================
// 📧 SUPABASE EDGE FUNCTION - ENVOI EMAIL AUTOMATIQUE
// Fonction pour envoyer un email lors d'une nouvelle demande de devis
// ================================================

import "jsr:@supabase/functions-js/edge-runtime.d.ts";

interface QuoteRequest {
  id: string;
  service_type: string;
  first_name: string;
  last_name: string;
  email: string;
  company_name?: string;
  business_sector?: string;
  has_existing_website?: boolean;
  existing_website_url?: string;
  project_goals?: string[];
  project_description?: string;
  desired_features?: string[];
  need_design?: boolean;
  product_count?: string;
  payment_methods?: string[];
  delivery_needed?: boolean;
  ideal_launch_date?: string;
  budget_range?: string;
  need_training?: boolean;
  need_maintenance?: string;
  additional_notes?: string;
  preferred_contact?: string;
  created_at: string;
}

// Configuration email (à remplacer par vos vraies informations)
const EMAIL_CONFIG = {
  from: "onboarding@resend.dev", // Email vérifié par défaut chez Resend
  to: "indelicatojeremy@gmail.com", // METTEZ VOTRE VRAIE ADRESSE EMAIL ICI
  smtp: {
    host: "smtp.gmail.com", // Ou votre provider SMTP
    port: 587,
    user: Deno.env.get("SMTP_USER"), // Variable d'environnement
    password: Deno.env.get("SMTP_PASSWORD"), // Variable d'environnement
  }
};

// Template HTML pour l'email
function generateEmailHTML(data: QuoteRequest): string {
  const formatArray = (arr?: string[]) => arr?.length ? arr.join(', ') : 'Non spécifié';
  const formatBoolean = (val?: boolean) => val === null || val === undefined ? 'Non spécifié' : (val ? 'Oui' : 'Non');
  
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
            <h1>🚀 Nouvelle Demande de Devis</h1>
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
                    <ul>${data.project_goals.map(goal => `<li>${goal}</li>`).join('')}</ul>
                </div>
            ` : ''}
            ${data.project_description ? `<div class="field"><strong>Description :</strong><br>${data.project_description.replace(/\n/g, '<br>')}</div>` : ''}
        </div>

        ${data.service_type === 'Développement Web' ? `
            <div class="section">
                <h2>⚙️ Spécifications Techniques</h2>
                ${data.desired_features?.length ? `
                    <div class="field">
                        <strong>Fonctionnalités :</strong>
                        <ul>${data.desired_features.map(feature => `<li>${feature}</li>`).join('')}</ul>
                    </div>
                ` : ''}
                <div class="field"><strong>Besoin de design :</strong> ${formatBoolean(data.need_design)}</div>
                
                ${data.desired_features?.includes('Boutique e-commerce') ? `
                    <h3 style="color: #3F8391; margin: 20px 0 10px 0;">🛒 E-commerce</h3>
                    ${data.product_count ? `<div class="field"><strong>Nombre de produits :</strong> ${data.product_count}</div>` : ''}
                    ${data.payment_methods?.length ? `
                        <div class="field">
                            <strong>Moyens de paiement :</strong>
                            <ul>${data.payment_methods.map(method => `<li>${method}</li>`).join('')}</ul>
                        </div>
                    ` : ''}
                    <div class="field"><strong>Livraison :</strong> ${formatBoolean(data.delivery_needed)}</div>
                ` : ''}
            </div>
        ` : ''}

        <div class="section">
            <h2>⏰ Planning & Budget</h2>
            ${data.ideal_launch_date ? `<div class="field"><strong>Date souhaitée :</strong> ${new Date(data.ideal_launch_date).toLocaleDateString('fr-FR')}</div>` : ''}
            <div class="field"><strong>Budget :</strong> <span class="highlight">${data.budget_range || 'Non spécifié'}</span></div>
        </div>

        ${data.service_type === 'Développement Web' ? `
            <div class="section">
                <h2>🔧 Maintenance & Suivi</h2>
                <div class="field"><strong>Formation souhaitée :</strong> ${formatBoolean(data.need_training)}</div>
                <div class="field"><strong>Maintenance :</strong> ${data.need_maintenance || 'Non spécifié'}</div>
            </div>
        ` : ''}

        ${data.additional_notes ? `
            <div class="section">
                <h2>💬 Notes Additionnelles</h2>
                <div style="background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #3F8391;">
                    ${data.additional_notes.replace(/\n/g, '<br>')}
                </div>
            </div>
        ` : ''}

        <div class="section">
            <h2>📋 Actions Recommandées</h2>
            <ul>
                <li><strong>Répondre sous 24h</strong> pour maintenir un bon taux de conversion</li>
                <li>Préparer un devis détaillé basé sur les spécifications</li>
                <li>Programmer un appel/visio selon la préférence client</li>
                <li>Ajouter le prospect dans votre CRM</li>
            </ul>
        </div>

        <div class="footer">
            <p>📧 Email généré automatiquement par Portfolio TWA</p>
            <p>🆔 ID de la demande : <code>${data.id}</code></p>
        </div>
    </body>
    </html>
  `;
}

// Fonction principale de l'Edge Function
Deno.serve(async (req: Request) => {
  // Headers CORS pour toutes les réponses
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
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
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }), 
      { 
        status: 405, 
        headers: corsHeaders
      }
    );
  }

  try {
    // Parser les données de la requête
    const quoteData: QuoteRequest = await req.json();
    
    console.log('📧 Nouvelle demande de devis reçue:', quoteData.id);
    console.log('🔑 RESEND_API_KEY available:', !!Deno.env.get('RESEND_API_KEY'));
    console.log('📮 Sending to:', EMAIL_CONFIG.to);

    // Générer le contenu de l'email
    const emailHTML = generateEmailHTML(quoteData);
    const emailSubject = `🚀 Nouvelle demande ${quoteData.service_type} - ${quoteData.first_name} ${quoteData.last_name} (${quoteData.budget_range || 'Budget non spécifié'})`;

    // Envoyer l'email via Resend
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY') || 'VOTRE_CLE_RESEND_ICI'}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: EMAIL_CONFIG.from,
        to: [EMAIL_CONFIG.to],
        subject: emailSubject,
        html: emailHTML,
        // Copie au client pour confirmation
        reply_to: quoteData.email,
      }),
    });

    if (!emailResponse.ok) {
      throw new Error(`Email service error: ${emailResponse.statusText}`);
    }

    const emailResult = await emailResponse.json();
    
    console.log('✅ Email envoyé avec succès:', emailResult.id);

    // Optionnel : Logger l'envoi dans la base de données
    // await supabase.from('email_logs').insert({
    //   quote_request_id: quoteData.id,
    //   email_type: 'quote_request',
    //   recipient_email: EMAIL_CONFIG.to,
    //   subject: emailSubject,
    //   status: 'sent'
    // });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Email envoyé avec succès',
        email_id: emailResult.id 
      }),
      { 
        status: 200,
        headers: corsHeaders
      }
    );

  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de l\'email:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Erreur lors de l\'envoi de l\'email',
        details: error.message 
      }),
      { 
        status: 500,
        headers: corsHeaders
      }
    );
  }
});

// ================================================
// 🎉 EDGE FUNCTION CRÉÉE AVEC SUCCÈS !
//
// Pour déployer cette fonction :
// 1. supabase functions new send-quote-email
// 2. Copier ce code dans le fichier généré
// 3. supabase functions deploy send-quote-email
// 4. Configurer les variables d'environnement :
//    - RESEND_API_KEY (ou votre service email)
//    - SMTP_USER et SMTP_PASSWORD si SMTP direct
// ================================================