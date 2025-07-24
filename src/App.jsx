import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Pattern from './components/Pattern';
import Loader from './components/Loader';
import ProjectCarousel from './components/ProjectCarousel';
import ServicesCards from './components/ServicesCards';
import CustomCursor from './components/CustomCursor';
import NeuralNetwork3D from './components/NeuralNetwork3D';
import WebDevSection from './components/WebDevSection';
import GrowthMarketingSection from './components/GrowthMarketingSection';
import QuoteModal from './components/QuoteModal';
import TypewriterEffect from './components/TypewriterEffect';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, FileText } from 'lucide-react';
import photoProfil from './assets/autre/photodeprofil.png';
import epitechLogo from './assets/autre/epitech.svg';
import strykerLogo from './assets/autre/stryker.svg';

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Pattern />
      <CustomCursor />
      <Router>
        <LoaderController loading={loading} setLoading={setLoading} />
        <NavigationBar />
        <div className="min-h-screen flex flex-col items-center justify-center pt-20 sm:pt-32 px-2 w-full">
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/projects" element={<ProjetsEtExperience />} />
            <Route path="/services" element={<MesServices />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </Router>
      {loading && <Loader />}
    </>
  );
}

function LoaderController({ setLoading }) {
  const location = useLocation();
  useEffect(() => {
    if (location) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [location, setLoading]);
  return null;
}

// Pages à créer ci-dessous
function Accueil() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <motion.div 
        className="flex flex-col lg:flex-row items-center justify-center gap-12 mb-20 px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Photo de profil */}
        <motion.div
          className="relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative w-64 h-64 lg:w-80 lg:h-80">
            <div className="absolute inset-0 rounded-full p-1" style={{
              background: 'radial-gradient(ellipse at center, #3C3C3D 0%, #040F11 100%)'
            }}>
              <div className="w-full h-full rounded-full p-2" style={{
                background: 'radial-gradient(ellipse at center, #3C3C3D 0%, #040F11 100%)'
              }}>
                <img 
                  src={photoProfil} 
                  alt="Photo de profil Jeremy Indelicato"
                  className="w-full h-full object-cover rounded-full border-2 border-white/20"
                />
              </div>
            </div>
            {/* Effet de brillance */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent animate-pulse"></div>
          </div>
        </motion.div>

        {/* Contenu texte */}
        <motion.div 
          className="text-center lg:text-left max-w-2xl"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
            Salut, je suis{' '}
            <span style={{ color: '#3F8391' }}>
              Jeremy
            </span>
          </h1>
          
          <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-300 mb-8 h-20">
            Je{' '}
            <span style={{ color: '#3F8391' }}>
              <TypewriterEffect />
            </span>
          </div>

          <p className="text-lg sm:text-xl text-gray-400 mb-8 leading-relaxed">
            Développeur freelance passionné avec une expertise complète en{' '}
            <span style={{ color: '#3F8391' }} className="font-semibold">développement web</span>,{' '}
            <span style={{ color: '#3F8391' }} className="font-semibold">applications mobiles</span> et{' '}
            <span style={{ color: '#3F8391' }} className="font-semibold">intelligence artificielle</span>.
            <br />
            Je transforme vos idées en solutions digitales performantes.
          </p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button 
              className="px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                background: 'radial-gradient(ellipse at center, #3C3C3D 0%, #040F11 100%)',
                border: '2px solid #3F8391'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#3F8391';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'radial-gradient(ellipse at center, #3C3C3D 0%, #040F11 100%)';
              }}
            >
              Voir mes projets
            </button>
            <button 
              className="px-8 py-4 font-semibold rounded-full transition-all duration-300 hover:scale-105"
              style={{
                border: '2px solid #3F8391',
                color: '#3F8391',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#3F8391';
                e.target.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#3F8391';
              }}
            >
              Me contacter
            </button>
          </motion.div>

          {/* Logos École et Entreprise */}
          <motion.div
            className="flex items-center justify-center lg:justify-start gap-8 mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <motion.div
              className="flex flex-col items-center gap-2"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img 
                src={epitechLogo} 
                alt="Epitech"
                className="h-12 w-auto filter brightness-90 hover:brightness-110 transition-all duration-300"
                animate={{ 
                  y: [0, -5, 0],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <span className="text-sm text-gray-400">École</span>
            </motion.div>
            
            <motion.div 
              className="w-px h-12 bg-gray-600"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            />
            
            <motion.div
              className="flex flex-col items-center gap-2"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img 
                src={strykerLogo} 
                alt="Stryker"
                className="h-12 w-auto filter brightness-90 hover:brightness-110 transition-all duration-300"
                animate={{ 
                  y: [0, -5, 0],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
              <span className="text-sm text-gray-400">Alternance</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Section Projets */}
      <ProjectCarousel />
      
      {/* Section Services */}
      <ServicesCards />
    </div>
  );
}
function ProjetsEtExperience() {
  const experiences = [
    {
      id: 1,
      company: "Stryker",
      role: "Développeur Full-Stack",
      period: "2023 - Présent",
      type: "Alternance",
      description: "Développement d'applications web complexes dans le secteur médical, optimisation des performances et intégration de solutions IA.",
      technologies: ["React", "Node.js", "TypeScript", "PostgreSQL", "Docker"],
      achievements: [
        "Amélioration des performances de 40%",
        "Migration vers TypeScript",
        "Développement d'APIs REST"
      ]
    },
    {
      id: 2,
      company: "Epitech",
      role: "Étudiant en Informatique",
      period: "2021 - 2026",
      type: "Formation",
      description: "Formation d'expert en informatique avec une approche pratique et innovante. Projets en équipe et développement de solutions techniques avancées.",
      technologies: ["C", "C++", "Python", "JavaScript", "DevOps", "IA"],
      achievements: [
        "Projets en équipe multidisciplinaire",
        "Développement logiciel avancé",
        "Méthodologies Agile"
      ]
    }
  ];

  const projects = [
    {
      id: 1,
      name: "Institut Corail",
      category: "Recherche & Environnement",
      description: "Plateforme de recherche marine et de conservation des récifs coralliens avec système de données scientifiques.",
      image: "/src/assets/institut-corail/logoinstitutcorail.png",
      technologies: ["React", "Node.js", "MongoDB", "D3.js"]
    },
    {
      id: 2,
      name: "ASC",
      category: "Gestion & Sport",
      description: "Solution complète de gestion d'association sportive et culturelle avec système de membres et événements.",
      image: "/src/assets/asc/asclogo.png",
      technologies: ["Vue.js", "Laravel", "MySQL", "Stripe"]
    },
    {
      id: 3,
      name: "LXP",
      category: "Éducation & Tech",
      description: "Plateforme d'apprentissage expérientiel avec gamification et suivi personnalisé des apprenants.",
      image: "/src/assets/lxp/lxplogo.png",
      technologies: ["Angular", "NestJS", "Redis", "WebRTC"]
    },
    {
      id: 4,
      name: "Space Driver",
      category: "Gaming & Simulation",
      description: "Jeu de simulation spatiale immersif en temps réel avec multijoueur et physique avancée.",
      image: "/src/assets/spacedriver/spacedriverlogo.png",
      technologies: ["Unity", "C#", "Photon", "Blender"]
    }
  ];

  return (
    <div className="w-full min-h-screen py-16">
      {/* Header */}
      <motion.div 
        className="text-center mb-16"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Projets & <span style={{ color: '#3F8391' }}>Expérience</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto px-4">
          Découvrez mon parcours professionnel et mes réalisations techniques
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Section Expérience */}
        <motion.section 
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Mon Expérience
          </h2>
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                className="p-8 rounded-2xl border border-white/10 backdrop-blur-sm"
                style={{
                  background: 'radial-gradient(ellipse at center, #3C3C3D 0%, #040F11 100%)'
                }}
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{exp.role}</h3>
                    <p className="text-xl" style={{ color: '#3F8391' }}>{exp.company}</p>
                  </div>
                  <div className="text-right">
                    <span className="px-4 py-2 rounded-full text-sm font-semibold" style={{
                      backgroundColor: '#3F8391',
                      color: '#FFFFFF'
                    }}>
                      {exp.type}
                    </span>
                    <p className="text-gray-400 mt-2">{exp.period}</p>
                  </div>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  {exp.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-semibold mb-3">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1 rounded-full text-sm border"
                          style={{
                            borderColor: '#3F8391',
                            color: '#3F8391'
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-3">Réalisations</h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#3F8391' }} />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section Projets */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Projets Sélectionnés
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300"
                style={{
                  background: 'radial-gradient(ellipse at center, #3C3C3D 0%, #040F11 100%)'
                }}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">{project.name}</h3>
                    <span className="px-3 py-1 rounded-full text-xs" style={{
                      backgroundColor: '#3F8391',
                      color: '#FFFFFF'
                    }}>
                      {project.category}
                    </span>
                  </div>

                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-1 rounded text-xs border"
                        style={{
                          borderColor: '#3F8391',
                          color: '#3F8391'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <motion.button
                    className="w-full py-3 px-6 rounded-full font-semibold transition-all duration-300"
                    style={{
                      border: '2px solid #3F8391',
                      color: '#3F8391',
                      backgroundColor: 'transparent'
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#3F8391';
                      e.target.style.color = '#FFFFFF';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#3F8391';
                    }}
                  >
                    Voir le projet
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
function MesServices() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <div className="w-full min-h-screen py-16">
      {/* Header */}
      <motion.div 
        className="text-center mb-20"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Mes <span style={{ color: '#3F8391' }}>Services</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto px-4">
          Des solutions digitales complètes et sur-mesure pour propulser votre entreprise
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 space-y-32">
        {/* Section IA avec réseau de neurones 3D */}
        <section>
          <NeuralNetwork3D />
        </section>

        {/* Section Développement Web */}
        <section>
          <WebDevSection />
        </section>

        {/* Section Growth Marketing */}
        <section>
          <GrowthMarketingSection />
        </section>
      </div>

      {/* Call to Action Global */}
      <motion.div
        className="text-center mt-20"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-white mb-6">
          Prêt à transformer votre vision en réalité ?
        </h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Chaque projet est unique. Discutons de vos besoins spécifiques et créons 
          ensemble la solution parfaite pour votre entreprise.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.button
            className="px-12 py-4 text-white font-semibold rounded-full transition-all duration-300 relative overflow-hidden group"
            style={{
              background: `
                linear-gradient(135deg, 
                  rgba(63, 131, 145, 0.8) 0%, 
                  rgba(63, 131, 145, 0.6) 100%
                )
              `,
              boxShadow: `
                0 8px 32px rgba(63, 131, 145, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.2)
              `
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 12px 40px rgba(63, 131, 145, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="relative">Commencer mon projet</span>
          </motion.button>

          <motion.button
            onClick={() => setIsQuoteModalOpen(true)}
            className="px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 relative overflow-hidden group flex items-center gap-2 border-2"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderColor: '#3F8391',
              backdropFilter: 'blur(10px)'
            }}
            whileHover={{ 
              scale: 1.05,
              backgroundColor: 'rgba(63, 131, 145, 0.2)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <FileText size={20} />
            <span className="relative">Faire une demande de devis</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Quote Modal */}
      <QuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
      />
    </div>
  );
}
function Contact() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Simulation d'envoi (à remplacer par votre service d'email)
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form data:', data);
      setSubmitStatus('success');
      reset();
    } catch (error) {
      setSubmitStatus('error');
    }
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "jeremy@exemple.com",
      link: "mailto:jeremy@exemple.com"
    },
    {
      icon: Phone,
      title: "Téléphone",
      value: "+33 6 XX XX XX XX",
      link: "tel:+33600000000"
    },
    {
      icon: MapPin,
      title: "Localisation",
      value: "France",
      link: null
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      name: "GitHub",
      url: "https://github.com/jeremy",
      color: "#333"
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      url: "https://linkedin.com/in/jeremy",
      color: "#0077B5"
    },
    {
      icon: Twitter,
      name: "Twitter",
      url: "https://twitter.com/jeremy",
      color: "#1DA1F2"
    }
  ];

  return (
    <div className="w-full min-h-screen py-16">
      {/* Header */}
      <motion.div 
        className="text-center mb-16"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Me <span style={{ color: '#3F8391' }}>Contacter</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto px-4">
          Discutons de votre projet et créons ensemble quelque chose d'exceptionnel
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Informations de contact */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-white mb-8">
              Restons connectés
            </h2>
            
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/10"
                  style={{
                    background: 'radial-gradient(ellipse at center, #3C3C3D 0%, #040F11 100%)'
                  }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div 
                    className="p-3 rounded-full"
                    style={{ backgroundColor: '#3F8391' }}
                  >
                    <info.icon size={24} color="#FFFFFF" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{info.title}</h3>
                    {info.link ? (
                      <a 
                        href={info.link} 
                        className="text-gray-300 hover:text-white transition-colors"
                        style={{ color: '#3F8391' }}
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-gray-300">{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Réseaux sociaux */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">
                Suivez-moi
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full border border-white/20 hover:border-white/40 transition-all duration-300"
                    style={{
                      background: 'radial-gradient(ellipse at center, #3C3C3D 0%, #040F11 100%)'
                    }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon size={24} color="#3F8391" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Formulaire de contact */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div 
              className="p-8 rounded-2xl border border-white/10"
              style={{
                background: 'radial-gradient(ellipse at center, #3C3C3D 0%, #040F11 100%)'
              }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                Envoyez-moi un message
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-semibold mb-2">
                      Prénom *
                    </label>
                    <input
                      {...register("firstName", { required: "Le prénom est requis" })}
                      className="w-full px-4 py-3 rounded-lg bg-black/20 border border-white/20 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none transition-colors"
                      placeholder="Votre prénom"
                    />
                    {errors.firstName && (
                      <p className="text-red-400 text-sm mt-1">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white text-sm font-semibold mb-2">
                      Nom *
                    </label>
                    <input
                      {...register("lastName", { required: "Le nom est requis" })}
                      className="w-full px-4 py-3 rounded-lg bg-black/20 border border-white/20 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none transition-colors"
                      placeholder="Votre nom"
                    />
                    {errors.lastName && (
                      <p className="text-red-400 text-sm mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Email *
                  </label>
                  <input
                    {...register("email", { 
                      required: "L'email est requis",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Email invalide"
                      }
                    })}
                    type="email"
                    className="w-full px-4 py-3 rounded-lg bg-black/20 border border-white/20 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none transition-colors"
                    placeholder="votre@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Sujet *
                  </label>
                  <select
                    {...register("subject", { required: "Le sujet est requis" })}
                    className="w-full px-4 py-3 rounded-lg bg-black/20 border border-white/20 text-white focus:border-white/40 focus:outline-none transition-colors"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="web">Développement Web</option>
                    <option value="mobile">Application Mobile</option>
                    <option value="ai">Intelligence Artificielle</option>
                    <option value="growth">Growth Hacking</option>
                    <option value="other">Autre</option>
                  </select>
                  {errors.subject && (
                    <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Message *
                  </label>
                  <textarea
                    {...register("message", { required: "Le message est requis" })}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-black/20 border border-white/20 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none transition-colors resize-none"
                    placeholder="Décrivez votre projet..."
                  />
                  {errors.message && (
                    <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                  style={{
                    background: isSubmitting ? '#666' : 'radial-gradient(ellipse at center, #3C3C3D 0%, #040F11 100%)',
                    border: '2px solid #3F8391',
                    color: '#FFFFFF'
                  }}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.target.style.backgroundColor = '#3F8391';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.target.style.background = 'radial-gradient(ellipse at center, #3C3C3D 0%, #040F11 100%)';
                    }
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Envoyer le message
                    </>
                  )}
                </motion.button>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-400 text-center p-4 rounded-lg bg-green-400/10 border border-green-400/20"
                  >
                    Message envoyé avec succès ! Je vous répondrai bientôt.
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-center p-4 rounded-lg bg-red-400/10 border border-red-400/20"
                  >
                    Erreur lors de l'envoi. Veuillez réessayer.
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default App
