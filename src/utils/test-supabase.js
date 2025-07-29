// ================================================
// 🧪 TEST SUPABASE CONFIGURATION
// Script pour tester la connexion et configuration Supabase
// ================================================

import { validateSupabaseConfig, testSupabaseConnection } from './supabase.js';

/**
 * Fonction de test complète
 */
export async function runSupabaseTests() {
  console.log('🧪 === TEST SUPABASE CONFIGURATION ===');
  
  // Test 1: Validation de la configuration
  console.log('\n1️⃣ Validation de la configuration...');
  const configResult = validateSupabaseConfig();
  
  if (configResult.isValid) {
    console.log('✅ Configuration valide');
  } else {
    console.log('❌ Configuration invalide:');
    configResult.issues.forEach(issue => console.log(`   - ${issue}`));
    return false;
  }
  
  // Test 2: Test de connexion
  console.log('\n2️⃣ Test de connexion à Supabase...');
  const connectionResult = await testSupabaseConnection();
  
  if (connectionResult) {
    console.log('✅ Connexion réussie');
  } else {
    console.log('❌ Échec de connexion');
    console.log('🔧 Vérifiez:');
    console.log('   - Que les variables d\'environnement sont correctes');
    console.log('   - Que le schéma SQL a été exécuté');
    console.log('   - Que les politiques RLS sont configurées');
    return false;
  }
  
  // Test 3: Test des données fictives
  console.log('\n3️⃣ Test d\'insertion de données fictives...');
  try {
    const testData = {
      serviceType: 'Développement Web',
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      companyName: 'Test Company',
      businessSector: 'E-commerce',
      hasExistingWebsite: false,
      projectGoals: ['Présenter votre activité'],
      projectDescription: 'Site de test pour validation',
      desiredFeatures: ['Site vitrine'],
      needDesign: true,
      budgetRange: '2000€ - 5000€',
      preferredContact: 'Email'
    };
    
    // Import dynamique pour éviter les erreurs si pas configuré
    const { saveQuoteRequest } = await import('./supabase.js');
    const result = await saveQuoteRequest(testData);
    
    if (result.success) {
      console.log('✅ Test d\'insertion réussi');
      console.log(`   ID généré: ${result.data.id}`);
    } else {
      console.log('❌ Échec du test d\'insertion:', result.error);
      return false;
    }
  } catch (error) {
    console.log('❌ Erreur lors du test d\'insertion:', error.message);
    return false;
  }
  
  console.log('\n🎉 Tous les tests sont passés avec succès !');
  console.log('✨ Votre configuration Supabase est prête à utiliser.');
  
  return true;
}

/**
 * Fonction pour tester uniquement la configuration (sans insertion)
 */
export async function testConfigOnly() {
  console.log('🔧 Test de configuration rapide...');
  
  const configResult = validateSupabaseConfig();
  const connectionResult = await testSupabaseConnection();
  
  console.log('\n📊 Résultats:');
  console.log(`Configuration: ${configResult.isValid ? '✅' : '❌'}`);
  console.log(`Connexion: ${connectionResult ? '✅' : '❌'}`);
  
  if (!configResult.isValid) {
    console.log('\n🔧 Problèmes détectés:');
    configResult.issues.forEach(issue => console.log(`   - ${issue}`));
  }
  
  return configResult.isValid && connectionResult;
}

// Export par défaut pour utilisation facile
export default {
  runSupabaseTests,
  testConfigOnly
};