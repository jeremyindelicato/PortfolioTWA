import { useState, useEffect, useRef, Suspense, lazy, Component } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Pattern from './components/Pattern';
import Loader from './components/Loader';
import ProjectCarousel from './components/ProjectCarousel';
import ServicesCards from './components/ServicesCards';
import CustomCursor from './components/CustomCursor';
import TypewriterEffect from './components/TypewriterEffect';
import CredibilityDashboard from './components/CredibilityDashboard';
import ProjectModal from './components/ProjectModal';
import InspirationMarquee from './components/InspirationMarquee';

// Import direct temporaire pour déboguer NeuralNetwork3D
import NeuralNetwork3DComponent from './components/NeuralNetwork3D';

// Lazy loading des composants Three.js lourds
const NeuralNetwork3D = NeuralNetwork3DComponent;
// const NeuralNetwork3D = lazy(() => {
//   console.log('Loading NeuralNetwork3D...');
//   return import('./components/NeuralNetwork3D').catch(error => {
//     console.error('Error loading NeuralNetwork3D:', error);
//     throw error;
//   });
// });
const WebDevSection = lazy(() => import('./components/WebDevSection'));
const GrowthMarketingSection = lazy(() => import('./components/GrowthMarketingSection'));
const QuoteModal = lazy(() => import('./components/QuoteModal'));

