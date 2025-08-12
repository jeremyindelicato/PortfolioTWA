import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, FileText, ChevronLeft, ChevronRight, User, Target, Settings, ShoppingCart, Clock, Wrench, MessageSquare, Phone, CheckCircle, AlertCircle, Brain, Database, Zap, Bot, BarChart3, Cpu } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { submitQuoteRequest, submitAiQuoteRequest, submitGrowthQuoteRequest } from '../utils/supabase';

const QuoteModal = ({ isOpen, onClose }) => {
  const { isDarkMode } = useTheme();
  const [step, setStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(3); // Will be updated based on service type
  const [isSuccessScreen, setIsSuccessScreen] = useState(false); // New state for success screen
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
    preferredContact: '',

    // 🤖 CHAMPS SPÉCIFIQUES IA
    // 🧑‍💼 1. Infos de base IA
    aiNeedDescription: '',
    
    // 🎯 2. Objectif du projet IA
    aiProjectGoals: [],
    aiCustomGoal: '',
    
    // 📊 3. Données disponibles
    hasDataAvailable: null,
    dataTypes: [],
    dataVolume: '',
    
    // ⚙️ 4. Fonctionnalités souhaitées IA
    aiDesiredFeatures: [],
    
    // ⏰ 5. Délai et budget IA
    projectStartTimeline: '',
    aiBudgetRange: '',
    
    // 📝 6. Complément IA
    needTechnicalSupport: null,
    needFutureMaintenance: null,
    aiAdditionalNotes: '',

    // 🚀 CHAMPS SPÉCIFIQUES GROWTH
    // 🧑‍💼 1. Infos de base (réutilise firstName, lastName, email, companyName, businessSector, hasExistingWebsite, existingWebsiteUrl)
    
    // 🎯 2. Objectif de la mission
    growthMainGoals: [],
    growthCustomGoal: '',
    
    // 🛠️ 3. Services souhaités
    growthDesiredServices: [],
    growthCustomService: '',
    
    // 🎯 4. Ciblage & données
    targetAudience: '',
    hasExistingDatabase: null,
    leadSources: [],
    
    // 📊 5. KPI & ambitions
    growthObjectives: '',
    wantsDetailedReporting: null,
    hasTestedGrowthTools: null,
    testedToolsDetails: '',
    
    // ⏰ 6. Délai & budget (réutilise projectStartTimeline)
    growthBudgetRange: '',
    
    // 🧠 7. Autres besoins
    additionalServices: [],
    growthCustomAdditional: '',
    
    // 📝 8. Remarques (réutilise aiAdditionalNotes comme growthAdditionalNotes)
    growthAdditionalNotes: ''
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
    } else if (formData.serviceType === 'Intelligence Artificielle') {
      const aiTitles = {
        1: 'Service',
        2: 'Infos de base',
        3: 'Objectif du projet',
        4: 'Données disponibles',
        5: 'Fonctionnalités souhaitées',
        6: 'Délai et budget',
        7: 'Complément',
        8: 'Contact préféré'
      };
      return aiTitles[stepNumber] || 'Étape';
    }
    return `Étape ${stepNumber}`;
  };

  // Update total steps based on service type and form data
  const updateTotalSteps = () => {
    if (formData.serviceType === 'Développement Web') {
      // Check if e-commerce is selected to determine if we need step 5
      const hasEcommerce = formData.desiredFeatures.includes('Boutique e-commerce');
      return hasEcommerce ? 9 : 8; // Skip e-commerce step if not selected
    } else if (formData.serviceType === 'Intelligence Artificielle') {
      return 8; // IA has 8 steps total
    } else if (formData.serviceType === 'Growth Marketing') {
      return 8; // Growth has 8 steps total
    }
    return 3; // Default for other services
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
    
    // Vérification que la préférence de contact est sélectionnée
    if (!formData.preferredContact) {
      setSubmitStatus('error');
      setSubmitMessage('Veuillez sélectionner votre préférence de contact.');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      console.log('🚀 Envoi de la demande de devis:', formData);
      
      // Choisir la fonction appropriée selon le type de service
      let result;
      if (formData.serviceType === 'Intelligence Artificielle') {
        result = await submitAiQuoteRequest(formData);
      } else if (formData.serviceType === 'Growth Marketing') {
        result = await submitGrowthQuoteRequest(formData);
      } else {
        result = await submitQuoteRequest(formData);
      }
      
      if (result.success) {
        setSubmitStatus('success');
        setSubmitMessage(result.message);
        setIsSuccessScreen(true); // Show success screen instead of closing
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
      preferredContact: '',
      // 🤖 Reset des champs IA
      aiNeedDescription: '',
      aiProjectGoals: [],
      aiCustomGoal: '',
      hasDataAvailable: null,
      dataTypes: [],
      dataVolume: '',
      aiDesiredFeatures: [],
      projectStartTimeline: '',
      aiBudgetRange: '',
      needTechnicalSupport: null,
      needFutureMaintenance: null,
      aiAdditionalNotes: '',
      // 🚀 Reset des champs Growth
      growthMainGoals: [],
      growthCustomGoal: '',
      growthDesiredServices: [],
      growthCustomService: '',
      targetAudience: '',
      hasExistingDatabase: null,
      leadSources: [],
      growthObjectives: '',
      wantsDetailedReporting: null,
      hasTestedGrowthTools: null,
      testedToolsDetails: '',
      growthBudgetRange: '',
      additionalServices: [],
      growthCustomAdditional: '',
      growthAdditionalNotes: ''
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
      <div className="fixed inset-0 z-[99998] flex items-center justify-center p-4">
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
          className={`relative w-full max-w-sm sm:max-w-lg md:max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-3xl border transition-all duration-500 ${
            isDarkMode ? 'border-white/20' : 'border-gray-300/30'
          }`}
          style={{
            background: isDarkMode ? `
              linear-gradient(135deg, 
                rgba(255, 255, 255, 0.15) 0%, 
                rgba(255, 255, 255, 0.05) 50%, 
                rgba(0, 0, 0, 0.2) 100%
              )
            ` : `
              linear-gradient(135deg, 
                rgba(255, 255, 255, 0.98) 0%, 
                rgba(255, 255, 255, 0.95) 50%, 
                rgba(255, 255, 255, 0.97) 100%
              )
            `,
            backdropFilter: 'blur(25px)',
            boxShadow: isDarkMode ? `
              0 25px 60px rgba(0, 0, 0, 0.5),
              inset 0 1px 0 rgba(255, 255, 255, 0.3)
            ` : `
              0 25px 60px rgba(0, 0, 0, 0.15),
              inset 0 1px 0 rgba(255, 255, 255, 0.8)
            `
          }}
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Header */}
          <div className={`flex items-center justify-between p-6 border-b transition-colors duration-500 ${
            isDarkMode ? 'border-white/10' : 'border-gray-300/30'
          }`}>
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
                <h2 className={`text-2xl font-bold transition-colors duration-500 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Demande de Devis
                </h2>
                <p className={`text-sm transition-colors duration-500 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {isSuccessScreen ? 'Demande envoyée !' : `${getStepTitle(step)} - Étape ${step} sur ${getActualTotalSteps()}`}
                </p>
              </div>
            </div>
            <motion.button
              onClick={onClose}
              className="group"
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#ffffff',
                border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid #e5e7eb',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isDarkMode ? 'none' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                position: 'relative'
              }}
              whileHover={{ 
                scale: 1.02,
                backgroundColor: '#ef4444',
                transition: { duration: 0.2 }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { duration: 0.1 }
              }}
            >
              {/* Croix CSS */}
              <div
                style={{
                  position: 'relative',
                  width: '16px',
                  height: '16px'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '16px',
                    height: '2px',
                    backgroundColor: isDarkMode ? '#ffffff' : '#374151',
                    transform: 'translate(-50%, -50%) rotate(45deg)',
                    transition: 'background-color 0.2s ease'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '16px',
                    height: '2px',
                    backgroundColor: isDarkMode ? '#ffffff' : '#374151',
                    transform: 'translate(-50%, -50%) rotate(-45deg)',
                    transition: 'background-color 0.2s ease'
                  }}
                />
              </div>
            </motion.button>
          </div>

          {/* Progress Bar */}
          <div className="px-4 sm:px-6 py-3 sm:py-4">
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
              <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                {Math.round((step / getActualTotalSteps()) * 100)}% complété
              </span>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-4 sm:p-6">
            <AnimatePresence mode="wait">
              {/* Étape 1: Type de service */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4 sm:space-y-6"
                >
                  <div>
                    <h3 className={`text-xl font-semibold mb-4 flex items-center gap-2 transition-colors duration-500 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      <Settings size={24} className="text-[#3F8391]" />
                      Quel service vous intéresse ?
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
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
                          style={{
                            padding: '16px',
                            borderRadius: '16px',
                            border: formData.serviceType === service
                              ? `2px solid #3F8391`
                              : isDarkMode 
                                ? '1px solid rgba(255, 255, 255, 0.2)' 
                                : '1px solid rgba(156, 163, 175, 0.4)',
                            textAlign: 'center',
                            transition: 'all 0.3s ease',
                            backgroundColor: formData.serviceType === service
                              ? isDarkMode ? 'rgba(63, 131, 145, 0.4)' : '#3F8391'
                              : isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.7)',
                            color: formData.serviceType === service
                              ? isDarkMode ? '#ffffff' : '#f3f4f6'
                              : isDarkMode ? '#d1d5db' : '#374151',
                            cursor: 'pointer',
                            boxShadow: formData.serviceType === service
                              ? '0 25px 50px -12px rgba(63, 131, 145, 0.5)'
                              : 'none'
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div style={{ fontWeight: '500' }}>{service}</div>
                        </motion.button>
                      ))}
                    </div>
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
                  className="space-y-4 sm:space-y-6"
                >
                  <div>
                    <h3 className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2 transition-colors duration-500 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      <User size={24} className="text-[#3F8391]" />
                      Informations générales
                    </h3>
                    
                    <div className="space-y-3 sm:space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={`block font-medium mb-2 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                            Prénom *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border focus:border-[#3F8391] focus:outline-none text-sm sm:text-base transition-all duration-300 ${
                              isDarkMode 
                                ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                                : 'bg-white/80 border-gray-300/40 text-gray-900 placeholder-gray-500'
                            }`}
                            placeholder="Votre prénom"
                          />
                        </div>
                        <div>
                          <label className={`block font-medium mb-2 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                            Nom *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border focus:border-[#3F8391] focus:outline-none text-sm sm:text-base transition-all duration-300 ${
                              isDarkMode 
                                ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                                : 'bg-white/80 border-gray-300/40 text-gray-900 placeholder-gray-500'
                            }`}
                            placeholder="Votre nom"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className={`block font-medium mb-2 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border focus:border-[#3F8391] focus:outline-none text-sm sm:text-base transition-all duration-300 ${
                              isDarkMode 
                                ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                                : 'bg-white/80 border-gray-300/40 text-gray-900 placeholder-gray-500'
                            }`}
                          placeholder="votre@email.com"
                        />
                      </div>
                      
                      <div>
                        <label className={`block font-medium mb-2 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          Nom de l'entreprise (si applicable)
                        </label>
                        <input
                          type="text"
                          value={formData.companyName}
                          onChange={(e) => handleInputChange('companyName', e.target.value)}
                          className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border focus:border-[#3F8391] focus:outline-none text-sm sm:text-base transition-all duration-300 ${
                              isDarkMode 
                                ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                                : 'bg-white/80 border-gray-300/40 text-gray-900 placeholder-gray-500'
                            }`}
                          placeholder="Nom de votre entreprise ou organisation"
                        />
                      </div>
                      
                      <div>
                        <label className={`block font-medium mb-2 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          Secteur d'activité
                        </label>
                        <input
                          type="text"
                          value={formData.businessSector}
                          onChange={(e) => handleInputChange('businessSector', e.target.value)}
                          className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border focus:border-[#3F8391] focus:outline-none text-sm sm:text-base transition-all duration-300 ${
                              isDarkMode 
                                ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                                : 'bg-white/80 border-gray-300/40 text-gray-900 placeholder-gray-500'
                            }`}
                          placeholder="Ex: Parfumerie, Santé, Éducation..."
                        />
                      </div>
                      
                      <div>
                        <label className={`block font-medium mb-3 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          Avez-vous déjà un site web ?
                        </label>
                        <div className="flex gap-4">
                          {[true, false].map((value) => (
                            <motion.button
                              key={value}
                              type="button"
                              onClick={() => handleInputChange('hasExistingWebsite', value)}
                              style={{
                                padding: '12px 24px',
                                borderRadius: '12px',
                                border: formData.hasExistingWebsite === value
                                  ? `2px solid #3F8391`
                                  : isDarkMode 
                                    ? '1px solid rgba(255, 255, 255, 0.2)' 
                                    : '1px solid rgba(156, 163, 175, 0.4)',
                                textAlign: 'center',
                                transition: 'all 0.3s ease',
                                backgroundColor: formData.hasExistingWebsite === value
                                  ? isDarkMode ? 'rgba(63, 131, 145, 0.4)' : '#3F8391'
                                  : isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.7)',
                                color: formData.hasExistingWebsite === value
                                  ? isDarkMode ? '#ffffff' : '#f3f4f6'
                                  : isDarkMode ? '#d1d5db' : '#374151',
                                cursor: 'pointer',
                                boxShadow: formData.hasExistingWebsite === value
                                  ? '0 25px 50px -12px rgba(63, 131, 145, 0.5)'
                                  : 'none'
                              }}
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
                          <label className={`block font-medium mb-2 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                            Quel est le lien de votre site actuel ?
                          </label>
                          <input
                            type="url"
                            value={formData.existingWebsiteUrl}
                            onChange={(e) => handleInputChange('existingWebsiteUrl', e.target.value)}
                            className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border focus:border-[#3F8391] focus:outline-none text-sm sm:text-base transition-all duration-300 ${
                              isDarkMode 
                                ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                                : 'bg-white/80 border-gray-300/40 text-gray-900 placeholder-gray-500'
                            }`}
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
                  className="space-y-4 sm:space-y-6"
                >
                  <div>
                    <h3 className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2 transition-colors duration-500 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      <Target size={24} className="text-[#3F8391]" />
                      Objectif du projet
                    </h3>
                    
                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <label className={`block font-medium mb-3 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          Quel est le but principal de votre futur site ? (Plusieurs choix possibles)
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                              style={{
                                padding: '12px',
                                borderRadius: '12px',
                                border: formData.projectGoals.includes(goal)
                                  ? `2px solid #3F8391`
                                  : isDarkMode 
                                    ? '1px solid rgba(255, 255, 255, 0.2)' 
                                    : '1px solid rgba(156, 163, 175, 0.4)',
                                textAlign: 'left',
                                transition: 'all 0.3s ease',
                                backgroundColor: formData.projectGoals.includes(goal)
                                  ? isDarkMode ? 'rgba(63, 131, 145, 0.4)' : '#3F8391'
                                  : isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.7)',
                                color: formData.projectGoals.includes(goal)
                                  ? isDarkMode ? '#ffffff' : '#f3f4f6'
                                  : isDarkMode ? '#d1d5db' : '#374151',
                                cursor: 'pointer',
                                boxShadow: formData.projectGoals.includes(goal)
                                  ? '0 25px 50px -12px rgba(63, 131, 145, 0.5)'
                                  : 'none'
                              }}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{
                                  width: '16px',
                                  height: '16px',
                                  borderRadius: '4px',
                                  border: formData.projectGoals.includes(goal)
                                    ? '2px solid #3F8391'
                                    : '2px solid rgba(255, 255, 255, 0.4)',
                                  backgroundColor: formData.projectGoals.includes(goal) ? '#3F8391' : 'transparent'
                                }}>
                                  {formData.projectGoals.includes(goal) && (
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                      <div style={{ width: '6px', height: '6px', backgroundColor: 'white', borderRadius: '50%' }} />
                                    </div>
                                  )}
                                </div>
                                <span style={{ fontSize: '14px' }}>{goal}</span>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className={`block font-medium mb-3 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          Décrivez brièvement votre projet
                        </label>
                        <textarea
                          value={formData.projectDescription}
                          onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                          className={`w-full h-32 px-4 py-3 rounded-2xl border focus:border-[#3F8391] focus:outline-none resize-none transition-all duration-300 ${
                            isDarkMode 
                              ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                              : 'bg-white/80 border-gray-300/40 text-gray-900 placeholder-gray-500'
                          }`}
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
                  className="space-y-4 sm:space-y-6"
                >
                  <div>
                    <h3 className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2 transition-colors duration-500 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      <Settings size={24} className="text-[#3F8391]" />
                      Fonctionnalités souhaitées
                    </h3>
                    
                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <label className={`block font-medium mb-3 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          Quelles fonctionnalités souhaitez-vous ? (Plusieurs choix possibles)
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                              style={{
                                padding: '12px',
                                borderRadius: '12px',
                                border: formData.desiredFeatures.includes(feature)
                                  ? `2px solid #3F8391`
                                  : isDarkMode 
                                    ? '1px solid rgba(255, 255, 255, 0.2)' 
                                    : '1px solid rgba(156, 163, 175, 0.4)',
                                textAlign: 'left',
                                transition: 'all 0.3s ease',
                                backgroundColor: formData.desiredFeatures.includes(feature)
                                  ? isDarkMode ? 'rgba(63, 131, 145, 0.4)' : '#3F8391'
                                  : isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.7)',
                                color: formData.desiredFeatures.includes(feature)
                                  ? isDarkMode ? '#ffffff' : '#f3f4f6'
                                  : isDarkMode ? '#d1d5db' : '#374151',
                                cursor: 'pointer',
                                boxShadow: formData.desiredFeatures.includes(feature)
                                  ? '0 25px 50px -12px rgba(63, 131, 145, 0.5)'
                                  : 'none'
                              }}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{
                                  width: '16px',
                                  height: '16px',
                                  borderRadius: '4px',
                                  border: formData.desiredFeatures.includes(feature)
                                    ? '2px solid #3F8391'
                                    : '2px solid rgba(255, 255, 255, 0.4)',
                                  backgroundColor: formData.desiredFeatures.includes(feature) ? '#3F8391' : 'transparent'
                                }}>
                                  {formData.desiredFeatures.includes(feature) && (
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                      <div style={{ width: '6px', height: '6px', backgroundColor: 'white', borderRadius: '50%' }} />
                                    </div>
                                  )}
                                </div>
                                <span style={{ fontSize: '14px' }}>{feature}</span>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className={`block font-medium mb-3 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          Souhaitez-vous que je réalise le design ?
                        </label>
                        <div className="flex gap-4">
                          {[true, false].map((value) => (
                            <motion.button
                              key={value}
                              type="button"
                              onClick={() => handleInputChange('needDesign', value)}
                              style={{
                                padding: '12px 24px',
                                borderRadius: '12px',
                                border: formData.needDesign === value
                                  ? `2px solid #3F8391`
                                  : isDarkMode 
                                    ? '1px solid rgba(255, 255, 255, 0.2)' 
                                    : '1px solid rgba(156, 163, 175, 0.4)',
                                textAlign: 'center',
                                transition: 'all 0.3s ease',
                                backgroundColor: formData.needDesign === value
                                  ? isDarkMode ? 'rgba(63, 131, 145, 0.4)' : '#3F8391'
                                  : isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.7)',
                                color: formData.needDesign === value
                                  ? isDarkMode ? '#ffffff' : '#f3f4f6'
                                  : isDarkMode ? '#d1d5db' : '#374151',
                                cursor: 'pointer',
                                boxShadow: formData.needDesign === value
                                  ? '0 25px 50px -12px rgba(63, 131, 145, 0.5)'
                                  : 'none'
                              }}
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
                  className="space-y-4 sm:space-y-6"
                >
                  <div>
                    <h3 className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2 transition-colors duration-500 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      <ShoppingCart size={24} className="text-[#3F8391]" />
                      Spécificités E-commerce
                    </h3>
                    
                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <label className={`block font-medium mb-3 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          Combien de produits environ ?
                        </label>
                        <select
                          value={formData.productCount}
                          onChange={(e) => handleInputChange('productCount', e.target.value)}
                          className={`w-full px-4 py-3 rounded-2xl border focus:border-[#3F8391] focus:outline-none transition-all duration-300 ${
                            isDarkMode 
                              ? 'bg-white/10 border-white/20 text-white' 
                              : 'bg-white/80 border-gray-300/40 text-gray-900'
                          }`}
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
                        <label className={`block font-medium mb-3 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          Quels moyens de paiement souhaitez-vous proposer ? (Plusieurs choix possibles)
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                              style={{
                                padding: '12px',
                                borderRadius: '12px',
                                border: formData.paymentMethods.includes(method)
                                  ? `2px solid #3F8391`
                                  : isDarkMode 
                                    ? '1px solid rgba(255, 255, 255, 0.2)' 
                                    : '1px solid rgba(156, 163, 175, 0.4)',
                                textAlign: 'left',
                                transition: 'all 0.3s ease',
                                backgroundColor: formData.paymentMethods.includes(method)
                                  ? isDarkMode ? 'rgba(63, 131, 145, 0.4)' : '#3F8391'
                                  : isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.7)',
                                color: formData.paymentMethods.includes(method)
                                  ? isDarkMode ? '#ffffff' : '#f3f4f6'
                                  : isDarkMode ? '#d1d5db' : '#374151',
                                cursor: 'pointer',
                                boxShadow: formData.paymentMethods.includes(method)
                                  ? '0 25px 50px -12px rgba(63, 131, 145, 0.5)'
                                  : 'none'
                              }}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                  width: '20px',
                                  height: '20px',
                                  borderRadius: '4px',
                                  border: formData.paymentMethods.includes(method)
                                    ? '2px solid #3F8391'
                                    : '2px solid rgba(255, 255, 255, 0.4)',
                                  backgroundColor: formData.paymentMethods.includes(method) ? '#3F8391' : 'transparent',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}>
                                  {formData.paymentMethods.includes(method) && (
                                    <svg style={{ width: '12px', height: '12px', color: 'white' }} fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                  )}
                                </div>
                                <span style={{ fontSize: '14px' }}>{method}</span>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className={`block font-medium mb-3 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          Souhaitez-vous proposer la livraison ?
                        </label>
                        <div className="flex gap-4">
                          {[true, false].map((value) => (
                            <motion.button
                              key={value}
                              type="button"
                              onClick={() => handleInputChange('deliveryNeeded', value)}
                              style={{
                                padding: '12px 24px',
                                borderRadius: '12px',
                                border: formData.deliveryNeeded === value
                                  ? `2px solid #3F8391`
                                  : isDarkMode 
                                    ? '1px solid rgba(255, 255, 255, 0.2)' 
                                    : '1px solid rgba(156, 163, 175, 0.4)',
                                textAlign: 'center',
                                transition: 'all 0.3s ease',
                                backgroundColor: formData.deliveryNeeded === value
                                  ? isDarkMode ? 'rgba(63, 131, 145, 0.4)' : '#3F8391'
                                  : isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.7)',
                                color: formData.deliveryNeeded === value
                                  ? isDarkMode ? '#ffffff' : '#f3f4f6'
                                  : isDarkMode ? '#d1d5db' : '#374151',
                                cursor: 'pointer',
                                boxShadow: formData.deliveryNeeded === value
                                  ? '0 25px 50px -12px rgba(63, 131, 145, 0.5)'
                                  : 'none'
                              }}
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
                  className="space-y-4 sm:space-y-6"
                >
                  <div>
                    <h3 className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2 transition-colors duration-500 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      <Clock size={24} className="text-[#3F8391]" />
                      Délais & Budget
                    </h3>
                    
                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <label className={`block font-medium mb-3 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          Avez-vous une date idéale de mise en ligne ?
                        </label>
                        <input
                          type="date"
                          value={formData.idealLaunchDate}
                          onChange={(e) => handleInputChange('idealLaunchDate', e.target.value)}
                          className={`w-full px-4 py-3 rounded-2xl border focus:border-[#3F8391] focus:outline-none transition-all duration-300 ${
                            isDarkMode 
                              ? 'bg-white/10 border-white/20 text-white' 
                              : 'bg-white/80 border-gray-300/40 text-gray-900'
                          }`}
                        />
                      </div>
                      
                      <div>
                        <label className={`block font-medium mb-3 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          Quel est votre budget approximatif ? (Un seul choix)
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                              style={{
                                padding: '12px',
                                borderRadius: '12px',
                                border: formData.budgetRange === range
                                  ? `2px solid #3F8391`
                                  : isDarkMode 
                                    ? '1px solid rgba(255, 255, 255, 0.2)' 
                                    : '1px solid rgba(156, 163, 175, 0.4)',
                                textAlign: 'left',
                                transition: 'all 0.3s ease',
                                backgroundColor: formData.budgetRange === range
                                  ? isDarkMode ? 'rgba(63, 131, 145, 0.4)' : '#3F8391'
                                  : isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.7)',
                                color: formData.budgetRange === range
                                  ? isDarkMode ? '#ffffff' : '#f3f4f6'
                                  : isDarkMode ? '#d1d5db' : '#374151',
                                cursor: 'pointer',
                                boxShadow: formData.budgetRange === range
                                  ? '0 25px 50px -12px rgba(63, 131, 145, 0.5)'
                                  : 'none'
                              }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                  width: '20px',
                                  height: '20px',
                                  borderRadius: '50%',
                                  border: formData.budgetRange === range
                                    ? '2px solid #3F8391'
                                    : '2px solid rgba(255, 255, 255, 0.4)',
                                  backgroundColor: formData.budgetRange === range ? '#3F8391' : 'transparent',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}>
                                  {formData.budgetRange === range && (
                                    <div style={{ width: '8px', height: '8px', backgroundColor: 'white', borderRadius: '50%' }} />
                                  )}
                                </div>
                                <span style={{ fontSize: '14px' }}>{range}</span>
                              </div>
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
                  className="space-y-4 sm:space-y-6"
                >
                  <div>
                    <h3 className={`text-xl font-semibold mb-4 transition-colors duration-500 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Décrivez votre projet
                    </h3>
                    <textarea
                      value={formData.projectDescription}
                      onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                      className={`w-full h-32 px-4 py-3 rounded-2xl border focus:border-[#3F8391] focus:outline-none resize-none transition-all duration-300 ${
                            isDarkMode 
                              ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                              : 'bg-white/80 border-gray-300/40 text-gray-900 placeholder-gray-500'
                          }`}
                      placeholder="Décrivez vos besoins, objectifs et contraintes..."
                    />
                  </div>
                </motion.div>
              )}

              {/* 🤖 ÉTAPES INTELLIGENCE ARTIFICIELLE */}
              
              {/* Étape 2 IA: Infos de base */}
              {step === 2 && formData.serviceType === 'Intelligence Artificielle' && (
                <motion.div
                  key="ai-step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4 sm:space-y-6"
                >
                  <div>
                    <h3 className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2 transition-colors duration-500 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      <User size={24} className="text-[#3F8391]" />
                      🧑‍💼 Infos de base
                    </h3>
                    
                    <div className="space-y-3 sm:space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={`block font-medium mb-2 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                            Prénom *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border focus:border-[#3F8391] focus:outline-none text-sm sm:text-base transition-all duration-300 ${
                              isDarkMode 
                                ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                                : 'bg-white/80 border-gray-300/40 text-gray-900 placeholder-gray-500'
                            }`}
                            placeholder="Votre prénom"
                          />
                        </div>
                        <div>
                          <label className={`block font-medium mb-2 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                            Nom *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border focus:border-[#3F8391] focus:outline-none text-sm sm:text-base transition-all duration-300 ${
                              isDarkMode 
                                ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                                : 'bg-white/80 border-gray-300/40 text-gray-900 placeholder-gray-500'
                            }`}
                            placeholder="Votre nom"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className={`block font-medium mb-2 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          Email professionnel *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border focus:border-[#3F8391] focus:outline-none text-sm sm:text-base transition-all duration-300 ${
                              isDarkMode 
                                ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                                : 'bg-white/80 border-gray-300/40 text-gray-900 placeholder-gray-500'
                            }`}
                          placeholder="votre@email.com"
                        />
                      </div>
                      
                      <div>
                        <label className={`block font-medium mb-2 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          Entreprise (facultatif)
                        </label>
                        <input
                          type="text"
                          value={formData.companyName}
                          onChange={(e) => handleInputChange('companyName', e.target.value)}
                          className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border focus:border-[#3F8391] focus:outline-none text-sm sm:text-base transition-all duration-300 ${
                              isDarkMode 
                                ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                                : 'bg-white/80 border-gray-300/40 text-gray-900 placeholder-gray-500'
                            }`}
                          placeholder="Nom de votre entreprise"
                        />
                      </div>
                      
                      <div>
                        <label className={`block font-medium mb-2 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          Secteur d'activité
                        </label>
                        <input
                          type="text"
                          value={formData.businessSector}
                          onChange={(e) => handleInputChange('businessSector', e.target.value)}
                          className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border focus:border-[#3F8391] focus:outline-none text-sm sm:text-base transition-all duration-300 ${
                              isDarkMode 
                                ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                                : 'bg-white/80 border-gray-300/40 text-gray-900 placeholder-gray-500'
                            }`}
                          placeholder="Ex: E-commerce, Santé, Finance..."
                        />
                      </div>
                      
                      <div>
                        <label className={`block font-medium mb-2 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          Décrivez brièvement votre besoin en IA (en une phrase) *
                        </label>
                        <textarea
                          required
                          value={formData.aiNeedDescription}
                          onChange={(e) => handleInputChange('aiNeedDescription', e.target.value)}
                          className={`w-full h-20 sm:h-24 px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border focus:border-[#3F8391] focus:outline-none resize-none text-sm sm:text-base transition-all duration-300 ${
                              isDarkMode 
                                ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                                : 'bg-white/80 border-gray-300/40 text-gray-900 placeholder-gray-500'
                            }`}
                          placeholder="Ex: Automatiser le tri de mes emails clients par priorité..."
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Étape 3 IA: Objectif du projet */}
              {step === 3 && formData.serviceType === 'Intelligence Artificielle' && (
                <motion.div
                  key="ai-step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4 sm:space-y-6"
                >
                  <div>
                    <h3 className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2 transition-colors duration-500 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      <Target size={24} className="text-[#3F8391]" />
                      🎯 Objectif du projet
                    </h3>
                    
                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <label className={`block font-medium mb-3 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          Quel est le but principal de votre projet ? (Choix multiple)
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            'Créer un chatbot (SAV, FAQ, assistant…)',
                            'Automatiser une tâche répétitive',
                            'Prédire un comportement / résultat',
                            'Analyser / exploiter de la donnée',
                            'Concevoir un modèle sur-mesure',
                            'Autre'
                          ].map((goal) => (
                            <motion.button
                              key={goal}
                              type="button"
                              onClick={() => handleArrayChange('aiProjectGoals', goal)}
                              style={{
                                padding: '12px',
                                borderRadius: '12px',
                                border: formData.aiProjectGoals.includes(goal)
                                  ? `2px solid #3F8391`
                                  : isDarkMode 
                                    ? '1px solid rgba(255, 255, 255, 0.2)' 
                                    : '1px solid rgba(156, 163, 175, 0.4)',
                                textAlign: 'left',
                                transition: 'all 0.3s ease',
                                backgroundColor: formData.aiProjectGoals.includes(goal)
                                  ? isDarkMode ? 'rgba(63, 131, 145, 0.4)' : '#3F8391'
                                  : isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.7)',
                                color: formData.aiProjectGoals.includes(goal)
                                  ? isDarkMode ? '#ffffff' : '#f3f4f6'
                                  : isDarkMode ? '#d1d5db' : '#374151',
                                cursor: 'pointer',
                                boxShadow: formData.aiProjectGoals.includes(goal)
                                  ? '0 25px 50px -12px rgba(63, 131, 145, 0.5)'
                                  : 'none'
                              }}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{
                                  width: '16px',
                                  height: '16px',
                                  borderRadius: '4px',
                                  border: formData.aiProjectGoals.includes(goal)
                                    ? '2px solid #3F8391'
                                    : '2px solid rgba(255, 255, 255, 0.4)',
                                  backgroundColor: formData.aiProjectGoals.includes(goal) ? '#3F8391' : 'transparent'
                                }}>
                                  {formData.aiProjectGoals.includes(goal) && (
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                      <div style={{ width: '6px', height: '6px', backgroundColor: 'white', borderRadius: '50%' }} />
                                    </div>
                                  )}
                                </div>
                                <span style={{ fontSize: '14px' }}>{goal}</span>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                      
                      {formData.aiProjectGoals.includes('Autre') && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <label className={`block font-medium mb-2 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                            Précisez votre objectif :
                          </label>
                          <input
                            type="text"
                            value={formData.aiCustomGoal}
                            onChange={(e) => handleInputChange('aiCustomGoal', e.target.value)}
                            className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border focus:border-[#3F8391] focus:outline-none text-sm sm:text-base transition-all duration-300 ${
                              isDarkMode 
                                ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                                : 'bg-white/80 border-gray-300/40 text-gray-900 placeholder-gray-500'
                            }`}
                            placeholder="Décrivez votre objectif spécifique..."
                          />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Étape 4 IA: Données disponibles */}
              {step === 4 && formData.serviceType === 'Intelligence Artificielle' && (
                <motion.div
                  key="ai-step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4 sm:space-y-6"
                >
                  <div>
                    <h3 className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2 transition-colors duration-500 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      <Database size={24} className="text-[#3F8391]" />
                      📊 Données disponibles
                    </h3>
                    
                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <label className={`block font-medium mb-3 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          Avez-vous déjà des données exploitables ?
                        </label>
                        <div className="flex gap-4">
                          {['Oui', 'Non', 'En cours'].map((value) => (
                            <motion.button
                              key={value}
                              type="button"
                              onClick={() => handleInputChange('hasDataAvailable', value)}
                              style={{
                                padding: '12px 24px',
                                borderRadius: '12px',
                                border: formData.hasDataAvailable === value
                                  ? `2px solid #3F8391`
                                  : isDarkMode 
                                    ? '1px solid rgba(255, 255, 255, 0.2)' 
                                    : '1px solid rgba(156, 163, 175, 0.4)',
                                textAlign: 'center',
                                transition: 'all 0.3s ease',
                                backgroundColor: formData.hasDataAvailable === value
                                  ? isDarkMode ? 'rgba(63, 131, 145, 0.4)' : '#3F8391'
                                  : isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.7)',
                                color: formData.hasDataAvailable === value
                                  ? isDarkMode ? '#ffffff' : '#f3f4f6'
                                  : isDarkMode ? '#d1d5db' : '#374151',
                                cursor: 'pointer',
                                boxShadow: formData.hasDataAvailable === value
                                  ? '0 25px 50px -12px rgba(63, 131, 145, 0.5)'
                                  : 'none'
                              }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {value}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className={`block font-medium mb-3 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          Quel type de données ? (Choix multiple)
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            'Textes',
                            'Images',
                            'Données tabulaires (Excel, CSV)',
                            'Vidéos',
                            'Audio',
                            'Autre'
                          ].map((dataType) => (
                            <motion.button
                              key={dataType}
                              type="button"
                              onClick={() => handleArrayChange('dataTypes', dataType)}
                              className={`p-3 rounded-xl border text-left transition-all duration-300 ${
                                formData.dataTypes.includes(dataType)
                                  ? `border-[#3F8391] ${isDarkMode ? 'bg-[#3F8391]/40 text-white' : 'bg-[#3F8391] text-gray-100'} shadow-xl shadow-[#3F8391]/50 scale-105 ring-2 ring-[#3F8391]/60`
                                  : `${isDarkMode ? 'border-white/20 bg-white/5 text-gray-300 hover:border-white/40' : 'border-gray-300/40 bg-white/70 text-gray-800 hover:border-gray-400/60 hover:bg-white/90 hover:text-gray-900'}`
                              }`}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                            >
                              <div className="flex items-center gap-2">
                                <div className={`w-4 h-4 rounded border-2 ${
                                  formData.dataTypes.includes(dataType)
                                    ? 'bg-[#3F8391] border-[#3F8391]'
                                    : 'border-white/40'
                                }`}>
                                  {formData.dataTypes.includes(dataType) && (
                                    <div className="w-full h-full flex items-center justify-center">
                                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                    </div>
                                  )}
                                </div>
                                <span className="text-sm">{dataType}</span>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className={`block font-medium mb-3 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          Volume estimé :
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            'Moins de 1 000 lignes',
                            '1k–100k',
                            '+100k',
                            'Je ne sais pas'
                          ].map((volume) => (
                            <motion.button
                              key={volume}
                              type="button"
                              onClick={() => handleInputChange('dataVolume', volume)}
                              className={`p-3 rounded-xl border text-center transition-all duration-300 ${
                                formData.dataVolume === volume
                                  ? `border-[#3F8391] ${isDarkMode ? 'bg-[#3F8391]/40 text-white' : 'bg-[#3F8391] text-gray-100'} shadow-xl shadow-[#3F8391]/50 scale-105 ring-2 ring-[#3F8391]/60`
                                  : `${isDarkMode ? 'border-white/20 bg-white/5 text-gray-300 hover:border-white/40' : 'border-gray-300/40 bg-white/70 text-gray-800 hover:border-gray-400/60 hover:bg-white/90 hover:text-gray-900'}`
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="flex items-center justify-center gap-3">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  formData.dataVolume === volume
                                    ? 'bg-[#3F8391] border-[#3F8391]'
                                    : 'border-white/40'
                                }`}>
                                  {formData.dataVolume === volume && (
                                    <div className="w-2 h-2 bg-white rounded-full" />
                                  )}
                                </div>
                                <span className="text-sm">{volume}</span>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Étape 5 IA: Fonctionnalités souhaitées */}
              {step === 5 && formData.serviceType === 'Intelligence Artificielle' && (
                <motion.div
                  key="ai-step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4 sm:space-y-6"
                >
                  <div>
                    <h3 className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2 transition-colors duration-500 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      <Settings size={24} className="text-[#3F8391]" />
                      ⚙️ Fonctionnalités souhaitées
                    </h3>
                    
                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <label className={`block font-medium mb-3 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          Que souhaitez-vous pour votre projet ? (Choix multiple selon projet)
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            'Intégration à un site / app',
                            'Interface simple d\'administration',
                            'Connexion API externe',
                            'Dashboard de suivi',
                            'Fichier ou rapport exportable',
                            'Entraînement d\'un modèle IA custom',
                            'Déploiement dans le cloud',
                            'Autre'
                          ].map((feature) => (
                            <motion.button
                              key={feature}
                              type="button"
                              onClick={() => handleArrayChange('aiDesiredFeatures', feature)}
                              style={{
                                padding: '12px',
                                borderRadius: '12px',
                                border: formData.aiDesiredFeatures.includes(feature)
                                  ? `2px solid #3F8391`
                                  : isDarkMode 
                                    ? '1px solid rgba(255, 255, 255, 0.2)' 
                                    : '1px solid rgba(156, 163, 175, 0.4)',
                                textAlign: 'left',
                                transition: 'all 0.3s ease',
                                backgroundColor: formData.aiDesiredFeatures.includes(feature)
                                  ? isDarkMode ? 'rgba(63, 131, 145, 0.4)' : '#3F8391'
                                  : isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.7)',
                                color: formData.aiDesiredFeatures.includes(feature)
                                  ? isDarkMode ? '#ffffff' : '#f3f4f6'
                                  : isDarkMode ? '#d1d5db' : '#374151',
                                cursor: 'pointer',
                                boxShadow: formData.aiDesiredFeatures.includes(feature)
                                  ? '0 25px 50px -12px rgba(63, 131, 145, 0.5)'
                                  : 'none'
                              }}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{
                                  width: '16px',
                                  height: '16px',
                                  borderRadius: '4px',
                                  border: formData.aiDesiredFeatures.includes(feature)
                                    ? '2px solid #3F8391'
                                    : '2px solid rgba(255, 255, 255, 0.4)',
                                  backgroundColor: formData.aiDesiredFeatures.includes(feature) ? '#3F8391' : 'transparent'
                                }}>
                                  {formData.aiDesiredFeatures.includes(feature) && (
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                      <div style={{ width: '6px', height: '6px', backgroundColor: 'white', borderRadius: '50%' }} />
                                    </div>
                                  )}
                                </div>
                                <span style={{ fontSize: '14px' }}>{feature}</span>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Étape 6 IA: Délai et budget */}
              {step === 6 && formData.serviceType === 'Intelligence Artificielle' && (
                <motion.div
                  key="ai-step6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4 sm:space-y-6"
                >
                  <div>
                    <h3 className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2 transition-colors duration-500 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      <Clock size={24} className="text-[#3F8391]" />
                      ⏰ Délai et budget
                    </h3>
                    
                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <label className={`block font-medium mb-3 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          Quand souhaitez-vous démarrer le projet ?
                        </label>
                        <div className="flex gap-4">
                          {['Dès que possible', 'Dans un mois', 'Flexible'].map((timeline) => (
                            <motion.button
                              key={timeline}
                              type="button"
                              onClick={() => handleInputChange('projectStartTimeline', timeline)}
                              className={`px-6 py-3 rounded-xl border transition-all duration-300 ${
                                formData.projectStartTimeline === timeline
                                  ? `border-[#3F8391] ${isDarkMode ? 'bg-[#3F8391]/40 text-white' : 'bg-[#3F8391] text-gray-100'} shadow-xl shadow-[#3F8391]/50 scale-105 ring-2 ring-[#3F8391]/60`
                                  : `${isDarkMode ? 'border-white/20 bg-white/5 text-gray-300 hover:border-white/40' : 'border-gray-300/40 bg-white/70 text-gray-800 hover:border-gray-400/60 hover:bg-white/90 hover:text-gray-900'}`
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {timeline}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className={`block font-medium mb-3 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          Budget prévu (fourchette)
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            'Moins de 1000€',
                            '1000–3000€',
                            '3000–7000€',
                            '+7000€',
                            'À discuter'
                          ].map((budget) => (
                            <motion.button
                              key={budget}
                              type="button"
                              onClick={() => handleInputChange('aiBudgetRange', budget)}
                              style={{
                                padding: '12px',
                                borderRadius: '12px',
                                border: formData.aiBudgetRange === budget
                                  ? `2px solid #3F8391`
                                  : isDarkMode 
                                    ? '1px solid rgba(255, 255, 255, 0.2)' 
                                    : '1px solid rgba(156, 163, 175, 0.4)',
                                textAlign: 'center',
                                transition: 'all 0.3s ease',
                                backgroundColor: formData.aiBudgetRange === budget
                                  ? isDarkMode ? 'rgba(63, 131, 145, 0.4)' : '#3F8391'
                                  : isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.7)',
                                color: formData.aiBudgetRange === budget
                                  ? isDarkMode ? '#ffffff' : '#f3f4f6'
                                  : isDarkMode ? '#d1d5db' : '#374151',
                                cursor: 'pointer',
                                boxShadow: formData.aiBudgetRange === budget
                                  ? '0 25px 50px -12px rgba(63, 131, 145, 0.5)'
                                  : 'none'
                              }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                                <div style={{
                                  width: '20px',
                                  height: '20px',
                                  borderRadius: '50%',
                                  border: formData.aiBudgetRange === budget
                                    ? '2px solid #3F8391'
                                    : '2px solid rgba(255, 255, 255, 0.4)',
                                  backgroundColor: formData.aiBudgetRange === budget ? '#3F8391' : 'transparent',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}>
                                  {formData.aiBudgetRange === budget && (
                                    <div style={{ width: '8px', height: '8px', backgroundColor: 'white', borderRadius: '50%' }} />
                                  )}
                                </div>
                                <span style={{ fontSize: '14px' }}>{budget}</span>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Étape 7 IA: Complément */}
              {step === 7 && formData.serviceType === 'Intelligence Artificielle' && (
                <motion.div
                  key="ai-step7"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4 sm:space-y-6"
                >
                  <div>
                    <h3 className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2 transition-colors duration-500 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      <MessageSquare size={24} className="text-[#3F8391]" />
                      📝 Complément
                    </h3>
                    
                    <div className="space-y-4 sm:space-y-6">
                      <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                        <label className={`block font-medium mb-3 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          Souhaitez-vous être accompagné techniquement ou stratégiquement ?
                        </label>
                        <div className="flex gap-4">
                          {['Oui', 'Non', 'Les deux'].map((support) => (
                            <motion.button
                              key={support}
                              type="button"
                              onClick={() => handleInputChange('needTechnicalSupport', support)}
                              className={`px-6 py-3 rounded-xl border transition-all duration-300 ${
                                formData.needTechnicalSupport === support
                                  ? `border-[#3F8391] ${isDarkMode ? 'bg-[#3F8391]/40 text-white' : 'bg-[#3F8391] text-gray-100'} shadow-xl shadow-[#3F8391]/50 scale-105 ring-2 ring-[#3F8391]/60`
                                  : `${isDarkMode ? 'border-white/20 bg-white/5 text-gray-300 hover:border-white/40' : 'border-gray-300/40 bg-white/70 text-gray-800 hover:border-gray-400/60 hover:bg-white/90 hover:text-gray-900'}`
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {support}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                        <label className={`block font-medium mb-3 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          Souhaitez-vous une maintenance ou des évolutions après livraison ?
                        </label>
                        <div className="flex gap-4">
                          {['Oui', 'Non', 'À discuter'].map((maintenance) => (
                            <motion.button
                              key={maintenance}
                              type="button"
                              onClick={() => handleInputChange('needFutureMaintenance', maintenance)}
                              style={{
                                padding: '12px 24px',
                                borderRadius: '12px',
                                border: formData.needFutureMaintenance === maintenance
                                  ? `2px solid #3F8391`
                                  : isDarkMode 
                                    ? '1px solid rgba(255, 255, 255, 0.2)' 
                                    : '1px solid rgba(156, 163, 175, 0.4)',
                                textAlign: 'center',
                                transition: 'all 0.3s ease',
                                backgroundColor: formData.needFutureMaintenance === maintenance
                                  ? isDarkMode ? 'rgba(63, 131, 145, 0.4)' : '#3F8391'
                                  : isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.7)',
                                color: formData.needFutureMaintenance === maintenance
                                  ? isDarkMode ? '#ffffff' : '#f3f4f6'
                                  : isDarkMode ? '#d1d5db' : '#374151',
                                cursor: 'pointer',
                                boxShadow: formData.needFutureMaintenance === maintenance
                                  ? '0 25px 50px -12px rgba(63, 131, 145, 0.5)'
                                  : 'none'
                              }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {maintenance}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className={`block font-medium mb-3 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          Un dernier mot ou besoin spécifique ?
                        </label>
                        <textarea
                          value={formData.aiAdditionalNotes}
                          onChange={(e) => handleInputChange('aiAdditionalNotes', e.target.value)}
                          className={`w-full h-20 sm:h-24 px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border focus:border-[#3F8391] focus:outline-none resize-none text-sm sm:text-base transition-all duration-300 ${
                              isDarkMode 
                                ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                                : 'bg-white/80 border-gray-300/40 text-gray-900 placeholder-gray-500'
                            }`}
                          placeholder="Contraintes techniques, inspirations, délais spécifiques, budget détaillé, questions..."
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Étape 8 IA: Contact préféré */}
              {step === 8 && formData.serviceType === 'Intelligence Artificielle' && !isSuccessScreen && (
                <motion.div
                  key="ai-step8"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4 sm:space-y-6"
                >
                  <div>
                    <h3 className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2 transition-colors duration-500 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      <Phone size={24} className="text-[#3F8391]" />
                      Préférence de contact
                    </h3>
                    
                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <label className={`block font-medium mb-3 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          Comment souhaitez-vous être recontacté ? <span className="text-red-400">*</span>
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {[
                            { value: 'Email', icon: '📧', desc: 'Réponse sous 24h' },
                            { value: 'Téléphone', icon: '📞', desc: 'Appel direct' },
                            { value: 'Visio', icon: '💻', desc: 'Réunion en ligne' }
                          ].map((contact) => (
                            <motion.button
                              key={contact.value}
                              type="button"
                              onClick={() => handleInputChange('preferredContact', contact.value)}
                              className={`p-3 sm:p-4 rounded-xl border text-center transition-all duration-300 text-sm sm:text-base ${
                                formData.preferredContact === contact.value
                                  ? `border-[#3F8391] ${isDarkMode ? 'bg-[#3F8391]/40 text-white' : 'bg-[#3F8391] text-gray-100'} shadow-xl shadow-[#3F8391]/50 scale-105 ring-2 ring-[#3F8391]/60`
                                  : `${isDarkMode ? 'border-white/20 bg-white/5 text-gray-300 hover:border-white/40' : 'border-gray-300/40 bg-white/70 text-gray-800 hover:border-gray-400/60 hover:bg-white/90 hover:text-gray-900'}`
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
                        
                        {/* Message d'aide */}
                        {!formData.preferredContact && (
                          <div className="mt-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3">
                            <p className="text-yellow-200 text-sm flex items-center gap-2">
                              <span>💡</span>
                              <span>Sélectionnez votre mode de contact préféré pour continuer</span>
                            </p>
                          </div>
                        )}
                      </div>
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
                  className="space-y-4 sm:space-y-6"
                >
                  <div>
                    <h3 className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2 transition-colors duration-500 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      <Wrench size={24} className="text-[#3F8391]" />
                      Maintenance & Suivi
                    </h3>
                    
                    <div className="space-y-8">
                      <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                        <label className={`block font-medium mb-3 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          1. Souhaitez-vous une formation pour gérer votre site ?
                        </label>
                        <div className="flex flex-col sm:flex-row gap-3">
                          {[true, false].map((value) => (
                            <motion.button
                              key={value}
                              type="button"
                              onClick={() => handleInputChange('needTraining', value)}
                              style={{
                                padding: '16px',
                                borderRadius: '12px',
                                border: formData.needTraining === value
                                  ? `2px solid #3F8391`
                                  : isDarkMode 
                                    ? '1px solid rgba(255, 255, 255, 0.2)' 
                                    : '1px solid rgba(156, 163, 175, 0.4)',
                                textAlign: 'left',
                                transition: 'all 0.3s ease',
                                backgroundColor: formData.needTraining === value
                                  ? isDarkMode ? 'rgba(63, 131, 145, 0.4)' : '#3F8391'
                                  : isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.7)',
                                color: formData.needTraining === value
                                  ? isDarkMode ? '#ffffff' : '#f3f4f6'
                                  : isDarkMode ? '#d1d5db' : '#374151',
                                cursor: 'pointer',
                                boxShadow: formData.needTraining === value
                                  ? '0 25px 50px -12px rgba(63, 131, 145, 0.5)'
                                  : 'none'
                              }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                  width: '20px',
                                  height: '20px',
                                  borderRadius: '50%',
                                  border: formData.needTraining === value
                                    ? '2px solid #3F8391'
                                    : '2px solid rgba(255, 255, 255, 0.4)',
                                  backgroundColor: formData.needTraining === value ? '#3F8391' : 'transparent',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}>
                                  {formData.needTraining === value && (
                                    <div style={{ width: '8px', height: '8px', backgroundColor: 'white', borderRadius: '50%' }} />
                                  )}
                                </div>
                                <span style={{ fontSize: '14px' }}>
                                  {value ? 'Oui, j\'ai besoin d\'une formation' : 'Non, je maîtrise déjà'}
                                </span>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                        <label className={`block font-medium mb-3 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          2. Souhaitez-vous que je m'occupe de la maintenance après livraison ?
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {['Oui', 'Non', 'À discuter'].map((option) => (
                            <motion.button
                              key={option}
                              type="button"
                              onClick={() => handleInputChange('needMaintenance', option)}
                              style={{
                                padding: '12px',
                                borderRadius: '12px',
                                border: formData.needMaintenance === option
                                  ? `2px solid #3F8391`
                                  : isDarkMode 
                                    ? '1px solid rgba(255, 255, 255, 0.2)' 
                                    : '1px solid rgba(156, 163, 175, 0.4)',
                                textAlign: 'left',
                                transition: 'all 0.3s ease',
                                backgroundColor: formData.needMaintenance === option
                                  ? isDarkMode ? 'rgba(63, 131, 145, 0.4)' : '#3F8391'
                                  : isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.7)',
                                color: formData.needMaintenance === option
                                  ? isDarkMode ? '#ffffff' : '#f3f4f6'
                                  : isDarkMode ? '#d1d5db' : '#374151',
                                cursor: 'pointer',
                                boxShadow: formData.needMaintenance === option
                                  ? '0 25px 50px -12px rgba(63, 131, 145, 0.5)'
                                  : 'none'
                              }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                  width: '20px',
                                  height: '20px',
                                  borderRadius: '50%',
                                  border: formData.needMaintenance === option
                                    ? '2px solid #3F8391'
                                    : '2px solid rgba(255, 255, 255, 0.4)',
                                  backgroundColor: formData.needMaintenance === option ? '#3F8391' : 'transparent',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}>
                                  {formData.needMaintenance === option && (
                                    <div style={{ width: '8px', height: '8px', backgroundColor: 'white', borderRadius: '50%' }} />
                                  )}
                                </div>
                                <span style={{ fontSize: '14px' }}>{option}</span>
                              </div>
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
                  className="space-y-4 sm:space-y-6"
                >
                  <div>
                    <h3 className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2 transition-colors duration-500 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      <MessageSquare size={24} className="text-[#3F8391]" />
                      Autres besoins ou remarques
                    </h3>
                    
                    <div>
                      <label className={`block font-medium mb-3 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                        Y a-t-il autre chose que je devrais savoir ?
                      </label>
                      <textarea
                        value={formData.additionalNotes}
                        onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                        className={`w-full h-32 px-4 py-3 rounded-2xl border focus:border-[#3F8391] focus:outline-none resize-none transition-all duration-300 ${
                            isDarkMode 
                              ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                              : 'bg-white/80 border-gray-300/40 text-gray-900 placeholder-gray-500'
                          }`}
                        placeholder="Contraintes techniques, préférences de design, inspirations, délais spécifiques, budget détaillé..."
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Étape 9: Contact préféré */}
              {((step === 9 && formData.desiredFeatures.includes('Boutique e-commerce')) || (step === 8 && !formData.desiredFeatures.includes('Boutique e-commerce'))) && formData.serviceType === 'Développement Web' && !isSuccessScreen && (
                <motion.div
                  key={`step${step}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4 sm:space-y-6"
                >
                  <div>
                    <h3 className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2 transition-colors duration-500 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      <Phone size={24} className="text-[#3F8391]" />
                      Préférence de contact
                    </h3>
                    
                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <label className={`block font-medium mb-3 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          Comment souhaitez-vous être contacté : <span className="text-red-400">*</span>
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {[
                            { value: 'Email', icon: '📧', desc: 'Réponse sous 24h' },
                            { value: 'Téléphone', icon: '📞', desc: 'Appel direct' },
                            { value: 'Visio', icon: '💻', desc: 'Réunion en ligne' }
                          ].map((contact) => (
                            <motion.button
                              key={contact.value}
                              type="button"
                              onClick={() => handleInputChange('preferredContact', contact.value)}
                              className={`p-3 sm:p-4 rounded-xl border text-center transition-all duration-300 text-sm sm:text-base ${
                                formData.preferredContact === contact.value
                                  ? `border-[#3F8391] ${isDarkMode ? 'bg-[#3F8391]/40 text-white' : 'bg-[#3F8391] text-gray-100'} shadow-xl shadow-[#3F8391]/50 scale-105 ring-2 ring-[#3F8391]/60`
                                  : `${isDarkMode ? 'border-white/20 bg-white/5 text-gray-300 hover:border-white/40' : 'border-gray-300/40 bg-white/70 text-gray-800 hover:border-gray-400/60 hover:bg-white/90 hover:text-gray-900'}`
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
                        
                        {/* Message d'aide */}
                        {!formData.preferredContact && (
                          <div className="mt-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3">
                            <p className="text-yellow-200 text-sm flex items-center gap-2">
                              <span>💡</span>
                              <span>Sélectionnez votre mode de contact préféré pour continuer</span>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 🚀 ÉTAPES GROWTH MARKETING */}
              
              {/* Étape 2 Growth: Infos de base */}
              {step === 2 && formData.serviceType === 'Growth Marketing' && (
                <motion.div
                  key="growth-step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4 sm:space-y-6"
                >
                  <div>
                    <h3 className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2 transition-colors duration-500 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      <User size={24} className="text-[#3F8391]" />
                      🧑‍💼 Infos de base
                    </h3>
                    
                    <div className="space-y-3 sm:space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={`block font-medium mb-2 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                            Prénom *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border focus:border-[#3F8391] focus:outline-none text-sm sm:text-base transition-all duration-300 ${
                              isDarkMode 
                                ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                                : 'bg-white/80 border-gray-300/40 text-gray-900 placeholder-gray-500'
                            }`}
                            placeholder="Votre prénom"
                          />
                        </div>
                        <div>
                          <label className={`block font-medium mb-2 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                            Nom *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border focus:border-[#3F8391] focus:outline-none text-sm sm:text-base transition-all duration-300 ${
                              isDarkMode 
                                ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                                : 'bg-white/80 border-gray-300/40 text-gray-900 placeholder-gray-500'
                            }`}
                            placeholder="Votre nom"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className={`block font-medium mb-2 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          Email professionnel *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border focus:border-[#3F8391] focus:outline-none text-sm sm:text-base transition-all duration-300 ${
                              isDarkMode 
                                ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                                : 'bg-white/80 border-gray-300/40 text-gray-900 placeholder-gray-500'
                            }`}
                          placeholder="votre.email@entreprise.com"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={`block font-medium mb-2 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                            Nom de l'entreprise
                          </label>
                          <input
                            type="text"
                            value={formData.companyName}
                            onChange={(e) => handleInputChange('companyName', e.target.value)}
                            className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border focus:border-[#3F8391] focus:outline-none text-sm sm:text-base transition-all duration-300 ${
                              isDarkMode 
                                ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                                : 'bg-white/80 border-gray-300/40 text-gray-900 placeholder-gray-500'
                            }`}
                            placeholder="Nom de votre entreprise"
                          />
                        </div>
                        <div>
                          <label className={`block font-medium mb-2 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                            Secteur d'activité
                          </label>
                          <input
                            type="text"
                            value={formData.businessSector}
                            onChange={(e) => handleInputChange('businessSector', e.target.value)}
                            className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border focus:border-[#3F8391] focus:outline-none text-sm sm:text-base transition-all duration-300 ${
                              isDarkMode 
                                ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                                : 'bg-white/80 border-gray-300/40 text-gray-900 placeholder-gray-500'
                            }`}
                            placeholder="Ex: E-commerce, SaaS, Services..."
                          />
                        </div>
                      </div>

                      <div>
                        <label className={`block font-medium mb-3 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          Avez-vous un site ou une landing page ? *
                        </label>
                        <div className="flex gap-4">
                          {['Oui', 'Non'].map((option) => (
                            <motion.button
                              key={option}
                              type="button"
                              onClick={() => handleInputChange('hasExistingWebsite', option)}
                              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl border transition-colors text-sm sm:text-base ${
                                formData.hasExistingWebsite === option
                                  ? `border-[#3F8391] ${isDarkMode ? 'bg-[#3F8391]/40 text-white' : 'bg-[#3F8391] text-gray-100'} shadow-xl shadow-[#3F8391]/50 scale-105 ring-2 ring-[#3F8391]/60`
                                  : `${isDarkMode ? 'border-white/20 bg-white/5 text-gray-300 hover:border-white/40' : 'border-gray-300/40 bg-white/70 text-gray-800 hover:border-gray-400/60 hover:bg-white/90 hover:text-gray-900'}`
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {option}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {formData.hasExistingWebsite === 'Oui' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <label className={`block font-medium mb-2 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                            Lien vers votre site
                          </label>
                          <input
                            type="url"
                            value={formData.existingWebsiteUrl}
                            onChange={(e) => handleInputChange('existingWebsiteUrl', e.target.value)}
                            className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border focus:border-[#3F8391] focus:outline-none text-sm sm:text-base transition-all duration-300 ${
                              isDarkMode 
                                ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                                : 'bg-white/80 border-gray-300/40 text-gray-900 placeholder-gray-500'
                            }`}
                            placeholder="https://votre-site.com"
                          />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Étape 3 Growth: Objectif de la mission */}
              {step === 3 && formData.serviceType === 'Growth Marketing' && (
                <motion.div
                  key="growth-step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4 sm:space-y-6"
                >
                  <div>
                    <h3 className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2 transition-colors duration-500 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      <Target size={24} className="text-[#3F8391]" />
                      🎯 Objectif de la mission
                    </h3>
                    
                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <label className={`block font-medium mb-3 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          Quel est votre besoin principal ? (Choix multiple)
                        </label>
                        <div className="grid grid-cols-1 gap-3">
                          {[
                            'Générer des leads qualifiés',
                            'Lancer une campagne marketing ciblée',
                            'Créer une stratégie digitale complète',
                            'Automatiser des process de prospection',
                            'Mieux comprendre vos clients (data / analytics)',
                            'Autre'
                          ].map((goal) => (
                            <motion.button
                              key={goal}
                              type="button"
                              onClick={() => {
                                const currentGoals = [...formData.growthMainGoals];
                                const goalIndex = currentGoals.indexOf(goal);
                                if (goalIndex > -1) {
                                  currentGoals.splice(goalIndex, 1);
                                } else {
                                  currentGoals.push(goal);
                                }
                                handleInputChange('growthMainGoals', currentGoals);
                              }}
                              style={{
                                padding: window.innerWidth >= 640 ? '16px' : '12px',
                                borderRadius: '12px',
                                border: formData.growthMainGoals.includes(goal)
                                  ? `2px solid #3F8391`
                                  : isDarkMode 
                                    ? '1px solid rgba(255, 255, 255, 0.2)' 
                                    : '1px solid rgba(156, 163, 175, 0.4)',
                                textAlign: 'left',
                                transition: 'all 0.3s ease',
                                backgroundColor: formData.growthMainGoals.includes(goal)
                                  ? isDarkMode ? 'rgba(63, 131, 145, 0.4)' : '#3F8391'
                                  : isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.7)',
                                color: formData.growthMainGoals.includes(goal)
                                  ? isDarkMode ? '#ffffff' : '#f3f4f6'
                                  : isDarkMode ? '#d1d5db' : '#374151',
                                cursor: 'pointer',
                                boxShadow: formData.growthMainGoals.includes(goal)
                                  ? '0 25px 50px -12px rgba(63, 131, 145, 0.5)'
                                  : 'none',
                                fontSize: window.innerWidth >= 640 ? '16px' : '14px'
                              }}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span>{goal}</span>
                                {formData.growthMainGoals.includes(goal) && (
                                  <CheckCircle size={20} style={{ color: '#4ade80', filter: 'drop-shadow(0 4px 3px rgba(0, 0, 0, 0.07))' }} />
                                )}
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {formData.growthMainGoals.includes('Autre') && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <label className={`block font-medium mb-2 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                            Précisez votre besoin spécifique
                          </label>
                          <textarea
                            value={formData.growthCustomGoal}
                            onChange={(e) => handleInputChange('growthCustomGoal', e.target.value)}
                            className={`w-full h-20 sm:h-24 px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border focus:border-[#3F8391] focus:outline-none resize-none text-sm sm:text-base transition-all duration-300 ${
                              isDarkMode 
                                ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                                : 'bg-white/80 border-gray-300/40 text-gray-900 placeholder-gray-500'
                            }`}
                            placeholder="Décrivez votre objectif spécifique..."
                          />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Étape 4 Growth: Services souhaités */}
              {step === 4 && formData.serviceType === 'Growth Marketing' && (
                <motion.div
                  key="growth-step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4 sm:space-y-6"
                >
                  <div>
                    <h3 className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2 transition-colors duration-500 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      <Settings size={24} className="text-[#3F8391]" />
                      🛠️ Services souhaités
                    </h3>
                    
                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <label className={`block font-medium mb-3 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          Sélectionnez les services qui vous intéressent (Choix multiple)
                        </label>
                        <div className="grid grid-cols-1 gap-3">
                          {[
                            'Scrapping de données (emails, LinkedIn, annuaires…)',
                            'Génération automatisée de leads',
                            'Campagne de cold email / LinkedIn automatisée',
                            'Création de funnels marketing',
                            'Automatisation (Zapier, Make, PhantomBuster, etc.)',
                            'Étude de marché & veille concurrentielle',
                            'Mapping du marché ou de la cible',
                            'Stratégie globale de communication',
                            'Audit marketing ou data analytics',
                            'Autre besoin spécifique'
                          ].map((service) => (
                            <motion.button
                              key={service}
                              type="button"
                              onClick={() => {
                                const currentServices = [...formData.growthDesiredServices];
                                const serviceIndex = currentServices.indexOf(service);
                                if (serviceIndex > -1) {
                                  currentServices.splice(serviceIndex, 1);
                                } else {
                                  currentServices.push(service);
                                }
                                handleInputChange('growthDesiredServices', currentServices);
                              }}
                              style={{
                                padding: window.innerWidth >= 640 ? '16px' : '12px',
                                borderRadius: '12px',
                                border: formData.growthDesiredServices.includes(service)
                                  ? `2px solid #3F8391`
                                  : isDarkMode 
                                    ? '1px solid rgba(255, 255, 255, 0.2)' 
                                    : '1px solid rgba(156, 163, 175, 0.4)',
                                textAlign: 'left',
                                transition: 'all 0.3s ease',
                                backgroundColor: formData.growthDesiredServices.includes(service)
                                  ? isDarkMode ? 'rgba(63, 131, 145, 0.4)' : '#3F8391'
                                  : isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.7)',
                                color: formData.growthDesiredServices.includes(service)
                                  ? isDarkMode ? '#ffffff' : '#f3f4f6'
                                  : isDarkMode ? '#d1d5db' : '#374151',
                                cursor: 'pointer',
                                boxShadow: formData.growthDesiredServices.includes(service)
                                  ? '0 25px 50px -12px rgba(63, 131, 145, 0.5)'
                                  : 'none',
                                fontSize: window.innerWidth >= 640 ? '16px' : '14px'
                              }}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '14px' }}>{service}</span>
                                {formData.growthDesiredServices.includes(service) && (
                                  <CheckCircle size={20} style={{ color: '#4ade80', filter: 'drop-shadow(0 4px 3px rgba(0, 0, 0, 0.07))' }} />
                                )}
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {formData.growthDesiredServices.includes('Autre besoin spécifique') && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <label className={`block font-medium mb-2 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                            Précisez votre besoin spécifique
                          </label>
                          <textarea
                            value={formData.growthCustomService}
                            onChange={(e) => handleInputChange('growthCustomService', e.target.value)}
                            className={`w-full h-20 sm:h-24 px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border focus:border-[#3F8391] focus:outline-none resize-none text-sm sm:text-base transition-all duration-300 ${
                              isDarkMode 
                                ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                                : 'bg-white/80 border-gray-300/40 text-gray-900 placeholder-gray-500'
                            }`}
                            placeholder="Décrivez le service dont vous avez besoin..."
                          />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Étape 5 Growth: Ciblage & données */}
              {step === 5 && formData.serviceType === 'Growth Marketing' && (
                <motion.div
                  key="growth-step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4 sm:space-y-6"
                >
                  <div>
                    <h3 className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2 transition-colors duration-500 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      <Database size={24} className="text-[#3F8391]" />
                      🎯 Ciblage & données
                    </h3>
                    
                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <label className={`block font-medium mb-2 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          Qui est votre cible idéale ?
                        </label>
                        <textarea
                          value={formData.targetAudience}
                          onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                          className={`w-full h-24 sm:h-28 px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border focus:border-[#3F8391] focus:outline-none resize-none text-sm sm:text-base transition-all duration-300 ${
                              isDarkMode 
                                ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                                : 'bg-white/80 border-gray-300/40 text-gray-900 placeholder-gray-500'
                            }`}
                          placeholder="Ex: PME françaises de 10-50 salariés dans le secteur technologique, dirigeants d'entreprise B2B, particuliers intéressés par le sport..."
                        />
                      </div>

                      <div>
                        <label className={`block font-medium mb-3 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          Avez-vous une base de données existante ?
                        </label>
                        <div className="flex gap-4">
                          {['Oui', 'Non'].map((option) => (
                            <motion.button
                              key={option}
                              type="button"
                              onClick={() => handleInputChange('hasExistingDatabase', option)}
                              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl border transition-colors text-sm sm:text-base ${
                                formData.hasExistingDatabase === option
                                  ? `border-[#3F8391] ${isDarkMode ? 'bg-[#3F8391]/40 text-white' : 'bg-[#3F8391] text-gray-100'} shadow-xl shadow-[#3F8391]/50 scale-105 ring-2 ring-[#3F8391]/60`
                                  : `${isDarkMode ? 'border-white/20 bg-white/5 text-gray-300 hover:border-white/40' : 'border-gray-300/40 bg-white/70 text-gray-800 hover:border-gray-400/60 hover:bg-white/90 hover:text-gray-900'}`
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {option}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className={`block font-medium mb-3 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          Souhaitez-vous extraire vos leads d'une source spécifique ? (Choix multiple)
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                          {[
                            'LinkedIn',
                            'Google Maps',
                            'Instagram',
                            'Facebook',
                            'Annuaires pro',
                            'Sites web',
                            'Autres réseaux',
                            'Pas de préférence'
                          ].map((source) => (
                            <motion.button
                              key={source}
                              type="button"
                              onClick={() => {
                                const currentSources = [...formData.leadSources];
                                const sourceIndex = currentSources.indexOf(source);
                                if (sourceIndex > -1) {
                                  currentSources.splice(sourceIndex, 1);
                                } else {
                                  currentSources.push(source);
                                }
                                handleInputChange('leadSources', currentSources);
                              }}
                              className={`p-3 rounded-xl border text-center text-sm transition-all duration-300 ${
                                formData.leadSources.includes(source)
                                  ? `border-[#3F8391] ${isDarkMode ? 'bg-[#3F8391]/40 text-white' : 'bg-[#3F8391] text-gray-100'} shadow-xl shadow-[#3F8391]/50 scale-105 ring-2 ring-[#3F8391]/60`
                                  : `${isDarkMode ? 'border-white/20 bg-white/5 text-gray-300 hover:border-white/40' : 'border-gray-300/40 bg-white/70 text-gray-800 hover:border-gray-400/60 hover:bg-white/90 hover:text-gray-900'}`
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {source}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Étape 6 Growth: KPI & ambitions */}
              {step === 6 && formData.serviceType === 'Growth Marketing' && (
                <motion.div
                  key="growth-step6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4 sm:space-y-6"
                >
                  <div>
                    <h3 className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2 transition-colors duration-500 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      <BarChart3 size={24} className="text-[#3F8391]" />
                      📊 KPI & ambitions
                    </h3>
                    
                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <label className={`block font-medium mb-2 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          Quels sont vos objectifs ?
                        </label>
                        <textarea
                          value={formData.growthObjectives}
                          onChange={(e) => handleInputChange('growthObjectives', e.target.value)}
                          className={`w-full h-24 sm:h-28 px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border focus:border-[#3F8391] focus:outline-none resize-none text-sm sm:text-base transition-all duration-300 ${
                              isDarkMode 
                                ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                                : 'bg-white/80 border-gray-300/40 text-gray-900 placeholder-gray-500'
                            }`}
                          placeholder="Ex: 100 leads qualifiés/mois, 1000 emails envoyés/semaine, 15% de taux de conversion, augmenter CA de 30%, etc."
                        />
                      </div>

                      <div>
                        <label className={`block font-medium mb-3 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          Souhaitez-vous un reporting détaillé et automatisé ?
                        </label>
                        <div className="flex gap-4">
                          {['Oui', 'Non'].map((option) => (
                            <motion.button
                              key={option}
                              type="button"
                              onClick={() => handleInputChange('wantsDetailedReporting', option)}
                              style={{
                                padding: window.innerWidth >= 640 ? '12px 24px' : '8px 16px',
                                borderRadius: '12px',
                                border: formData.wantsDetailedReporting === option
                                  ? `2px solid #3F8391`
                                  : isDarkMode 
                                    ? '1px solid rgba(255, 255, 255, 0.2)' 
                                    : '1px solid rgba(156, 163, 175, 0.4)',
                                textAlign: 'center',
                                transition: 'all 0.3s ease',
                                backgroundColor: formData.wantsDetailedReporting === option
                                  ? isDarkMode ? 'rgba(63, 131, 145, 0.4)' : '#3F8391'
                                  : isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.7)',
                                color: formData.wantsDetailedReporting === option
                                  ? isDarkMode ? '#ffffff' : '#f3f4f6'
                                  : isDarkMode ? '#d1d5db' : '#374151',
                                cursor: 'pointer',
                                boxShadow: formData.wantsDetailedReporting === option
                                  ? '0 25px 50px -12px rgba(63, 131, 145, 0.5)'
                                  : 'none',
                                fontSize: window.innerWidth >= 640 ? '16px' : '14px'
                              }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {option}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className={`block font-medium mb-3 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          Avez-vous déjà testé des outils ou méthodes de growth ?
                        </label>
                        <div className="flex gap-4">
                          {['Oui', 'Non'].map((option) => (
                            <motion.button
                              key={option}
                              type="button"
                              onClick={() => handleInputChange('hasTestedGrowthTools', option)}
                              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl border transition-colors text-sm sm:text-base ${
                                formData.hasTestedGrowthTools === option
                                  ? `border-[#3F8391] ${isDarkMode ? 'bg-[#3F8391]/40 text-white' : 'bg-[#3F8391] text-gray-100'} shadow-xl shadow-[#3F8391]/50 scale-105 ring-2 ring-[#3F8391]/60`
                                  : `${isDarkMode ? 'border-white/20 bg-white/5 text-gray-300 hover:border-white/40' : 'border-gray-300/40 bg-white/70 text-gray-800 hover:border-gray-400/60 hover:bg-white/90 hover:text-gray-900'}`
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {option}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {formData.hasTestedGrowthTools === 'Oui' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <label className={`block font-medium mb-2 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                            Lesquels ?
                          </label>
                          <textarea
                            value={formData.testedToolsDetails}
                            onChange={(e) => handleInputChange('testedToolsDetails', e.target.value)}
                            className={`w-full h-20 sm:h-24 px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border focus:border-[#3F8391] focus:outline-none resize-none text-sm sm:text-base transition-all duration-300 ${
                              isDarkMode 
                                ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                                : 'bg-white/80 border-gray-300/40 text-gray-900 placeholder-gray-500'
                            }`}
                            placeholder="Ex: Mailchimp, HubSpot, LinkedIn Sales Navigator, Apollo, Lemlist, etc."
                          />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Étape 7 Growth: Délai & budget */}
              {step === 7 && formData.serviceType === 'Growth Marketing' && (
                <motion.div
                  key="growth-step7"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4 sm:space-y-6"
                >
                  <div>
                    <h3 className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2 transition-colors duration-500 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      <Clock size={24} className="text-[#3F8391]" />
                      ⏰ Délai & budget
                    </h3>
                    
                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <label className={`block font-medium mb-3 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          Quand souhaitez-vous démarrer ?
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {[
                            'Dès que possible',
                            'Dans 1 mois',
                            'Flexible'
                          ].map((timing) => (
                            <motion.button
                              key={timing}
                              type="button"
                              onClick={() => handleInputChange('projectStartTimeline', timing)}
                              className={`p-3 sm:p-4 rounded-xl border text-center transition-all duration-300 text-sm sm:text-base ${
                                formData.projectStartTimeline === timing
                                  ? `border-[#3F8391] ${isDarkMode ? 'bg-[#3F8391]/40 text-white' : 'bg-[#3F8391] text-gray-100'} shadow-xl shadow-[#3F8391]/50 scale-105 ring-2 ring-[#3F8391]/60`
                                  : `${isDarkMode ? 'border-white/20 bg-white/5 text-gray-300 hover:border-white/40' : 'border-gray-300/40 bg-white/70 text-gray-800 hover:border-gray-400/60 hover:bg-white/90 hover:text-gray-900'}`
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {timing}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className={`block font-medium mb-3 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          Quel est votre budget ?
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            'Moins de 500€',
                            '500–1500€',
                            '1500–3000€',
                            '+3000€',
                            'À discuter'
                          ].map((budget) => (
                            <motion.button
                              key={budget}
                              type="button"
                              onClick={() => handleInputChange('growthBudgetRange', budget)}
                              className={`p-3 sm:p-4 rounded-xl border text-center transition-all duration-300 text-sm sm:text-base ${
                                formData.growthBudgetRange === budget
                                  ? `border-[#3F8391] ${isDarkMode ? 'bg-[#3F8391]/40 text-white' : 'bg-[#3F8391] text-gray-100'} shadow-xl shadow-[#3F8391]/50 scale-105 ring-2 ring-[#3F8391]/60`
                                  : `${isDarkMode ? 'border-white/20 bg-white/5 text-gray-300 hover:border-white/40' : 'border-gray-300/40 bg-white/70 text-gray-800 hover:border-gray-400/60 hover:bg-white/90 hover:text-gray-900'}`
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {budget}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Étape 8 Growth: Autres besoins & Contact */}
              {step === 8 && formData.serviceType === 'Growth Marketing' && !isSuccessScreen && (
                <motion.div
                  key="growth-step8"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4 sm:space-y-6"
                >
                  <div>
                    <h3 className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2 transition-colors duration-500 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      <MessageSquare size={24} className="text-[#3F8391]" />
                      🧠 Autres besoins & Contact
                    </h3>
                    
                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <label className={`block font-medium mb-3 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          Souhaitez-vous que je vous accompagne aussi sur : (Choix multiple)
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            'Design & branding',
                            'Création d\'une landing page dédiée',
                            'Mise en place d\'un CRM (Hubspot, Notion, etc.)',
                            'Analyse de performance',
                            'Formation aux outils',
                            'Autre'
                          ].map((service) => (
                            <motion.button
                              key={service}
                              type="button"
                              onClick={() => {
                                const currentServices = [...formData.additionalServices];
                                const serviceIndex = currentServices.indexOf(service);
                                if (serviceIndex > -1) {
                                  currentServices.splice(serviceIndex, 1);
                                } else {
                                  currentServices.push(service);
                                }
                                handleInputChange('additionalServices', currentServices);
                              }}
                              className={`p-3 rounded-xl border text-left text-sm transition-all duration-300 ${
                                formData.additionalServices.includes(service)
                                  ? `border-[#3F8391] ${isDarkMode ? 'bg-[#3F8391]/40 text-white' : 'bg-[#3F8391] text-gray-100'} shadow-xl shadow-[#3F8391]/50 scale-105 ring-2 ring-[#3F8391]/60`
                                  : `${isDarkMode ? 'border-white/20 bg-white/5 text-gray-300 hover:border-white/40' : 'border-gray-300/40 bg-white/70 text-gray-800 hover:border-gray-400/60 hover:bg-white/90 hover:text-gray-900'}`
                              }`}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                            >
                              <div className="flex items-center justify-between">
                                <span>{service}</span>
                                {formData.additionalServices.includes(service) && (
                                  <CheckCircle size={16} className="text-green-400 drop-shadow-md" />
                                )}
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {formData.additionalServices.includes('Autre') && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <label className={`block font-medium mb-2 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                            Précisez votre besoin
                          </label>
                          <textarea
                            value={formData.growthCustomAdditional}
                            onChange={(e) => handleInputChange('growthCustomAdditional', e.target.value)}
                            className={`w-full h-16 sm:h-20 px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border focus:border-[#3F8391] focus:outline-none resize-none text-sm sm:text-base transition-all duration-300 ${
                              isDarkMode 
                                ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                                : 'bg-white/80 border-gray-300/40 text-gray-900 placeholder-gray-500'
                            }`}
                            placeholder="Décrivez votre besoin supplémentaire..."
                          />
                        </motion.div>
                      )}

                      <div>
                        <label className={`block font-medium mb-2 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          Un détail important à ajouter ?
                        </label>
                        <textarea
                          value={formData.growthAdditionalNotes}
                          onChange={(e) => handleInputChange('growthAdditionalNotes', e.target.value)}
                          className={`w-full h-20 sm:h-24 px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border focus:border-[#3F8391] focus:outline-none resize-none text-sm sm:text-base transition-all duration-300 ${
                              isDarkMode 
                                ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                                : 'bg-white/80 border-gray-300/40 text-gray-900 placeholder-gray-500'
                            }`}
                          placeholder="Remarques, contexte particulier, contraintes spécifiques..."
                        />
                      </div>

                      <div>
                        <label className={`block font-medium mb-3 transition-colors duration-500 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                          Comment souhaitez-vous être contacté ? <span className="text-red-400">*</span>
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {[
                            { value: 'Email', icon: '📧', desc: 'Réponse sous 24h' },
                            { value: 'Téléphone', icon: '📞', desc: 'Appel direct' },
                            { value: 'Visio', icon: '💻', desc: 'Réunion en ligne' }
                          ].map((contact) => (
                            <motion.button
                              key={contact.value}
                              type="button"
                              onClick={() => handleInputChange('preferredContact', contact.value)}
                              className={`p-3 sm:p-4 rounded-xl border text-center transition-all duration-300 text-sm sm:text-base ${
                                formData.preferredContact === contact.value
                                  ? `border-[#3F8391] ${isDarkMode ? 'bg-[#3F8391]/40 text-white' : 'bg-[#3F8391] text-gray-100'} shadow-xl shadow-[#3F8391]/50 scale-105 ring-2 ring-[#3F8391]/60`
                                  : `${isDarkMode ? 'border-white/20 bg-white/5 text-gray-300 hover:border-white/40' : 'border-gray-300/40 bg-white/70 text-gray-800 hover:border-gray-400/60 hover:bg-white/90 hover:text-gray-900'}`
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
                        
                        {/* Message d'aide */}
                        {!formData.preferredContact && (
                          <div className="mt-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3">
                            <p className="text-yellow-200 text-sm flex items-center gap-2">
                              <span>💡</span>
                              <span>Sélectionnez votre mode de contact préféré pour continuer</span>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Écran de succès */}
              {isSuccessScreen && (
                <motion.div
                  key="success-screen"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-8"
                >
                  <div className="max-w-md mx-auto">
                    {/* Icône de succès */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.1))'
                      }}
                    >
                      <CheckCircle size={48} className="text-green-400" />
                    </motion.div>

                    {/* Titre */}
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className={`text-3xl font-bold mb-4 transition-colors duration-500 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      Demande envoyée avec succès !
                    </motion.h3>

                    {/* Message */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="space-y-4"
                    >
                      <p className="text-gray-300 text-lg mb-6">
                        Merci {formData.firstName} ! Votre demande de devis pour 
                        <span className="text-[#3F8391] font-semibold"> {formData.serviceType}</span> a bien été reçue.
                      </p>

                      <div className="bg-[#3F8391]/10 border border-[#3F8391]/20 rounded-2xl p-6 text-left">
                        <h4 className={`font-semibold mb-3 flex items-center gap-2 transition-colors duration-500 ${
                          isDarkMode ? 'text-white' : 'text-gray-800'
                        }`}>
                          <Clock size={20} className="text-[#3F8391]" />
                          Prochaines étapes :
                        </h4>
                        <ul className={`space-y-2 text-sm transition-colors duration-500 ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          <li className="flex items-start gap-2">
                            <span className="text-[#3F8391] mt-1">•</span>
                            <span>Analyse de votre demande sous <strong>24h</strong></span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#3F8391] mt-1">•</span>
                            <span>Contact par <strong>{formData.preferredContact?.toLowerCase()}</strong> pour discuter de votre projet</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#3F8391] mt-1">•</span>
                            <span>Proposition de devis personnalisé et détaillé</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4">
                        <p className={`text-sm transition-colors duration-500 ${
                          isDarkMode ? 'text-blue-200' : 'text-blue-800'
                        }`}>
                          📧 Un email de confirmation a été envoyé à <strong>{formData.email}</strong>
                        </p>
                      </div>
                    </motion.div>

                    {/* Bouton de fermeture */}
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      onClick={() => {
                        onClose();
                        setTimeout(() => {
                          resetForm();
                          setIsSuccessScreen(false);
                        }, 300);
                      }}
                      className="mt-8 px-8 py-3 rounded-full font-medium text-white transition-all duration-300 flex items-center gap-2 mx-auto"
                      style={{
                        background: 'linear-gradient(135deg, rgba(63, 131, 145, 0.8), rgba(63, 131, 145, 0.6))'
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <CheckCircle size={18} />
                      Parfait, merci !
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons - Masqués sur l'écran de succès */}
            {!isSuccessScreen && (
            <div className="flex justify-between mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/10">
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
                  disabled={formData.serviceType === ''}
                  className={`px-6 py-3 rounded-full font-medium text-white transition-all duration-300 flex items-center gap-2 ${
                    formData.serviceType === ''
                      ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                      : ''
                  }`}
                  style={{
                    background: formData.serviceType === '' 
                      ? 'rgba(255, 255, 255, 0.05)' 
                      : 'linear-gradient(135deg, rgba(63, 131, 145, 0.8), rgba(63, 131, 145, 0.6))'
                  }}
                  whileHover={formData.serviceType !== '' ? { scale: 1.05 } : {}}
                  whileTap={formData.serviceType !== '' ? { scale: 0.95 } : {}}
                >
                  Suivant
                  <ChevronRight size={18} />
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  disabled={isSubmitting || !formData.preferredContact}
                  className={`px-8 py-3 rounded-full font-medium text-white transition-all duration-300 flex items-center gap-2 ${
                    (isSubmitting || !formData.preferredContact) ? 'cursor-not-allowed opacity-70' : ''
                  }`}
                  style={{
                    background: (isSubmitting || !formData.preferredContact)
                      ? 'rgba(107, 114, 128, 0.5)' 
                      : 'linear-gradient(135deg, rgba(63, 131, 145, 0.8), rgba(63, 131, 145, 0.6))'
                  }}
                  whileHover={!(isSubmitting || !formData.preferredContact) ? { scale: 1.05 } : {}}
                  whileTap={!(isSubmitting || !formData.preferredContact) ? { scale: 0.95 } : {}}
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
            )}

            {/* Message de statut - Masqué sur l'écran de succès */}
            {!isSuccessScreen && (
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
            )}
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default QuoteModal;