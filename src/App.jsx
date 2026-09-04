import { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Pattern from './components/Pattern';
import LanguageToggle from './components/LanguageToggle';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { translations } from './translations';
import Loader from './components/Loader';
import ProjectCarousel from './components/ProjectCarousel';
import ProjectModal from './components/ProjectModal';
import InspirationMarquee from './components/InspirationMarquee';
import Footer from './components/Footer';
import TechnologiesSection from './components/TechnologiesSection';
import DataWebToggleSection from './components/DataWebToggleSection';
import SkillsSection from './components/SkillsSection';

// Import direct de NeuralNetwork3D pour éviter les problèmes de contexte WebGL
import NeuralNetwork3D from './components/NeuralNetwork3D';

// Lazy loading des autres composants
const WebDevSection = lazy(() => import('./components/WebDevSection'));
const GrowthMarketingSection = lazy(() => import('./components/GrowthMarketingSection'));
const QuoteModal = lazy(() => import('./components/QuoteModal'));

// Composant de fallback pour le lazy loading
const LoadingFallback = ({ height = "400px", componentName = "Composant" }) => {
  return (
    <div
      className="flex items-center justify-center"
      style={{ height }}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-[#3F8391] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm theme-text-muted">Chargement {componentName}...</p>
      </div>
    </div>
  );
};


import { Mail, Phone, MapPin, FileText, Download, ExternalLink } from 'lucide-react';
import photoProfil from './assets/autre/photo-de-profil.webp';
import epitechLogo from './assets/autre/epitech.svg';
import strykerLogo from './assets/autre/stryker.svg';
import heroVideo from './assets/autre/herosectionanimation.mp4';
import phoneVideo from './assets/autre/phone.mp4';
import devVideo from './assets/autre/dev.mp4';
import cvPdf from './assets/autre/CV_JeremyIndelicato_Alternance.pdf';
import irisTechnicalPdf from './assets/iris/Dossier_Technique_iris_pipeline.pdf';

// Import des images pour les projets
import irisLogo from './assets/iris/irislogo.webp';
import irisMockup from './assets/iris/mockup2.webp';
import lxpLogo from './assets/lxp/lxp-mini-logo.webp';
import lxpThumbnail from './assets/lxp/lxpthumbnail.webp';
import orapiLogo from './assets/orapi/petit-logo-orapi.webp';
import orapiChatbot from './assets/orapi/example_chatbot_ai.webp';
import ascLogo from './assets/asc/asc-mini-logo.webp';
import ascThumbnail from './assets/asc/asc-grandeimage.webp';
import institutCorailLogo from './assets/institut-corail/ petit-logo-institut-corail.webp';
import institutCorailMockup from './assets/institut-corail/grand-image-institut-corail.webp';
import maisonlicLogo from './assets/maisonlic/logo.webp';
import sntLogo from './assets/snt/LogoSnT.webp';
import sntThumbnail from './assets/snt/snt grande image.webp';
import sntPdf from './assets/snt/S&T Presentation.pdf';
import hackatonLogo from './assets/hackatonelysee/hackatonelysee logo.webp';
import hackatonThumbnail from './assets/hackatonelysee/hackatonelysee grande image.webp';
import hackatonPdf from './assets/hackatonelysee/Hackaton 2025.pdf';
import iamCryptoLogo from './assets/iamcrypto/iamcryptologo.webp';
import iamCryptoThumbnail from './assets/iamcrypto/mockup-mac.webp';
import strykerProjectLogo from './assets/stryker/logostryker.webp';
import strykerProjectThumbnail from './assets/stryker/stryker grande image.webp';

function AppContent() {
  // Loader uniquement si on arrive sur la page d'accueil ET qu'on n'a jamais visité
  const [loading, setLoading] = useState(() => {
    const currentPath = window.location.pathname;
    const hasLoadedBefore = sessionStorage.getItem('hasLoadedBefore');
    return currentPath === '/' && !hasLoadedBefore;
  });

  return (
    <>
      <Pattern />
      <Router>
        <LoaderController loading={loading} setLoading={setLoading} />
        <NavigationBar />
        <LanguageToggle />
        <div className="min-h-screen w-full">
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/projects" element={<ProjetsEtExperience />} />
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
      // Scroll vers le haut lors du changement de page (sauf au premier chargement)
      if (location.pathname !== '/' || sessionStorage.getItem('hasLoadedBefore')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      
      // Afficher le loader uniquement sur la page d'accueil
      if (location.pathname === '/') {
        setLoading(true);
        const timer = setTimeout(() => {
          setLoading(false);
          // Marquer que l'utilisateur a déjà vu le loader
          sessionStorage.setItem('hasLoadedBefore', 'true');
        }, 2000);
        return () => clearTimeout(timer);
      } else {
        // S'assurer que le loader est caché sur les autres pages
        setLoading(false);
      }
    }
  }, [location, setLoading]);
  
  return null;
}

// Hook pour les animations de scroll
function useInView(options = {}) {
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsInView(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.1, ...options }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, options]);

  return [elementRef, isInView];
}