// Composant de fallback pour le lazy loading
const LoadingFallback = ({ height = "400px", componentName = "Composant" }) => {
  console.log(`Loading fallback for ${componentName}`);
  return (
    <div 
      className="flex items-center justify-center"
      style={{ height }}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-[#3F8391] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-400 text-sm">Chargement {componentName}...</p>
      </div>
    </div>
  );
};

// Error Boundary simple pour les composants lazy
class LazyErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('LazyErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center" style={{ height: this.props.height || "400px" }}>
          <div className="flex flex-col items-center gap-4 text-red-400">
            <div className="text-2xl">⚠️</div>
            <p className="text-sm">Erreur de chargement du composant</p>
            <button 
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-4 py-2 bg-red-500/20 rounded-lg text-xs hover:bg-red-500/30"
            >
              Réessayer
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Send, FileText, Download, ExternalLink } from 'lucide-react';
import photoProfil from './assets/autre/photodeprofil.png';
import epitechLogo from './assets/autre/epitech.svg';
import strykerLogo from './assets/autre/stryker.svg';
import cvPdf from './assets/autre/CV_JeremyIndelicato_Alternance.pdf';
import irisTechnicalPdf from './assets/iris/Dossier_Technique_iris_pipeline.pdf';

// Import des images pour les projets
import irisLogo from './assets/iris/irislogo.png';
import irisMockup from './assets/iris/mockup2.png';
import lxpLogo from './assets/lxp/lxp-mini-logo.jpg';
import lxpThumbnail from './assets/lxp/lxpthumbnail.png';
import orapiLogo from './assets/orapi/petit-logo-orapi.jpg';
import orapiChatbot from './assets/orapi/example_chatbot_ai.png';
import ascLogo from './assets/asc/asc-mini-logo.jpg';
import ascThumbnail from './assets/asc/asc-grandeimage.jpg';
import institutCorailLogo from './assets/institut-corail/ petit-logo-institut-corail.jpg';
import institutCorailMockup from './assets/institut-corail/grand-image-institut-corail.png';
import maisonlicLogo from './assets/maisonlic/logo.png';

function App() {
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768;
      const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
      
      return isTouchDevice || isSmallScreen || hasCoarsePointer;
    };

    setIsMobile(checkIsMobile());

    const handleResize = () => {
      setIsMobile(checkIsMobile());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Pattern />
      {!isMobile && <CustomCursor />}
      <Router>
        <LoaderController loading={loading} setLoading={setLoading} />
        <NavigationBar />
        <div className="min-h-screen w-full">
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
      // Scroll vers le haut lors du changement de page
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 2000);
      return () => clearTimeout(timer);
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
  const [servicesRef, servicesInView] = useInView();
  const [projectsRef, projectsInView] = useInView();
  const [credibilityRef, credibilityInView] = useInView();
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
      {/* Hero Section - Plein écran */}
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-6xl mx-auto" ref={heroTextRef}>
          <div className="hero-main-text mb-8">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 leading-tight">
              👋 , je suis{' '}
              <span 
                style={{ 
                  color: '#3F8391',
                  textShadow: '0 0 30px rgba(30, 47, 49, 0.5)'
                }}
              >
                Jérémy
              </span>
            </h1>
          </div>
          
          <div className="hero-main-text">
            <div className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-gray-300 mb-6 sm:mb-8 lg:mb-12">
              Je{' '}
              <span style={{ color: '#3F8391' }}>
                <TypewriterEffect />
              </span>
            </div>
          </div>

          {/* Indicateur de scroll */}
          <div className="hero-subtitle absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 hidden xs:block">
            <motion.div
              className="flex flex-col items-center gap-2 text-white/60"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-sm font-medium">Découvrir</span>
              <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent"></div>
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
        <div className="relative profile-image">
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80">
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
            
            {/* Effet de glow */}
            <div 
              className="absolute -inset-4 rounded-full opacity-30 blur-2xl"
              style={{
                background: 'radial-gradient(circle, rgba(63, 131, 145, 0.4) 0%, transparent 70%)'
              }}
            ></div>
          </div>
        </div>

        {/* Contenu texte */}
        <div className="text-center lg:text-left max-w-2xl">
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-400 mb-6 lg:mb-8 leading-relaxed">
            <span style={{ color: '#3F8391' }} className="font-semibold">AI & Data Engineer</span> chez <span style={{ color: '#3F8391' }} className="font-semibold">Stryker</span>, je vous accompagne de manière indépendante dans la création de <span style={{ color: '#3F8391' }} className="font-semibold">solutions web sur-mesure</span>, taillées pour vos objectifs.
            <br />
            Mêlant <span style={{ color: '#3F8391' }} className="font-semibold">développement web</span>, <span style={{ color: '#3F8391' }} className="font-semibold">data</span> et <span style={{ color: '#3F8391' }} className="font-semibold">IA</span>, je transforme vos idées en <span style={{ color: '#3F8391' }} className="font-semibold">leviers concrets de croissance</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8 lg:mb-12">
            <motion.button 
              className="px-6 py-4 sm:px-8 sm:py-4 lg:px-10 lg:py-5 text-white font-semibold rounded-full transition-all duration-300 text-base lg:text-lg border border-white/20 backdrop-blur-xl relative overflow-hidden group min-h-[48px] touch-manipulation"
              style={{
                background: `
                  linear-gradient(135deg, 
                    rgba(255, 255, 255, 0.1) 0%, 
                    rgba(255, 255, 255, 0.05) 50%, 
                    rgba(0, 0, 0, 0.1) 100%
                  )
                `,
                backdropFilter: 'blur(20px)',
                border: '2px solid rgba(63, 131, 145, 0.5)',
                boxShadow: `
                  0 8px 32px rgba(0, 0, 0, 0.3),
                  inset 0 1px 0 rgba(255, 255, 255, 0.2)
                `
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 12px 40px rgba(63, 131, 145, 0.4)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <span className="relative z-10">Voir mes projets</span>
            </motion.button>
            <motion.button 
              className="px-6 py-4 sm:px-8 sm:py-4 lg:px-10 lg:py-5 font-semibold rounded-full transition-all duration-300 text-base lg:text-lg text-white relative overflow-hidden group min-h-[48px] touch-manipulation"
              style={{
                background: `
                  linear-gradient(135deg, 
                    rgba(63, 131, 145, 0.8) 0%, 
                    rgba(63, 131, 145, 0.6) 50%, 
                    rgba(63, 131, 145, 0.4) 100%
                  )
                `,
                boxShadow: `
                  0 4px 16px rgba(63, 131, 145, 0.3),
                  inset 0 1px 0 rgba(255, 255, 255, 0.2)
                `
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 6px 24px rgba(63, 131, 145, 0.4)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <span className="relative z-10">Me contacter</span>
            </motion.button>
          </div>

          {/* Logos École et Entreprise */}
          <div className="flex items-center justify-center lg:justify-start gap-4 sm:gap-6 lg:gap-8">
            <motion.div
              className="flex flex-col items-center gap-3"
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src={epitechLogo} 
                alt="Epitech"
                className="h-12 sm:h-14 lg:h-16 w-auto filter brightness-90 hover:brightness-110 transition-all duration-300"
              />
              <span className="text-sm text-gray-400 font-medium">École</span>
            </motion.div>
            
            <div className="w-px h-12 sm:h-14 lg:h-16 bg-gradient-to-b from-transparent via-gray-600 to-transparent" />
            
            <motion.div
              className="flex flex-col items-center gap-3"
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src={strykerLogo} 
                alt="Stryker"
                className="h-12 sm:h-14 lg:h-16 w-auto filter brightness-90 hover:brightness-110 transition-all duration-300"
              />
              <span className="text-sm text-gray-400 font-medium">Alternance</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Section Services */}
      <motion.div
        ref={servicesRef}
        initial={{ opacity: 0, y: 100 }}
        animate={servicesInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <ServicesCards />
      </motion.div>
      
      {/* Section Projets */}
      <motion.div
        ref={projectsRef}
        initial={{ opacity: 0, y: 100 }}
        animate={projectsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <ProjectCarousel />
      </motion.div>
      
      {/* Section Crédibilité - Dashboard */}
      <motion.div
        ref={credibilityRef}
        initial={{ opacity: 0, y: 100 }}
        animate={credibilityInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <CredibilityDashboard />
      </motion.div>

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
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 border border-white/20 backdrop-blur-xl relative overflow-hidden group"
              style={{
                background: `
                  linear-gradient(135deg, 
                    rgba(255, 255, 255, 0.15) 0%, 
                    rgba(255, 255, 255, 0.05) 50%, 
                    rgba(255, 255, 255, 0.1) 100%
                  )
                `,
                backdropFilter: 'blur(20px)',
                boxShadow: `
                  0 8px 32px rgba(0, 0, 0, 0.1),
                  inset 0 1px 0 rgba(255, 255, 255, 0.3),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.1)
                `,
                color: '#FFFFFF'
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 12px 40px rgba(63, 131, 145, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              
              <Download size={20} className="relative z-10" />
              <span className="relative z-10">Télécharger mon CV</span>
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
            className="text-gray-300 text-sm leading-relaxed drop-shadow-md"
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

  // Projets d'étude
  const studyProjects = [
    {
      id: 1,
      name: "Iris Pipeline",
      category: "Projet d'étude",
      shortDescription: "Pipeline de machine learning pour la prédiction de la largeur de sépale",
      fullDescription: "Développement d'un pipeline de machine learning complet pour l'analyse et la prédiction d'une largeur de sépale. Le projet inclut la création d'une API REST pour les prédictions, l'utilisation de MLflow pour le suivi des modèles, et une base de données PostgreSQL pour stocker les données structurées.\n\nL'objectif est de fournir une solution robuste et scalable pour le traitement d'images, avec un focus sur la performance et la maintenabilité du code.\n\nLe projet a été réalisé dans le cadre de ma formation à Epitech.",
      image: irisLogo,
      date: "2025",
      technologies: ["Python", "FastAPI", "MLflow", "Docker", "Scikit-learn", "PostgreSQL"],
      keyFeatures: [
        "Pipeline automatisé de traitement d'images",
        "API REST pour faire des prédictions via /predict",
        "Base de données PostgreSQL pour les données structurées",
        "Tracking des modèles et métriques via MLflow"
      ],
      achievements: [
        "MSE < 0.1 avec RandomForestRegressor",
        "Containerisation et orchestration réussies avec Docker Compose",
        "Pipeline traçable et maintenable"
      ],
      media: {
        type: "image",
        src: irisMockup
      },
      detailUrl: irisTechnicalPdf
    },
    {
      id: 2,
      name: "LinguaXplore",
      category: "Projet d'étude",
      shortDescription: "Jeu vidéo éducatif pour l'apprentissage des langues",
      fullDescription: "Création d'une plateforme immersive d'apprentissage des langues à travers des jeux vidéo et des expériences interactives. Le projet inclut le développement d'un site web moderne, l'intégration de l'intelligence artificielle pour les interactions avec les personnages non-joueurs (PNJ), et un système de progression gamifié.\n\nL'objectif est de rendre l'apprentissage des langues plus engageant et efficace en combinant technologie et pédagogie.\n\n Nous avons développé un site web minimaliste et responsive, intégrant des éléments de design moderne et une interface utilisateur intuitive.",
      image: lxpLogo,
      date: "2024",
      technologies: ["Unreal Engine", "Blender", "JavaScript", "OpenAI API", "Figma", "Illustrator"],
      keyFeatures: [
        "Quêtes linguistiques scénarisées en VR",
        "Site Web : Design minimaliste et responsive",
        "Intelligence artificielle pour les PNJ",
        "Système de progression et de niveaux"
      ],
      achievements: [
        "Personnalisation du skin personnage",
        "Chat de proximité",
        "Interface web responsive et moderne"
      ],
      websiteUrl: "https://lavender-curlew-739021.hostingersite.com/",
      media: {
        type: "image",
        src: lxpThumbnail
      }
    }
  ];

  // Expériences professionnelles
  const experiences = [
    {
      id: 3,
      name: "Orapi - Data Engineering",
      category: "Expérience",
      shortDescription: "Alternance en tant que Data Engineer - Développement de ChatBot et gestion de données",
      fullDescription: "Mission en alternance chez Orapi, spécialisée dans les solutions de nettoyage industriel. Développement d'un système de ChatBot intelligent pour le support client et mise en place d'une architecture de gestion des données robuste.\n\nLe projet a inclus l'analyse des besoins clients, la conception d'une base de données optimisée, et l'implémentation d'algorithmes de traitement du langage naturel pour améliorer l'expérience utilisateur.",
      image: orapiLogo,
      date: "2025",
      technologies: ["Python", "Sage X3 V12", "PostgreSQL", "Mistral AI API", "Google Colab", "PyTorch"],
      keyFeatures: [
        "IA fine-tuné conversationnelle",
        "Système de gestion de données produits",
        "Nettoyage et structuration des données",
        "Intégration avec les systèmes existants"
      ],
      achievements: [
        "Restructuration de la base de données (+ de 1000 produits)",
        "Gestion de la gamme de produit MDD",
        "Amélioration de la satisfaction client"
      ],
      media: {
        type: "image",
        src: orapiChatbot
      },
      detailUrl: "https://huggingface.co/taciturn999/OrapAI"
    },
    {
      id: 4,
      name: "ASC - Growth Marketing",
      category: "Expérience",
      shortDescription: "Stage en Growth Marketing - Développement web et design & croissance",
      fullDescription: "Stage de 7 mois chez Advanced Silicone Coating (Groupe Hartmann), une entreprise spécialisée dans les solutions de pansements. Le projet a consisté à développer une stratégie de growth marketing incluant la création d'un site web moderne, l'automatisation des campagnes de prospection, et l'analyse des données de marché.\n\nL'objectif était d'augmenter la visibilité en ligne de l'entreprise et de générer des leads qualifiés pour les équipes commerciales.",
      image: ascLogo,
      date: "2023",
      technologies: ["SiteCore", "PhantomBuster", "Python", "Intégration HTML", "Figma", "Premiere Pro"],
      keyFeatures: [
        "Site web moderne",
        "Création de contenus pour les réseaux sociaux",
        "Analyse de données et de marché",
        "Automatisation de la prospection"
      ],
      achievements: [
        "Augmentation du trafic web de 28%",
        "Génération de plus de 30 leads qualifiés via les campagnes automatisées",
        "Amélioration de la stratégie de contenu B2B"
      ],
      websiteUrl: "https://bento.me/advanced-silicone-coating",
      media: {
        type: "image",
        src: ascThumbnail
      }
    }
  ];

  // Clients freelance
  const freelanceProjects = [
    {
      id: 5,
      name: "Institut Corail",
      category: "Client freelance",
      shortDescription: "Institut de beauté et soins - Développement web, design, SEO et e-commerce",
      fullDescription: "Projet complet pour l'Institut Corail, spécialisé dans les soins de beauté et l'esthétique. Création d'une présence digitale complète incluant le site web, la stratégie SEO, et la mise en place d'une boutique en ligne.\n\nLe projet a nécessité une approche sur-mesure pour refléter l'élégance et le professionnalisme de l'institut, avec une attention particulière portée à l'expérience utilisateur et à la conversion client.\n\n L'institut se situe à Loyettes, à 298 Rue du Bugey, 01360 Loyettes.",
      image: institutCorailLogo,
      date: "2024",
      technologies: ["Hostinger", "Google Analytics", "Vue.js", "Search Console", "Figma", "Tag Manager"],
      keyFeatures: [
        "Site web vitrine élégant",
        "Boutique e-commerce intégrée",
        "Système de réservation en ligne",
        "Optimisation SEO complète"
      ],
      achievements: [
        "Augmentation de la visibilité",
        "Positionnement #1 sur Google local",
        "Taux de conversion e-commerce de 4.2%"
      ],
      websiteUrl: "https://institut-corail.com",
      media: {
        type: "image",
        src: institutCorailMockup
      }
    },
    {
      id: 6,
      name: "Maison L.I.C",
      category: "Client freelance",
      shortDescription: "Création d'art floral - Développement web, design, SEO et e-commerce",
      fullDescription: "Développement complet de la présence digitale pour Maison L.I.C, spécialisée dans la création d'art floral haut de gamme. Le projet englobe la création d'un univers visuel unique, le développement d'un site e-commerce, et une stratégie SEO ciblée.\n\nL'accent a été mis sur la mise en valeur des créations florales à travers une galerie interactive et un système de commande personnalisé pour les événements sur-mesure.",
      image: maisonlicLogo,
      date: "2025",
      technologies: ["Shopify", "HTML", "Stripe", "SEO", "Search Console", "Hostinger"],
      keyFeatures: [
        "Boutique e-commerce florale",
        "Mise en avant des créations",
        "Design optimisé pour les mobiles",
        "Système de paiement sécurisé"
      ],
      achievements: [
        "SEO optimisé pour les recherches locales",
        "Création d'une communauté engagée",
        "Commande en ligne sur mesure"
      ],
      websiteUrl: "https://maisonlic.fr",
      media: {
        type: "image",
        src: maisonlicLogo
      }
    }
  ];

  const ProjectCard = ({ project, index }) => (
    <motion.div
      className="group relative overflow-hidden rounded-3xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300 cursor-pointer"
      style={{
        background: `
          linear-gradient(135deg, 
            rgba(255, 255, 255, 0.1) 0%, 
            rgba(255, 255, 255, 0.05) 50%, 
            rgba(0, 0, 0, 0.1) 100%
          )
        `,
        backdropFilter: 'blur(20px)',
        boxShadow: `
          0 8px 32px rgba(0, 0, 0, 0.2),
          inset 0 1px 0 rgba(255, 255, 255, 0.2)
        `
      }}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      onClick={() => openProjectModal(project)}
    >
      <div className="p-6">
        {/* Project Image */}
        <div className="w-16 h-16 mb-4 rounded-2xl overflow-hidden border border-white/10">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
            <p className="text-sm text-gray-400">{project.date}</p>
          </div>
          <span 
            className="px-3 py-1 rounded-full text-xs font-medium border"
            style={{
              backgroundColor: 'rgba(63, 131, 145, 0.2)',
              color: '#3F8391',
              borderColor: 'rgba(63, 131, 145, 0.3)'
            }}
          >
            {project.category}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-300 mb-6 leading-relaxed text-sm">
          {project.shortDescription}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.slice(0, 3).map((tech, idx) => (
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
          {project.technologies.length > 3 && (
            <span className="text-xs text-gray-400">
              +{project.technologies.length - 3} autres
            </span>
          )}
        </div>

        {/* CTA Button */}
        <motion.button
          className="w-full py-3 px-6 rounded-full font-semibold transition-all duration-300 text-sm"
          style={{
            background: 'linear-gradient(135deg, #3F8391 0%, #5ba3b0 100%)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 4px 16px rgba(63, 131, 145, 0.3)',
            color: '#FFFFFF'
          }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 6px 20px rgba(63, 131, 145, 0.4)'
          }}
          whileTap={{ scale: 0.95 }}
        >
          Voir les détails
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <div className="w-full min-h-screen py-16 pb-24">
      {/* Header */}
      <motion.div 
        className="text-center mb-16 px-4 mx-auto max-w-6xl"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Projets & <span style={{ color: '#3F8391' }}>Expérience</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Découvrez une sélection de projets réalisés au fil de ma carrière, accompagnés de mes expériences professionnelles. 💼
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 space-y-20">
        {/* Projets d'étude */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-left">
            Projets d'<span style={{ color: '#3F8391' }}>Étude</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
          <h2 className="text-3xl font-bold text-white mb-8 text-left">
            <span style={{ color: '#3F8391' }}>Expériences</span> Professionnelles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {experiences.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </motion.section>

        {/* Clients freelance */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-left">
            Clients <span style={{ color: '#3F8391' }}>Freelance</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {freelanceProjects.map((project, index) => (
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
    </div>
  );
}
function MesServices() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <div className="w-full min-h-screen py-16 pb-24">
      {/* Header */}
      <motion.div 
        className="text-center mb-20 px-4 mx-auto max-w-6xl"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Mes <span style={{ color: '#3F8391' }}>Services</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Des solutions digitales complètes et sur-mesure pour propulser votre entreprise
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 space-y-20">
        {/* Section IA avec réseau de neurones 3D */}
        <section className="flex justify-center">
          <div className="w-full max-w-6xl">
            <LazyErrorBoundary height="600px">
              <NeuralNetwork3D />
            </LazyErrorBoundary>
          </div>
        </section>

        {/* Section Développement Web */}
        <section className="flex justify-center">
          <div className="w-full max-w-6xl">
            <Suspense fallback={<LoadingFallback height="500px" />}>
              <WebDevSection />
            </Suspense>
          </div>
        </section>

        {/* Section Growth Marketing */}
        <section className="flex justify-center">
          <div className="w-full max-w-6xl">
            <Suspense fallback={<LoadingFallback height="500px" />}>
              <GrowthMarketingSection />
            </Suspense>
          </div>
        </section>
      </div>

      {/* Call to Action Global */}
      <motion.div
        className="text-center mt-20 max-w-4xl mx-auto px-4"
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
        
        <div className="flex justify-center items-center">

          <motion.button
            onClick={() => setIsQuoteModalOpen(true)}
            className="px-12 py-4 text-white font-semibold rounded-full transition-all duration-300 relative overflow-hidden group flex items-center gap-2"
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
            <FileText size={20} />
            <span className="relative">Faire une demande de devis</span>
          </motion.button>
        </div>
      </motion.div>

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

function Contact() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

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
      value: "indelicatojeremy@gmail.com",
      link: "mailto:jeremy@exemple.com"
    },
    {
      icon: Phone,
      title: "Téléphone",
      value: "+33 7 80 04 17 08",
      link: "tel:+33600000000"
    },
    {
      icon: MapPin,
      title: "Localisation",
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
      name: "Hugging Face",
      url: "https://huggingface.co/taciturn999",
      color: "#FF9D00",
      icon: ExternalLink
    }
  ];

  return (
    <div className="w-full min-h-screen py-16 pb-24 relative">
      {/* Overlay spécial pour la page contact - plus clair */}
      <div 
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{
          background: 'rgba(255, 255, 255, 0.02)', // Overlay très léger
          backdropFilter: 'blur(1px)',
          zIndex: -1
        }}
      />
      
      {/* Header */}
      <motion.div 
        className="text-center mb-16 px-4 mx-auto max-w-6xl"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
          Me <span style={{ color: '#3F8391' }}>Contacter</span>
        </h1>
        <p className="text-xl text-gray-100 max-w-3xl mx-auto drop-shadow-md">
          Un projet en tête ? Parlons-en ! Je suis disponible pour donner vie à vos idées sur mesure.👨‍💻
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Informations de contact */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-white mb-8 drop-shadow-lg">
              Restons connectés
            </h2>
            
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4 p-6 rounded-2xl border border-white/20 backdrop-blur-xl overflow-hidden relative"
                  style={{
                    background: `
                      linear-gradient(135deg, 
                        rgba(255, 255, 255, 0.15) 0%, 
                        rgba(255, 255, 255, 0.05) 50%, 
                        rgba(255, 255, 255, 0.1) 100%
                      )
                    `,
                    backdropFilter: 'blur(20px)',
                    boxShadow: `
                      0 8px 32px rgba(0, 0, 0, 0.1),
                      inset 0 1px 0 rgba(255, 255, 255, 0.3),
                      inset 0 -1px 0 rgba(0, 0, 0, 0.1)
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
                    <h3 className="text-white font-semibold drop-shadow-md">{info.title}</h3>
                    {info.link ? (
                      <a 
                        href={info.link} 
                        className="text-gray-100 hover:text-white transition-colors drop-shadow-sm"
                        style={{ color: '#3F8391' }}
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-gray-100 drop-shadow-sm">{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Réseaux sociaux */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 drop-shadow-lg">
                Suivez-moi
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-2xl border border-white/20 backdrop-blur-xl hover:border-white/40 transition-all duration-300 relative overflow-hidden group min-h-[56px] min-w-[56px] flex items-center justify-center touch-manipulation"
                    style={{
                      background: `
                        linear-gradient(135deg, 
                          rgba(255, 255, 255, 0.12) 0%, 
                          rgba(255, 255, 255, 0.08) 100%
                        )
                      `,
                      backdropFilter: 'blur(15px)',
                      boxShadow: `
                        0 6px 24px rgba(0, 0, 0, 0.1),
                        inset 0 1px 0 rgba(255, 255, 255, 0.2)
                      `
                    }}
                    whileHover={{ 
                      scale: 1.1, 
                      y: -2,
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)"
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    
                    <social.icon size={20} className="relative z-10" style={{ color: "#3F8391" }} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Bouton Demander un devis */}
            <motion.div
              className="text-center mt-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.button
                onClick={() => setIsQuoteModalOpen(true)}
                className="px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 relative overflow-hidden group flex items-center gap-2 mx-auto"
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
                <FileText size={20} />
                <span className="relative">Demander un devis</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Formulaire de contact */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div 
              className="p-8 rounded-3xl border border-white/20 backdrop-blur-xl relative overflow-hidden"
              style={{
                background: `
                  linear-gradient(135deg, 
                    rgba(255, 255, 255, 0.15) 0%, 
                    rgba(255, 255, 255, 0.05) 50%, 
                    rgba(255, 255, 255, 0.1) 100%
                  )
                `,
                backdropFilter: 'blur(20px)',
                boxShadow: `
                  0 12px 48px rgba(0, 0, 0, 0.1),
                  inset 0 1px 0 rgba(255, 255, 255, 0.3),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.1)
                `
              }}
            >
              {/* Floating reflections */}
              <div className="absolute top-6 left-6 w-16 h-16 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-xl opacity-60" />
              <div className="absolute bottom-6 right-6 w-12 h-12 bg-gradient-to-tl from-white/15 to-transparent rounded-full blur-lg opacity-40" />
              
              <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-lg relative z-10">
                Envoyez-moi un message
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-semibold mb-2 drop-shadow-md">
                      Prénom *
                    </label>
                    <input
                      {...register("firstName", { required: "Le prénom est requis" })}
                      className="w-full px-4 py-4 sm:py-3 rounded-xl border border-white/30 text-white placeholder-gray-200 focus:border-white/50 focus:outline-none transition-all duration-300 backdrop-blur-md min-h-[48px] touch-manipulation"
                      style={{
                        background: `
                          linear-gradient(135deg, 
                            rgba(255, 255, 255, 0.1) 0%, 
                            rgba(255, 255, 255, 0.05) 100%
                          )
                        `,
                        backdropFilter: 'blur(10px)',
                        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                      }}
                      placeholder="Votre prénom"
                    />
                    {errors.firstName && (
                      <p className="text-red-300 text-sm mt-1 drop-shadow-md">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white text-sm font-semibold mb-2 drop-shadow-md">
                      Nom *
                    </label>
                    <input
                      {...register("lastName", { required: "Le nom est requis" })}
                      className="w-full px-4 py-4 sm:py-3 rounded-xl border border-white/30 text-white placeholder-gray-200 focus:border-white/50 focus:outline-none transition-all duration-300 backdrop-blur-md min-h-[48px] touch-manipulation"
                      style={{
                        background: `
                          linear-gradient(135deg, 
                            rgba(255, 255, 255, 0.1) 0%, 
                            rgba(255, 255, 255, 0.05) 100%
                          )
                        `,
                        backdropFilter: 'blur(10px)',
                        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                      }}
                      placeholder="Votre nom"
                    />
                    {errors.lastName && (
                      <p className="text-red-300 text-sm mt-1 drop-shadow-md">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-semibold mb-2 drop-shadow-md">
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
                    className="w-full px-4 py-3 rounded-xl border border-white/30 text-white placeholder-gray-200 focus:border-white/50 focus:outline-none transition-all duration-300 backdrop-blur-md"
                    style={{
                      background: `
                        linear-gradient(135deg, 
                          rgba(255, 255, 255, 0.1) 0%, 
                          rgba(255, 255, 255, 0.05) 100%
                        )
                      `,
                      backdropFilter: 'blur(10px)',
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                    }}
                    placeholder="votre@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-300 text-sm mt-1 drop-shadow-md">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-white text-sm font-semibold mb-2 drop-shadow-md">
                    Sujet *
                  </label>
                  <select
                    {...register("subject", { required: "Le sujet est requis" })}
                    className="w-full px-4 py-3 rounded-xl border border-white/30 text-white focus:border-white/50 focus:outline-none transition-all duration-300 backdrop-blur-md"
                    style={{
                      background: `
                        linear-gradient(135deg, 
                          rgba(255, 255, 255, 0.1) 0%, 
                          rgba(255, 255, 255, 0.05) 100%
                        )
                      `,
                      backdropFilter: 'blur(10px)',
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    <option value="" style={{ background: '#1a1a1a', color: '#fff' }}>Sélectionnez un sujet</option>
                    <option value="web" style={{ background: '#1a1a1a', color: '#fff' }}>Développement Web</option>
                    <option value="mobile" style={{ background: '#1a1a1a', color: '#fff' }}>Application Mobile</option>
                    <option value="ai" style={{ background: '#1a1a1a', color: '#fff' }}>Intelligence Artificielle</option>
                    <option value="growth" style={{ background: '#1a1a1a', color: '#fff' }}>Growth Hacking</option>
                    <option value="other" style={{ background: '#1a1a1a', color: '#fff' }}>Autre</option>
                  </select>
                  {errors.subject && (
                    <p className="text-red-300 text-sm mt-1 drop-shadow-md">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-white text-sm font-semibold mb-2 drop-shadow-md">
                    Message *
                  </label>
                  <textarea
                    {...register("message", { required: "Le message est requis" })}
                    rows={5}
                    className="w-full px-4 py-4 sm:py-3 rounded-xl border border-white/30 text-white placeholder-gray-200 focus:border-white/50 focus:outline-none transition-all duration-300 resize-none backdrop-blur-md touch-manipulation"
                    style={{
                      background: `
                        linear-gradient(135deg, 
                          rgba(255, 255, 255, 0.1) 0%, 
                          rgba(255, 255, 255, 0.05) 100%
                        )
                      `,
                      backdropFilter: 'blur(10px)',
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                    }}
                    placeholder="Décrivez votre projet..."
                  />
                  {errors.message && (
                    <p className="text-red-300 text-sm mt-1 drop-shadow-md">{errors.message.message}</p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 border border-white/30 backdrop-blur-xl relative overflow-hidden group min-h-[56px] touch-manipulation"
                  style={{
                    background: isSubmitting 
                      ? 'rgba(255, 255, 255, 0.05)' 
                      : `
                        linear-gradient(135deg, 
                          rgba(63, 131, 145, 0.8) 0%, 
                          rgba(63, 131, 145, 0.6) 100%
                        )
                      `,
                    backdropFilter: 'blur(15px)',
                    boxShadow: `
                      0 8px 32px rgba(63, 131, 145, 0.3),
                      inset 0 1px 0 rgba(255, 255, 255, 0.3)
                    `,
                    color: '#FFFFFF'
                  }}
                  whileHover={!isSubmitting ? { 
                    scale: 1.02,
                    boxShadow: "0 12px 40px rgba(63, 131, 145, 0.4)"
                  } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin relative z-10" />
                      <span className="relative z-10">Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} className="relative z-10" />
                      <span className="relative z-10">Envoyer le message</span>
                    </>
                  )}
                </motion.button>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-100 text-center p-4 rounded-2xl border border-green-400/30 backdrop-blur-xl"
                    style={{
                      background: `
                        linear-gradient(135deg, 
                          rgba(34, 197, 94, 0.15) 0%, 
                          rgba(34, 197, 94, 0.08) 100%
                        )
                      `,
                      backdropFilter: 'blur(15px)',
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    Message envoyé avec succès ! Je vous répondrai bientôt.
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-100 text-center p-4 rounded-2xl border border-red-400/30 backdrop-blur-xl"
                    style={{
                      background: `
                        linear-gradient(135deg, 
                          rgba(239, 68, 68, 0.15) 0%, 
                          rgba(239, 68, 68, 0.08) 100%
                        )
                      `,
                      backdropFilter: 'blur(15px)',
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    Erreur lors de l'envoi. Veuillez réessayer.
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>

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

export default App
