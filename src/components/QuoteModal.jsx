import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, FileText } from 'lucide-react';

const QuoteModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceType: '',
    projectDescription: '',
    budget: '',
    timeline: '',
    company: '',
    email: '',
    phone: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Demande de devis:', formData);
    // Ici vous pourrez intégrer votre logique d'envoi
    alert('Demande de devis envoyée ! Nous vous recontacterons sous 24h.');
    onClose();
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
          onClick={onClose}
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
                  Étape {step} sur 3
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
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
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
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                      Quel service vous intéresse ?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {['Développement Web', 'Intelligence Artificielle', 'Growth Marketing'].map((service) => (
                        <motion.button
                          key={service}
                          type="button"
                          onClick={() => handleInputChange('serviceType', service)}
                          className={`p-4 rounded-2xl border text-center transition-all duration-300 ${
                            formData.serviceType === service
                              ? 'border-[#3F8391] bg-[#3F8391]/20 text-white'
                              : 'border-white/20 bg-white/5 text-gray-300 hover:border-white/40'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="font-medium">{service}</div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-3">
                      Décrivez votre projet
                    </label>
                    <textarea
                      value={formData.projectDescription}
                      onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                      className="w-full h-32 px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-[#3F8391] focus:outline-none resize-none"
                      placeholder="Décrivez vos besoins, objectifs et contraintes..."
                    />
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                      Budget et délais
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white font-medium mb-3">
                          Budget approximatif
                        </label>
                        <select
                          value={formData.budget}
                          onChange={(e) => handleInputChange('budget', e.target.value)}
                          className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white focus:border-[#3F8391] focus:outline-none"
                        >
                          <option value="">Sélectionnez une fourchette</option>
                          <option value="< 5k€">Moins de 5 000€</option>
                          <option value="5k-15k€">5 000€ - 15 000€</option>
                          <option value="15k-30k€">15 000€ - 30 000€</option>
                          <option value="30k-50k€">30 000€ - 50 000€</option>
                          <option value="> 50k€">Plus de 50 000€</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-3">
                          Délai souhaité
                        </label>
                        <select
                          value={formData.timeline}
                          onChange={(e) => handleInputChange('timeline', e.target.value)}
                          className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white focus:border-[#3F8391] focus:outline-none"
                        >
                          <option value="">Sélectionnez un délai</option>
                          <option value="< 1 mois">Moins d'1 mois</option>
                          <option value="1-3 mois">1 à 3 mois</option>
                          <option value="3-6 mois">3 à 6 mois</option>
                          <option value="6-12 mois">6 à 12 mois</option>
                          <option value="> 12 mois">Plus de 12 mois</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
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
                      <div>
                        <label className="block text-white font-medium mb-2">
                          Entreprise
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-[#3F8391] focus:outline-none"
                          placeholder="Nom de votre entreprise"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            Téléphone
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-[#3F8391] focus:outline-none"
                            placeholder="+33 6 XX XX XX XX"
                          />
                        </div>
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
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  step === 1
                    ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
                whileHover={step > 1 ? { scale: 1.05 } : {}}
                whileTap={step > 1 ? { scale: 0.95 } : {}}
              >
                Précédent
              </motion.button>

              {step < 3 ? (
                <motion.button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 rounded-full font-medium text-white transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(63, 131, 145, 0.8), rgba(63, 131, 145, 0.6))'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Suivant
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  className="px-8 py-3 rounded-full font-medium text-white transition-all duration-300 flex items-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, rgba(63, 131, 145, 0.8), rgba(63, 131, 145, 0.6))'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send size={18} />
                  Envoyer la demande
                </motion.button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default QuoteModal;