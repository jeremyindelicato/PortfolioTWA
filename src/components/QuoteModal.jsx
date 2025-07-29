import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, FileText, ChevronLeft, ChevronRight, User, Target, Settings, ShoppingCart, Clock, Wrench, MessageSquare, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { submitQuoteRequest } from '../utils/supabase';

const QuoteModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(3); // Will be updated based on service type
  const [formData, setFormData] = useState({
    // Étape 1: Service type
    serviceType: '',
    
    // Informations générales (étape 2 pour dev web)
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    businessSector: '',
    hasExistingWebsite: null,
    existingWebsiteUrl: '',
    
    // Objectif du projet (étape 3)
    projectGoals: [],
    projectDescription: '',
    
    // Fonctionnalités souhaitées (étape 4)
    desiredFeatures: [],
    needDesign: null,
    
    // E-commerce spécifique (étape 5 - conditionnelle)
    productCount: '',
    paymentMethods: [],
    deliveryNeeded: null,
    
    // Délais & budget (étape 6)
    idealLaunchDate: '',
    budgetRange: '',
    
    // Maintenance & suivi (étape 7)
    needTraining: null,
    needMaintenance: '',
    
    // Autres besoins (étape 8)
    additionalNotes: '',
    
    // Contact préféré (étape 9)
    preferredContact: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field, value) => {
    setFormData(prev => {
      const currentArray = prev[field] || [];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      return {
        ...prev,
        [field]: newArray
      };
    });
  };

  const getStepIcon = (stepNumber) => {
    const icons = {
      1: Settings,
      2: User,
      3: Target,
      4: Settings,
      5: ShoppingCart,
      6: Clock,
      7: Wrench,
      8: MessageSquare,
      9: Phone
    };
    return icons[stepNumber] || Settings;
  };

  const getStepTitle = (stepNumber) => {
    if (formData.serviceType === 'Développement Web') {
      const titles = {
        1: 'Service',
        2: 'Informations générales',
        3: 'Objectif du projet',
        4: 'Fonctionnalités souhaitées',
        5: 'E-commerce',
        6: 'Délais & budget',
        7: 'Maintenance & suivi',
        8: 'Autres besoins',
        9: 'Contact préféré'
      };
      return titles[stepNumber] || 'Étape';
    }
    return `Étape ${stepNumber}`;
  };

  // Update total steps based on service type and form data
  const updateTotalSteps = () => {
    if (formData.serviceType === 'Développement Web') {
      // Check if e-commerce is selected to determine if we need step 5
      const hasEcommerce = formData.desiredFeatures.includes('Boutique e-commerce');
      return hasEcommerce ? 9 : 8; // Skip e-commerce step if not selected
    }
    return 3; // Default for other services (IA, Growth)
  };

  const getActualTotalSteps = () => {
    return updateTotalSteps();
  };

  const nextStep = () => {
    const actualTotalSteps = getActualTotalSteps();
    if (step < actualTotalSteps) {
      // Skip e-commerce step if not needed
      if (step === 4 && formData.serviceType === 'Développement Web' && !formData.desiredFeatures.includes('Boutique e-commerce')) {
        setStep(step + 2); // Skip step 5 (e-commerce)
      } else {
        setStep(step + 1);
      }
    }
  };

  const prevStep = () => {
    if (step > 1) {
      // Handle going back from e-commerce skip
      if (step === 6 && formData.serviceType === 'Développement Web' && !formData.desiredFeatures.includes('Boutique e-commerce')) {
        setStep(step - 2); // Go back to step 4
      } else {
        setStep(step - 1);
      }
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      console.log('🚀 Envoi de la demande de devis:', formData);
      
      // Envoyer via Supabase (sauvegarde + email)
      const result = await submitQuoteRequest(formData);
      
      if (result.success) {
        setSubmitStatus('success');
        setSubmitMessage(result.message);
        
        // Attendre un peu pour que l'utilisateur voie le message
        setTimeout(() => {
          onClose();
          resetForm();
        }, 3000);
      } else {
        throw new Error(result.message || 'Erreur lors de l\'envoi');
      }
      
    } catch (error) {
      console.error('❌ Erreur lors de l\'envoi:', error);
      setSubmitStatus('error');
      setSubmitMessage(error.message || 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setSubmitStatus(null);
    setSubmitMessage('');
    setFormData({
      serviceType: '',
      firstName: '',
      lastName: '',
      email: '',
      companyName: '',
      businessSector: '',
      hasExistingWebsite: null,
      existingWebsiteUrl: '',
      projectGoals: [],
      projectDescription: '',
      desiredFeatures: [],
      needDesign: null,
      productCount: '',
      paymentMethods: [],
      deliveryNeeded: null,
      idealLaunchDate: '',
      budgetRange: '',
      needTraining: null,
      needMaintenance: '',
      additionalNotes: '',
      preferredContact: ''
    });
  };

  // Fermer le modal et reset si on clique à l'extérieur
  const handleBackdropClick = () => {
    if (!isSubmitting) {
      onClose();
      setTimeout(resetForm, 300); // Reset après animation
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        />

        {/* Modal */}
        <motion.div
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/20"
          style={{
            background: `
              linear-gradient(135deg, 
                rgba(255, 255, 255, 0.15) 0%, 
                rgba(255, 255, 255, 0.05) 50%, 
                rgba(0, 0, 0, 0.2) 100%
              )
            `,
            backdropFilter: 'blur(25px)',
            boxShadow: `
              0 25px 60px rgba(0, 0, 0, 0.5),
              inset 0 1px 0 rgba(255, 255, 255, 0.3)
            `
          }}
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(63, 131, 145, 0.8), rgba(63, 131, 145, 0.4))'
                }}
              >
                <FileText size={20} color="#FFFFFF" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Demande de Devis
                </h2>
                <p className="text-gray-400 text-sm">
                  {getStepTitle(step)} - Étape {step} sur {getActualTotalSteps()}
                </p>
              </div>
            </div>
            <motion.button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={20} color="#FFFFFF" />
            </motion.button>
          </div>

          {/* Progress Bar */}
          <div className="px-6 py-4">
            <div className="flex gap-1">
              {Array.from({ length: getActualTotalSteps() }, (_, i) => i + 1).map((i) => (
                <div
                  key={i}
                  className="flex-1 h-2 rounded-full overflow-hidden"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ 
                      background: 'linear-gradient(90deg, #3F8391, #5ba3b0)' 
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: step >= i ? '100%' : '0%' }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-2 text-center">
              <span className="text-xs text-gray-400">
                {Math.round((step / getActualTotalSteps()) * 100)}% complété
              </span>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6">
            <AnimatePresence mode="wait">
              {/* Étape 1: Type de service */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      <Settings size={24} className="text-[#3F8391]" />
                      Quel service vous intéresse ?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {['Développement Web', 'Intelligence Artificielle', 'Growth Marketing'].map((service) => (
                        <motion.button
                          key={service}
                          type="button"
                          onClick={() => {
                            handleInputChange('serviceType', service);
                            // Reset steps when service type changes
                            if (service !== 'Développement Web') {
                              setTotalSteps(3);
                            }
                          }}
                          className={`p-4 rounded-2xl border text-center transition-all duration-300 ${
                            formData.serviceType === service
                              ? 'border-[#3F8391] bg-[#3F8391]/20 text-white'
                              : 'border-white/20 bg-white/5 text-gray-300 hover:border-white/40'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="font-medium">{service}</div>
                          {service === 'Développement Web' && (
                            <div className="text-xs mt-1 text-gray-400">Questionnaire détaillé</div>
                          )}
                        </motion.button>
                      ))}
                    </div>
                    {formData.serviceType && formData.serviceType !== 'Développement Web' && (
                      <div className="mt-4 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                        <p className="text-yellow-200 text-sm">
                          🚧 Le questionnaire détaillé pour "{formData.serviceType}" sera bientôt disponible. 
                          Pour l'instant, veuillez utiliser le formulaire basique.
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Étape 2: Informations générales (pour développement web) */}
              {step === 2 && formData.serviceType === 'Développement Web' && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <User size={24} className="text-[#3F8391]" />
                      Informations générales
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-white font-medium mb-2">
                            Prénom *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-[#3F8391] focus:outline-none"
                            placeholder="Votre prénom"
                          />
                        </div>
                        <div>
                          <label className="block text-white font-medium mb-2">
                            Nom *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-[#3F8391] focus:outline-none"
                            placeholder="Votre nom"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-white font-medium mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-[#3F8391] focus:outline-none"
                          placeholder="votre@email.com"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-white font-medium mb-2">
                          Nom de l'entreprise (si applicable)
                        </label>
                        <input
                          type="text"
                          value={formData.companyName}
                          onChange={(e) => handleInputChange('companyName', e.target.value)}
                          className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-[#3F8391] focus:outline-none"
                          placeholder="Nom de votre entreprise ou organisation"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-white font-medium mb-2">
                          Secteur d'activité
                        </label>
                        <input
                          type="text"
                          value={formData.businessSector}
                          onChange={(e) => handleInputChange('businessSector', e.target.value)}
                          className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-[#3F8391] focus:outline-none"
                          placeholder="Ex: E-commerce, Santé, Éducation..."
                        />
                      </div>
                      
                      <div>
                        <label className="block text-white font-medium mb-3">
                          Avez-vous déjà un site web ?
                        </label>
                        <div className="flex gap-4">
                          {[true, false].map((value) => (
                            <motion.button
                              key={value}
                              type="button"
                              onClick={() => handleInputChange('hasExistingWebsite', value)}
                              className={`px-6 py-3 rounded-xl border transition-all duration-300 ${
                                formData.hasExistingWebsite === value
                                  ? 'border-[#3F8391] bg-[#3F8391]/20 text-white'
                                  : 'border-white/20 bg-white/5 text-gray-300 hover:border-white/40'
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {value ? 'Oui' : 'Non'}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                      
                      {formData.hasExistingWebsite === true && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <label className="block text-white font-medium mb-2">
                            Quel est le lien de votre site actuel ?
                          </label>
                          <input
                            type="url"
                            value={formData.existingWebsiteUrl}
                            onChange={(e) => handleInputChange('existingWebsiteUrl', e.target.value)}
                            className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-[#3F8391] focus:outline-none"
                            placeholder="https://votre-site-actuel.com"
                          />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Étape 3: Objectif du projet */}
              {step === 3 && formData.serviceType === 'Développement Web' && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <Target size={24} className="text-[#3F8391]" />
                      Objectif du projet
                    </h3>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-white font-medium mb-3">
                          Quel est le but principal de votre futur site ? (Plusieurs choix possibles)
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {[
                            'Présenter votre activité',
                            'Vendre en ligne (e-commerce)', 
                            'Générer des leads (prise de contact)',
                            'Créer une communauté',
                            'Portfolio / Vitrine',
                            'Blog / Site d\'information'
                          ].map((goal) => (
                            <motion.button
                              key={goal}
                              type="button"
                              onClick={() => handleArrayChange('projectGoals', goal)}
                              className={`p-3 rounded-xl border text-left transition-all duration-300 ${
                                formData.projectGoals.includes(goal)
                                  ? 'border-[#3F8391] bg-[#3F8391]/20 text-white'
                                  : 'border-white/20 bg-white/5 text-gray-300 hover:border-white/40'
                              }`}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                            >
                              <div className="flex items-center gap-2">
                                <div className={`w-4 h-4 rounded border-2 ${
                                  formData.projectGoals.includes(goal)
                                    ? 'bg-[#3F8391] border-[#3F8391]'
                                    : 'border-white/40'
                                }`}>
                                  {formData.projectGoals.includes(goal) && (
                                    <div className="w-full h-full flex items-center justify-center">
                                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                    </div>
                                  )}
                                </div>
                                <span className="text-sm">{goal}</span>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-white font-medium mb-3">
                          Décrivez brièvement votre projet
                        </label>
                        <textarea
                          value={formData.projectDescription}
                          onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                          className="w-full h-32 px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-[#3F8391] focus:outline-none resize-none"
                          placeholder="Expliquez votre vision, vos objectifs spécifiques, votre public cible..."
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              {/* Étape 4: Fonctionnalités souhaitées */}
              {step === 4 && formData.serviceType === 'Développement Web' && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <Settings size={24} className="text-[#3F8391]" />
                      Fonctionnalités souhaitées
                    </h3>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-white font-medium mb-3">
                          Quelles fonctionnalités souhaitez-vous ? (Plusieurs choix possibles)
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {[
                            'Site vitrine',
                            'Boutique e-commerce',
                            'Réservation / prise de rendez-vous en ligne',
                            'Blog / Actualités',
                            'Formulaire de contact',
                            'Espace membre / Connexion utilisateur',
                            'Galerie photos / portfolio',
                            'Intégration réseaux sociaux',
                            'Site multilingue',
                            'Paiement en ligne',
                            'Chat en ligne',
                            'Forum / Communauté'
                          ].map((feature) => (
                            <motion.button
                              key={feature}
                              type="button"
                              onClick={() => handleArrayChange('desiredFeatures', feature)}
                              className={`p-3 rounded-xl border text-left transition-all duration-300 ${
                                formData.desiredFeatures.includes(feature)
                                  ? 'border-[#3F8391] bg-[#3F8391]/20 text-white'
                                  : 'border-white/20 bg-white/5 text-gray-300 hover:border-white/40'
                              }`}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                            >
                              <div className="flex items-center gap-2">
                                <div className={`w-4 h-4 rounded border-2 ${
                                  formData.desiredFeatures.includes(feature)
                                    ? 'bg-[#3F8391] border-[#3F8391]'
                                    : 'border-white/40'
                                }`}>
                                  {formData.desiredFeatures.includes(feature) && (
                                    <div className="w-full h-full flex items-center justify-center">
                                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                    </div>
                                  )}
                                </div>
                                <span className="text-sm">{feature}</span>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-white font-medium mb-3">
                          Souhaitez-vous que je réalise le design ?
                        </label>
                        <div className="flex gap-4">
                          {[true, false].map((value) => (
                            <motion.button
                              key={value}
                              type="button"
                              onClick={() => handleInputChange('needDesign', value)}
                              className={`px-6 py-3 rounded-xl border transition-all duration-300 ${
                                formData.needDesign === value
                                  ? 'border-[#3F8391] bg-[#3F8391]/20 text-white'
                                  : 'border-white/20 bg-white/5 text-gray-300 hover:border-white/40'
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {value ? 'Oui, création complète' : 'Non, j\'ai déjà un design'}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Étape 5: E-commerce (conditionnelle) */}
              {step === 5 && formData.serviceType === 'Développement Web' && formData.desiredFeatures.includes('Boutique e-commerce') && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <ShoppingCart size={24} className="text-[#3F8391]" />
                      Spécificités E-commerce
                    </h3>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-white font-medium mb-3">
                          Combien de produits environ ?
                        </label>
                        <select
                          value={formData.productCount}
                          onChange={(e) => handleInputChange('productCount', e.target.value)}
                          className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white focus:border-[#3F8391] focus:outline-none"
                        >
                          <option value="">Sélectionnez une fourchette</option>
                          <option value="1-10">1 à 10 produits</option>
                          <option value="10-50">10 à 50 produits</option>
                          <option value="50-200">50 à 200 produits</option>
                          <option value="200-1000">200 à 1000 produits</option>
                          <option value="1000+">Plus de 1000 produits</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-white font-medium mb-3">
                          Quels moyens de paiement souhaitez-vous proposer ?
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {[
                            'Carte bancaire',
                            'PayPal',
                            'Virement bancaire',
                            'Paiement à la livraison',
                            'Apple Pay / Google Pay',
                            'Stripe',
                            'Chèque',
                            'Échéancier / Paiement en plusieurs fois'
                          ].map((method) => (
                            <motion.button
                              key={method}
                              type="button"
                              onClick={() => handleArrayChange('paymentMethods', method)}
                              className={`p-3 rounded-xl border text-center transition-all duration-300 ${
                                formData.paymentMethods.includes(method)
                                  ? 'border-[#3F8391] bg-[#3F8391]/20 text-white'
                                  : 'border-white/20 bg-white/5 text-gray-300 hover:border-white/40'
                              }`}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                            >
                              <span className="text-xs">{method}</span>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-white font-medium mb-3">
                          Souhaitez-vous proposer la livraison ?
                        </label>
                        <div className="flex gap-4">
                          {[true, false].map((value) => (
                            <motion.button
                              key={value}
                              type="button"
                              onClick={() => handleInputChange('deliveryNeeded', value)}
                              className={`px-6 py-3 rounded-xl border transition-all duration-300 ${
                                formData.deliveryNeeded === value
                                  ? 'border-[#3F8391] bg-[#3F8391]/20 text-white'
                                  : 'border-white/20 bg-white/5 text-gray-300 hover:border-white/40'
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {value ? 'Oui' : 'Non'}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Étape 6: Délais & Budget */}
              {((step === 6 && formData.desiredFeatures.includes('Boutique e-commerce')) || (step === 5 && !formData.desiredFeatures.includes('Boutique e-commerce'))) && formData.serviceType === 'Développement Web' && (
                <motion.div
                  key={`step${step}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <Clock size={24} className="text-[#3F8391]" />
                      Délais & Budget
                    </h3>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-white font-medium mb-3">
                          Avez-vous une date idéale de mise en ligne ?
                        </label>
                        <input
                          type="date"
                          value={formData.idealLaunchDate}
                          onChange={(e) => handleInputChange('idealLaunchDate', e.target.value)}
                          className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white focus:border-[#3F8391] focus:outline-none"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-white font-medium mb-3">
                          Quel est votre budget approximatif ?
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {[
                            'Moins de 1000€',
                            '1000€ - 2000€',
                            '2000€ - 5000€',
                            '5000€ - 10000€',
                            '10000€ - 20000€',
                            'Plus de 20000€'
                          ].map((range) => (
                            <motion.button
                              key={range}
                              type="button"
                              onClick={() => handleInputChange('budgetRange', range)}
                              className={`p-3 rounded-xl border text-center transition-all duration-300 ${
                                formData.budgetRange === range
                                  ? 'border-[#3F8391] bg-[#3F8391]/20 text-white'
                                  : 'border-white/20 bg-white/5 text-gray-300 hover:border-white/40'
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {range}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Les autres étapes continuent... */}
              {/* Pour l'instant, on garde les étapes basiques pour les autres services */}
              {formData.serviceType !== 'Développement Web' && step === 2 && (
                <motion.div
                  key="step2-basic"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                      Décrivez votre projet
                    </h3>
                    <textarea
                      value={formData.projectDescription}
                      onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                      className="w-full h-32 px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-[#3F8391] focus:outline-none resize-none"
                      placeholder="Décrivez vos besoins, objectifs et contraintes..."
                    />
                  </div>
                </motion.div>
              )}

              {formData.serviceType !== 'Développement Web' && step === 3 && (
                <motion.div
                  key="step3-basic"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                      Vos coordonnées
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Prénom"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-[#3F8391] focus:outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Nom"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-[#3F8391] focus:outline-none"
                        />
                      </div>
                      <input
                        type="email"
                        required
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-[#3F8391] focus:outline-none"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Étape 7: Maintenance & suivi */}
              {((step === 7 && formData.desiredFeatures.includes('Boutique e-commerce')) || (step === 6 && !formData.desiredFeatures.includes('Boutique e-commerce'))) && formData.serviceType === 'Développement Web' && (
                <motion.div
                  key={`step${step}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <Wrench size={24} className="text-[#3F8391]" />
                      Maintenance & Suivi
                    </h3>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-white font-medium mb-3">
                          Souhaitez-vous une formation pour gérer votre site ?
                        </label>
                        <div className="flex gap-4">
                          {[true, false].map((value) => (
                            <motion.button
                              key={value}
                              type="button"
                              onClick={() => handleInputChange('needTraining', value)}
                              className={`px-6 py-3 rounded-xl border transition-all duration-300 ${
                                formData.needTraining === value
                                  ? 'border-[#3F8391] bg-[#3F8391]/20 text-white'
                                  : 'border-white/20 bg-white/5 text-gray-300 hover:border-white/40'
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {value ? 'Oui, j\'ai besoin d\'une formation' : 'Non, je maîtrise déjà'}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-white font-medium mb-3">
                          Souhaitez-vous que je m'occupe de la maintenance après livraison ?
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {['Oui', 'Non', 'À discuter'].map((option) => (
                            <motion.button
                              key={option}
                              type="button"
                              onClick={() => handleInputChange('needMaintenance', option)}
                              className={`p-3 rounded-xl border text-center transition-all duration-300 ${
                                formData.needMaintenance === option
                                  ? 'border-[#3F8391] bg-[#3F8391]/20 text-white'
                                  : 'border-white/20 bg-white/5 text-gray-300 hover:border-white/40'
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {option}
                            </motion.button>
                          ))}
                        </div>
                        <p className="text-gray-400 text-sm mt-2">
                          La maintenance inclut : mises à jour de sécurité, sauvegardes, optimisations...
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Étape 8: Autres besoins */}
              {((step === 8 && formData.desiredFeatures.includes('Boutique e-commerce')) || (step === 7 && !formData.desiredFeatures.includes('Boutique e-commerce'))) && formData.serviceType === 'Développement Web' && (
                <motion.div
                  key={`step${step}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <MessageSquare size={24} className="text-[#3F8391]" />
                      Autres besoins ou remarques
                    </h3>
                    
                    <div>
                      <label className="block text-white font-medium mb-3">
                        Y a-t-il autre chose que je devrais savoir ?
                      </label>
                      <textarea
                        value={formData.additionalNotes}
                        onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                        className="w-full h-32 px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-[#3F8391] focus:outline-none resize-none"
                        placeholder="Contraintes techniques, préférences de design, inspirations, délais spécifiques, budget détaillé..."
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Étape 9: Contact préféré */}
              {((step === 9 && formData.desiredFeatures.includes('Boutique e-commerce')) || (step === 8 && !formData.desiredFeatures.includes('Boutique e-commerce'))) && formData.serviceType === 'Développement Web' && (
                <motion.div
                  key={`step${step}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <Phone size={24} className="text-[#3F8391]" />
                      Dernière étape
                    </h3>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-white font-medium mb-3">
                          Souhaitez-vous être contacté par :
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {[
                            { value: 'Email', icon: '📧', desc: 'Réponse sous 24h' },
                            { value: 'Téléphone', icon: '📞', desc: 'Appel direct' },
                            { value: 'Visio', icon: '💻', desc: 'Réunion en ligne' }
                          ].map((contact) => (
                            <motion.button
                              key={contact.value}
                              type="button"
                              onClick={() => handleInputChange('preferredContact', contact.value)}
                              className={`p-4 rounded-xl border text-center transition-all duration-300 ${
                                formData.preferredContact === contact.value
                                  ? 'border-[#3F8391] bg-[#3F8391]/20 text-white'
                                  : 'border-white/20 bg-white/5 text-gray-300 hover:border-white/40'
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="text-2xl mb-2">{contact.icon}</div>
                              <div className="font-medium">{contact.value}</div>
                              <div className="text-xs text-gray-400 mt-1">{contact.desc}</div>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-[#3F8391]/10 border border-[#3F8391]/20 rounded-2xl p-4">
                        <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                          ✨ Presque fini !
                        </h4>
                        <p className="text-gray-300 text-sm">
                          Votre demande sera traitée sous 24h. Je vous recontacterai pour discuter 
                          de votre projet et vous proposer un devis personnalisé.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
              <motion.button
                type="button"
                onClick={prevStep}
                disabled={step === 1}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                  step === 1
                    ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
                whileHover={step > 1 ? { scale: 1.05 } : {}}
                whileTap={step > 1 ? { scale: 0.95 } : {}}
              >
                <ChevronLeft size={18} />
                Précédent
              </motion.button>

              {step < getActualTotalSteps() ? (
                <motion.button
                  type="button"
                  onClick={nextStep}
                  disabled={formData.serviceType === '' || (formData.serviceType !== 'Développement Web' && step === 1)}
                  className={`px-6 py-3 rounded-full font-medium text-white transition-all duration-300 flex items-center gap-2 ${
                    formData.serviceType === '' || (formData.serviceType !== 'Développement Web' && step === 1)
                      ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                      : ''
                  }`}
                  style={{
                    background: (formData.serviceType === '' || (formData.serviceType !== 'Développement Web' && step === 1)) 
                      ? 'rgba(255, 255, 255, 0.05)' 
                      : 'linear-gradient(135deg, rgba(63, 131, 145, 0.8), rgba(63, 131, 145, 0.6))'
                  }}
                  whileHover={!(formData.serviceType === '' || (formData.serviceType !== 'Développement Web' && step === 1)) ? { scale: 1.05 } : {}}
                  whileTap={!(formData.serviceType === '' || (formData.serviceType !== 'Développement Web' && step === 1)) ? { scale: 0.95 } : {}}
                >
                  Suivant
                  <ChevronRight size={18} />
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-3 rounded-full font-medium text-white transition-all duration-300 flex items-center gap-2 ${
                    isSubmitting ? 'cursor-not-allowed opacity-70' : ''
                  }`}
                  style={{
                    background: isSubmitting 
                      ? 'rgba(107, 114, 128, 0.5)' 
                      : 'linear-gradient(135deg, rgba(63, 131, 145, 0.8), rgba(63, 131, 145, 0.6))'
                  }}
                  whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Envoyer la demande
                    </>
                  )}
                </motion.button>
              )}
            </div>

            {/* Message de statut */}
            <AnimatePresence>
              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`mt-6 p-4 rounded-2xl border flex items-center gap-3 ${
                    submitStatus === 'success'
                      ? 'bg-green-500/10 border-green-500/30 text-green-200'
                      : 'bg-red-500/10 border-red-500/30 text-red-200'
                  }`}
                >
                  {submitStatus === 'success' ? (
                    <CheckCircle size={20} className="text-green-400 flex-shrink-0" />
                  ) : (
                    <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
                  )}
                  <div>
                    <div className="font-semibold mb-1">
                      {submitStatus === 'success' ? '✅ Demande envoyée !' : '❌ Erreur d\'envoi'}
                    </div>
                    <div className="text-sm opacity-90">{submitMessage}</div>
                    {submitStatus === 'success' && (
                      <div className="text-xs mt-2 opacity-75">
                        Cette fenêtre se fermera automatiquement dans quelques secondes...
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default QuoteModal;