// Pages à créer ci-dessous
function Accueil() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [servicesRef, servicesInView] = useInView();
  const [projectsRef, projectsInView] = useInView();
  const heroTextRef = useRef(null);
  const aboutSectionRef = useRef(null);

  useEffect(() => {
    // Animation d'entrée du texte hero
    const tl = gsap.timeline();
    
    tl.fromTo(".hero-main-text", {
      y: 100,
      opacity: 0,
      scale: 0.8
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.2
    });

    tl.fromTo(".hero-subtitle", {
      y: 50,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.5");

    // Animation de scroll pour révéler la section about
    gsap.fromTo(aboutSectionRef.current, {
      y: 100,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: aboutSectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Animation parallax pour les éléments de la section about
    gsap.to(".profile-image", {
      y: -30,
      scrollTrigger: {
        trigger: aboutSectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="w-full pb-24">
      {/* Hero Section - Plein écran avec background vidéo */}
      <div className="min-h-screen flex items-center relative overflow-hidden">
        {/* Background Vidéo avec overlay assombri pour améliorer le contraste */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.8)' }}
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          {/* Gradient overlay pour meilleur contraste WCAG AA */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#2A5C68]/60 via-transparent to-[#2A5C68]/40"></div>
        </div>

        {/* Contenu */}
        <div className="max-w-6xl mx-auto relative z-10 w-full px-4 sm:px-6 lg:px-8" ref={heroTextRef}>
          {/* Eyebrow */}
          <motion.p
            className="text-sm uppercase tracking-[0.15em] font-medium mb-6"
            style={{
              opacity: 0.85,
              color: '#ffffff',
              letterSpacing: '0.15em'
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 0.85, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t(translations.hero.name)}
          </motion.p>

          <div className="hero-main-text mb-6">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 leading-tight transition-colors duration-500 text-gray-900" style={{ fontFamily: 'LEMONMILK, sans-serif' }}>
              <span style={{ color: '#ffffff', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
                {t(translations.hero.title)}
              </span>
            </h1>
          </div>

          {/* Sous-titre */}
          <motion.div
            className="max-w-xl mb-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-lg sm:text-xl text-white leading-relaxed" style={{ lineHeight: '1.6' }}>
              {t(translations.hero.subtitle)}
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-start gap-6 mb-32"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.button
              onClick={() => navigate('/contact')}
              className="px-8 py-4 rounded-full font-semibold text-white text-lg shadow-xl transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #13434D 0%, #0d2e35 100%)',
                boxShadow: '0 8px 32px rgba(19, 67, 77, 0.4)'
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 12px 40px rgba(19, 67, 77, 0.6)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              {t(translations.hero.ctaContact)}
            </motion.button>

            <motion.button
              onClick={() => navigate('/projects')}
              className="px-6 py-3 rounded-full text-lg font-medium transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.15) 100%)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: '#ffffff',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t(translations.hero.ctaProjects)}
            </motion.button>
          </motion.div>

          {/* Indicateur de scroll */}
          <div className="hero-subtitle absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 hidden xs:block">
            <motion.div
              className={`flex flex-col items-center gap-2 transition-colors duration-500 ${
                'text-gray-900/80'
              }`}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-sm font-medium">Découvrir</span>
              <div className={`w-px h-8 bg-gradient-to-b to-transparent ${
                'from-gray-900/80'
              }`}></div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Section About avec photo */}
      <div 
        ref={aboutSectionRef}
        className="min-h-[80vh] flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 px-4 py-12 lg:py-20 max-w-6xl mx-auto"
      >
        {/* Photo de profil */}
        <div className="relative profile-image group">
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 transition-transform duration-300 hover:scale-105">
            <img
              src={photoProfil}
              alt="Photo de profil Jeremy Indelicato"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* Contenu texte */}
        <div className="text-center lg:text-left max-w-2xl">
          <p className={`text-lg sm:text-xl lg:text-2xl mb-8 lg:mb-12 leading-relaxed transition-colors duration-500 text-gray-700`}>
            {t(translations.about.description)}
          </p>

          {/* Logos École et Entreprise */}
          <div className="flex items-center justify-center lg:justify-start gap-4 sm:gap-6 lg:gap-8">
            <motion.a
              href="https://www.epitech.eu/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 cursor-pointer"
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src={epitechLogo} 
                alt="Epitech"
                className="h-12 sm:h-14 lg:h-16 w-auto filter brightness-90 hover:brightness-110 transition-all duration-300"
              />
              <span className={`text-sm font-medium transition-colors duration-500 ${
                'text-gray-600'
              }`}>École</span>
            </motion.a>
            
            <div className="w-px h-12 sm:h-14 lg:h-16 bg-gradient-to-b from-transparent via-gray-600 to-transparent" />
            
            <motion.a
              href="https://www.stryker.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 cursor-pointer"
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src={strykerLogo} 
                alt="Stryker"
                className="h-12 sm:h-14 lg:h-16 w-auto filter brightness-90 hover:brightness-110 transition-all duration-300"
              />
              <span className={`text-sm font-medium transition-colors duration-500 ${
                'text-gray-600'
              }`}>Alternance</span>
            </motion.a>
          </div>
        </div>
      </div>

      {/* Section Compétences avec SplitText */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <SkillsSection />
      </motion.div>

      {/* Section Data/Web Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <DataWebToggleSection />
      </motion.div>

      {/* Section Technologies Maîtrisées */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <TechnologiesSection />
      </motion.div>

      {/* Section Web Development */}
      <motion.section
        className="w-full py-12 md:py-20"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
            {/* Vidéo à gauche */}
            <motion.div
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto object-cover"
                >
                  <source src={devVideo} type="video/mp4" />
                </video>
              </div>
            </motion.div>

            {/* Texte à droite */}
            <motion.div
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3
                className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 transition-colors duration-500 text-gray-900 text-center lg:text-left"
                style={{ fontFamily: 'LEMONMILK, sans-serif' }}
              >
                {t(translations.web.title)}
              </h3>
              <p className="text-sm md:text-base lg:text-lg leading-relaxed text-gray-700 text-center lg:text-left">
                {t(translations.web.description)}
                <br /><br />
                {t(translations.web.description2)}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer avec CV et Copyright */}
      <motion.footer
        className="w-full py-16 mt-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-4 text-center">
          {/* Bouton téléchargement CV */}
          <motion.div className="mb-8">
            <motion.a
              href={cvPdf}
              download="CV-Jeremy-Indelicato-TWA.pdf"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 relative overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.15) 100%)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                color: '#1F2937'
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 12px 40px rgba(63, 131, 145, 0.3)",
                background: "linear-gradient(135deg, rgba(63, 131, 145, 0.3) 0%, rgba(63, 131, 145, 0.25) 100%)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              <Download size={20} className="relative z-10" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }} />
              <span className="relative z-10" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>{t(translations.footer.downloadCV)}</span>
            </motion.a>
          </motion.div>

          {/* Marquee d'inspiration */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <InspirationMarquee />
          </motion.div>

          {/* Ligne de séparation */}
          <div 
            className="w-full h-px mb-8 mx-auto"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)'
            }}
          />

          {/* Copyright */}
          <motion.p 
            className={`text-sm leading-relaxed drop-shadow-md transition-colors duration-500 ${
              'text-gray-600'
            }`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Tous droits réservés © Jérémy Indelicato - TWA 2025
          </motion.p>
        </div>
      </motion.footer>
    </div>
  );
}
function ProjetsEtExperience() {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  // Projets d'étude (du plus récent au plus ancien)
  const studyProjects = [
    {
      id: 3,
      name: t(translations.studyProjectsData.hackaton.name),
      category: t(translations.studyProjectsData.hackaton.category),
      shortDescription: t(translations.studyProjectsData.hackaton.shortDescription),
      fullDescription: t(translations.studyProjectsData.hackaton.fullDescription),
      image: hackatonLogo,
      date: "2025",
      technologies: ["Python", "Streamlit", "XGBoost", "SARIMAX", "Plotly", "Pandas", "NumPy", "Scikit-learn"],
      keyFeatures: translations.studyProjectsData.hackaton.keyFeatures.map(feature => t(feature)),
      achievements: translations.studyProjectsData.hackaton.achievements.map(achievement => t(achievement)),
      media: {
        type: "image",
        src: hackatonThumbnail
      },
      detailUrl: hackatonPdf
    },
    {
      id: 2,
      name: t(translations.studyProjectsData.startTrade.name),
      category: t(translations.studyProjectsData.startTrade.category),
      shortDescription: t(translations.studyProjectsData.startTrade.shortDescription),
      fullDescription: t(translations.studyProjectsData.startTrade.fullDescription),
      image: sntLogo,
      date: "2026",
      technologies: ["React", "Vite", "FastAPI", "Ollama", "Qwen2.5", "yfinance", "Tailwind CSS"],
      keyFeatures: translations.studyProjectsData.startTrade.keyFeatures.map(feature => t(feature)),
      achievements: translations.studyProjectsData.startTrade.achievements.map(achievement => t(achievement)),
      media: {
        type: "image",
        src: sntThumbnail
      },
      detailUrl: sntPdf
    },
    {
      id: 1,
      name: t(translations.studyProjectsData.iris.name),
      category: t(translations.studyProjectsData.iris.category),
      shortDescription: t(translations.studyProjectsData.iris.shortDescription),
      fullDescription: t(translations.studyProjectsData.iris.fullDescription),
      image: irisLogo,
      date: "2025",
      technologies: ["Python", "FastAPI", "MLflow", "Docker", "Scikit-learn", "PostgreSQL"],
      keyFeatures: translations.studyProjectsData.iris.keyFeatures.map(feature => t(feature)),
      achievements: translations.studyProjectsData.iris.achievements.map(achievement => t(achievement)),
      media: {
        type: "image",
        src: irisMockup
      },
      detailUrl: irisTechnicalPdf
    }
  ];

  // Expériences professionnelles (du plus récent au plus ancien)
  const experiences = [
    {
      id: 4,
      name: t(translations.experiencesData.stryker.name),
      category: t(translations.experiencesData.stryker.category),
      shortDescription: t(translations.experiencesData.stryker.shortDescription),
      fullDescription: t(translations.experiencesData.stryker.fullDescription),
      image: strykerProjectLogo,
      date: "2025 - Présent",
      technologies: ["Python", "ChromaDB", "Ollama", "GitHub Actions", "Power BI", "DataGouv MCP", "Supabase"],
      keyFeatures: translations.experiencesData.stryker.keyFeatures.map(feature => t(feature)),
      achievements: translations.experiencesData.stryker.achievements.map(achievement => t(achievement)),
      media: {
        type: "image",
        src: strykerProjectThumbnail
      },
      detailUrl: "https://www.linkedin.com/company/stryker/posts/?feedView=all"
    },
    {
      id: 5,
      name: t(translations.experiencesData.orapi.name),
      category: t(translations.experiencesData.orapi.category),
      shortDescription: t(translations.experiencesData.orapi.shortDescription),
      fullDescription: t(translations.experiencesData.orapi.fullDescription),
      image: orapiLogo,
      date: "2025",
      technologies: ["Python", "Sage X3 V12", "PostgreSQL", "Mistral AI API", "Google Colab", "PyTorch"],
      keyFeatures: translations.experiencesData.orapi.keyFeatures.map(feature => t(feature)),
      achievements: translations.experiencesData.orapi.achievements.map(achievement => t(achievement)),
      media: {
        type: "image",
        src: orapiChatbot
      },
      detailUrl: "https://www.linkedin.com/company/gpo-groupe-paredes-orapi/"
    },
    {
      id: 6,
      name: t(translations.experiencesData.hartmann.name),
      category: t(translations.experiencesData.hartmann.category),
      shortDescription: t(translations.experiencesData.hartmann.shortDescription),
      fullDescription: t(translations.experiencesData.hartmann.fullDescription),
      image: ascLogo,
      date: "2023",
      technologies: ["SiteCore", "PhantomBuster", "Python", "Intégration HTML", "Figma", "Premiere Pro"],
      keyFeatures: translations.experiencesData.hartmann.keyFeatures.map(feature => t(feature)),
      achievements: translations.experiencesData.hartmann.achievements.map(achievement => t(achievement)),
      websiteUrl: "https://www.hartmann.info/fr-fr/",
      media: {
        type: "image",
        src: ascThumbnail
      }
    }
  ];

  // Clients freelance
  const freelanceProjects = [
    {
      id: 7,
      name: t(translations.freelanceProjectsData.institutCorail.name),
      category: t(translations.freelanceProjectsData.institutCorail.category),
      shortDescription: t(translations.freelanceProjectsData.institutCorail.shortDescription),
      fullDescription: t(translations.freelanceProjectsData.institutCorail.fullDescription),
      image: institutCorailLogo,
      date: "2024",
      technologies: ["Hostinger", "Google Analytics", "Vue.js", "Search Console", "Figma", "Tag Manager"],
      keyFeatures: translations.freelanceProjectsData.institutCorail.keyFeatures.map(feature => t(feature)),
      achievements: translations.freelanceProjectsData.institutCorail.achievements.map(achievement => t(achievement)),
      websiteUrl: "https://institut-corail.com",
      media: {
        type: "image",
        src: institutCorailMockup
      }
    },
    {
      id: 8,
      name: t(translations.freelanceProjectsData.maisonLic.name),
      category: t(translations.freelanceProjectsData.maisonLic.category),
      shortDescription: t(translations.freelanceProjectsData.maisonLic.shortDescription),
      fullDescription: t(translations.freelanceProjectsData.maisonLic.fullDescription),
      image: maisonlicLogo,
      date: "2025",
      technologies: ["Shopify", "HTML", "Stripe", "SEO", "Search Console", "Hostinger"],
      keyFeatures: translations.freelanceProjectsData.maisonLic.keyFeatures.map(feature => t(feature)),
      achievements: translations.freelanceProjectsData.maisonLic.achievements.map(achievement => t(achievement)),
      websiteUrl: "https://maisonlic.com",
      media: {
        type: "image",
        src: maisonlicLogo
      }
    }
  ];

  // Jeux vidéos (du plus récent au plus ancien)
  const videoGames = [
    {
      id: 10,
      name: t(translations.videoGamesData.iamCrypto.name),
      category: t(translations.videoGamesData.iamCrypto.category),
      shortDescription: t(translations.videoGamesData.iamCrypto.shortDescription),
      fullDescription: t(translations.videoGamesData.iamCrypto.fullDescription),
      image: iamCryptoLogo,
      date: "2025",
      technologies: ["HTML", "CSS", "JavaScript"],
      keyFeatures: translations.videoGamesData.iamCrypto.keyFeatures.map(feature => t(feature)),
      achievements: translations.videoGamesData.iamCrypto.achievements.map(achievement => t(achievement)),
      gameUrl: "https://cartigame.indelicatojeremy.com/index.html",
      media: {
        type: "image",
        src: iamCryptoThumbnail
      }
    },
    {
      id: 9,
      name: t(translations.videoGamesData.linguaXplore.name),
      category: t(translations.videoGamesData.linguaXplore.category),
      shortDescription: t(translations.videoGamesData.linguaXplore.shortDescription),
      fullDescription: t(translations.videoGamesData.linguaXplore.fullDescription),
      image: lxpLogo,
      date: "2024",
      technologies: ["Unreal Engine", "Blender", "JavaScript", "OpenAI API", "Figma", "Illustrator"],
      keyFeatures: translations.videoGamesData.linguaXplore.keyFeatures.map(feature => t(feature)),
      achievements: translations.videoGamesData.linguaXplore.achievements.map(achievement => t(achievement)),
      websiteUrl: "https://lavender-curlew-739021.hostingersite.com/",
      media: {
        type: "image",
        src: lxpThumbnail
      }
    }
  ];

  const ProjectCard = ({ project, index }) => {
    const handleCardClick = () => {
      if (project.gameUrl) {
        window.open(project.gameUrl, '_blank');
      } else {
        openProjectModal(project);
      }
    };

    // Détection mobile pour réduire les effets coûteux
    const isMobile = window.innerWidth <= 768;

    return (
    <motion.div
      className="cursor-pointer flex flex-row items-center gap-6 rounded-3xl"
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.15) 100%)',
        backdropFilter: isMobile ? 'blur(10px)' : 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: isMobile ? 'blur(10px)' : 'blur(20px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
      }}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{
        scale: 1.01,
        y: 0,
        boxShadow: '0 8px 24px rgba(63, 131, 145, 0.2)'
      }}
      onClick={handleCardClick}
    >
      <div className="p-6 w-full">
        <div className="flex items-center gap-6 w-full">
          {/* Project Image */}
          <div className="w-24 h-24 rounded-2xl overflow-hidden border border-white/10 flex-shrink-0">
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="flex-1">
            {/* Header */}
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-xl font-bold mb-1 transition-colors duration-500 text-gray-900">{project.name}</h3>
                <p className={`text-sm transition-colors duration-500 ${
                  'text-gray-600'
                }`}>{project.date}</p>
              </div>
              <span
                className="px-3 py-1 rounded-full text-xs font-medium border flex-shrink-0"
                style={{
                  backgroundColor: 'rgba(63, 131, 145, 0.2)',
                  color: '#3F8391',
                  borderColor: 'rgba(63, 131, 145, 0.3)'
                }}
              >
                {project.category}
              </span>
            </div>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-0">
              {project.technologies.slice(0, 5).map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 rounded text-xs border"
                  style={{
                    borderColor: 'rgba(63, 131, 145, 0.5)',
                    color: '#3F8391',
                    backgroundColor: 'rgba(63, 131, 145, 0.1)'
                  }}
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 5 && (
                <span className="text-xs transition-colors duration-500 text-gray-600">
                  +{project.technologies.length - 5} autres
                </span>
              )}
            </div>
          </div>

          {/* CTA Button */}
          <motion.button
            className="px-6 py-3 rounded-full font-semibold transition-all duration-300 text-sm text-white flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #3F8391 0%, #4a9bb8 100%)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              boxShadow: '0 6px 20px rgba(63, 131, 145, 0.4)',
              color: '#FFFFFF'
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 6px 20px rgba(63, 131, 145, 0.4)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            {project.gameUrl ? 'Jouer' : 'Voir les détails'}
          </motion.button>
        </div>
      </div>
    </motion.div>
    );
  };

  return (
    <div className="w-full min-h-screen pt-40 pb-24">
      <div className="max-w-6xl mx-auto px-4 space-y-20">
        {/* Projets d'étude */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-left transition-colors duration-500 text-gray-900">
            {t(translations.projects.studyProjects)}
          </h2>
          <div className="flex flex-col gap-6">
            {studyProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </motion.section>

        {/* Expériences professionnelles */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-left transition-colors duration-500 text-gray-900">
            {t(translations.projects.professionalExperience)}
          </h2>
          <div className="flex flex-col gap-6">
            {[...experiences, ...freelanceProjects].map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </motion.section>

        {/* Jeux vidéos */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-left transition-colors duration-500 text-gray-900">
            {t(translations.projects.videoGames)}
          </h2>
          <div className="flex flex-col gap-6">
            {videoGames.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </motion.section>
      </div>

      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeProjectModal}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
// Icônes personnalisées pour éviter les warnings de dépréciation
const GitHubIcon = ({ size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedInIcon = ({ size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const YouTubeIcon = ({ size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

function Contact() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: Mail,
      title: t(translations.contact.email),
      value: "indelicatojeremy@gmail.com",
      link: "mailto:jeremy@exemple.com"
    },
    {
      icon: Phone,
      title: t(translations.contact.phone),
      value: "+33 7 80 04 17 08",
      link: "tel:+33600000000"
    },
    {
      icon: MapPin,
      title: t(translations.contact.location),
      value: "Lyon, France",
      link: null
    }
  ];

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/jeremyindelicato",
      color: "#333",
      icon: GitHubIcon
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/j%C3%A9r%C3%A9my-indelicato-1a3450290/",
      color: "#0077B5",
      icon: LinkedInIcon
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@taciturn999",
      color: "#FF0000",
      icon: YouTubeIcon
    },
    {
      name: "Hugging Face",
      url: "https://huggingface.co/taciturn999",
      color: "#FF9D00",
      icon: ExternalLink
    }
  ];

  return (
    <div className="w-full min-h-screen pt-32 md:pt-40 lg:pt-48 pb-12 md:pb-24 relative">
      {/* Overlay spécial pour la page contact - plus clair */}
      <div
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{
          background: 'rgba(255, 255, 255, 0.02)', // Overlay très léger
          backdropFilter: 'blur(1px)',
          zIndex: -1
        }}
      />


      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Vidéo phone à gauche */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl w-full max-w-md mx-auto lg:max-w-full">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
              >
                <source src={phoneVideo} type="video/mp4" />
              </video>
            </div>
          </motion.div>

          {/* Informations de contact à droite */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 drop-shadow-lg transition-colors duration-500 text-gray-900 text-center lg:text-left">
              {t(translations.contact.title)}
            </h2>
            
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center gap-4 p-6 rounded-2xl backdrop-blur-xl overflow-hidden relative transition-all duration-500 ${
                    'border-gray-300/30'
                  }`}
                  style={{
                    background: `linear-gradient(135deg, 
                        rgba(255, 255, 255, 0.95) 0%, 
                        rgba(255, 255, 255, 0.85) 50%, 
                        rgba(255, 255, 255, 0.9) 100%
                      )`,
                    backdropFilter: 'blur(20px)',
                    boxShadow: `
                      0 8px 32px rgba(0, 0, 0, 0.08),
                      inset 0 1px 0 rgba(255, 255, 255, 0.8),
                      inset 0 -1px 0 rgba(0, 0, 0, 0.05)
                    `
                  }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)"
                  }}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
                  
                  <div 
                    className="p-4 rounded-2xl border border-white/30"
                    style={{ 
                      background: `
                        linear-gradient(135deg, 
                          rgba(63, 131, 145, 0.8) 0%, 
                          rgba(63, 131, 145, 0.6) 100%
                        )
                      `,
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 4px 16px rgba(63, 131, 145, 0.3)'
                    }}
                  >
                    <info.icon size={24} color="#FFFFFF" />
                  </div>
                  <div className="relative z-10">
                    <h3 className={`font-semibold drop-shadow-md transition-colors duration-500 ${
                      'text-gray-800'
                    }`}>{info.title}</h3>
                    {info.link ? (
                      <a 
                        href={info.link} 
                        className={`hover:opacity-80 transition-colors drop-shadow-sm ${
                          'text-gray-700'
                        }`}
                        style={{ color: '#3F8391' }}
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className={`drop-shadow-sm transition-colors duration-500 ${
                        'text-gray-700'
                      }`}>{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Réseaux sociaux */}
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-4 drop-shadow-lg transition-colors duration-500 text-gray-800 text-center lg:text-left">
                {t(translations.contact.followMe)}
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
                <div className="flex gap-4 items-center">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{
                        scale: 1.1,
                        y: -2
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <social.icon size={24} style={{ color: "#3F8391" }} />
                    </motion.a>
                  ))}
                </div>

                {/* Bouton Demander un devis - Séparé sur mobile */}
                <motion.button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="px-4 md:px-6 py-3 md:py-4 text-white font-semibold rounded-xl md:rounded-2xl transition-all duration-300 relative overflow-hidden group flex items-center gap-2 min-h-[48px] md:min-h-[56px] touch-manipulation text-sm md:text-base"
                  style={{
                    background: `linear-gradient(135deg,
                        rgba(63, 131, 145, 1) 0%,
                        rgba(63, 131, 145, 0.9) 100%
                      )`,
                    boxShadow: `
                      0 10px 40px rgba(63, 131, 145, 0.4),
                      inset 0 1px 0 rgba(255, 255, 255, 0.3)
                    `
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 12px 40px rgba(63, 131, 145, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <FileText size={16} />
                  <span className="relative">{t(translations.contact.getQuote)}</span>
                </motion.button>
              </div>
            </div>

          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Quote Modal */}
      <Suspense fallback={null}>
        <QuoteModal 
          isOpen={isQuoteModalOpen} 
          onClose={() => setIsQuoteModalOpen(false)} 
        />
      </Suspense>
    </div>
  );
}

// Nouveau composant App simple sans theme hook
function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App