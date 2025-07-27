import { useState, useEffect, useRef } from 'react';
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
import NeuralNetwork3D from './components/NeuralNetwork3D';
import WebDevSection from './components/WebDevSection';
import GrowthRocketSection from './components/GrowthRocketSection';
import QuoteModal from './components/QuoteModal';
import TypewriterEffect from './components/TypewriterEffect';
import CredibilityDashboard from './components/CredibilityDashboard';
import ProjectModal from './components/ProjectModal';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, FileText, Download } from 'lucide-react';
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
        <div className="min-h-screen flex flex-col items-center justify-center px-2 w-full">
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
      <div className="min-h-screen flex items-center justify-center px-4 relative">
        <div className="text-center max-w-6xl" ref={heroTextRef}>
          <div className="hero-main-text mb-8">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white mb-4 leading-tight">
              👋 , je suis{' '}
              <span 
                style={{ 
                  color: '#3F8391',
                  textShadow: '0 0 30px rgba(63, 131, 145, 0.5)'
                }}
              >
                Jérémy
              </span>
            </h1>
          </div>
          
          <div className="hero-main-text">
            <div className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-gray-300 mb-8 sm:mb-12 lg:mb-16">
              Je{' '}
              <span style={{ color: '#3F8391' }}>
                <TypewriterEffect />
              </span>
            </div>
          </div>

          {/* Indicateur de scroll */}
          <div className="hero-subtitle absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2">
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
        className="min-h-[80vh] flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 px-4 py-12 lg:py-20"
      >
        {/* Photo de profil */}
        <div className="relative profile-image">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
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
            <span style={{ color: '#3F8391' }} className="font-semibold">AI & Data Engineer</span> freelance passionné avec une expertise complète en{' '}
            <span style={{ color: '#3F8391' }} className="font-semibold">développement web</span>,{' '}
            <span style={{ color: '#3F8391' }} className="font-semibold">applications mobiles</span> et{' '}
            <span style={{ color: '#3F8391' }} className="font-semibold">intelligence artificielle</span>.
            <br />
            Je transforme vos idées en solutions digitales performantes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 lg:mb-12">
            <motion.button 
              className="px-8 py-4 lg:px-10 lg:py-5 text-white font-semibold rounded-full transition-all duration-300 text-base lg:text-lg"
              style={{
                background: 'radial-gradient(ellipse at center, #3C3C3D 0%, #040F11 100%)',
                border: '2px solid #3F8391'
              }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: '#3F8391',
                boxShadow: '0 10px 30px rgba(63, 131, 145, 0.4)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              Voir mes projets
            </motion.button>
            <motion.button 
              className="px-8 py-4 lg:px-10 lg:py-5 font-semibold rounded-full transition-all duration-300 text-base lg:text-lg"
              style={{
                border: '2px solid #3F8391',
                color: '#3F8391',
                backgroundColor: 'transparent'
              }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: '#3F8391',
                color: '#FFFFFF',
                boxShadow: '0 10px 30px rgba(63, 131, 145, 0.4)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              Me contacter
            </motion.button>
          </div>

          {/* Logos École et Entreprise */}
          <div className="flex items-center justify-center lg:justify-start gap-8">
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
      shortDescription: "Pipeline de machine learning pour l'analyse et la reconnaissance visuelle avancée",
      fullDescription: "Développement d'un pipeline complet de machine learning utilisant des techniques d'intelligence artificielle pour l'analyse et la reconnaissance d'images. Le projet comprend la collecte de données, le préprocessing, l'entraînement de modèles de deep learning, et le déploiement en production.\n\nL'accent a été mis sur l'optimisation des performances et la scalabilité du système, permettant de traiter des milliers d'images par minute avec une précision élevée.",
      image: "/src/assets/iris/irislogo.png",
      date: "2023 - 2024",
      technologies: ["Python", "TensorFlow", "OpenCV", "Docker", "FastAPI", "PostgreSQL"],
      keyFeatures: [
        "Pipeline automatisé de traitement d'images",
        "Modèles de deep learning personnalisés",
        "API REST pour l'intégration",
        "Interface de monitoring en temps réel"
      ],
      achievements: [
        "Précision de 94% sur le dataset de test",
        "Temps de traitement réduit de 60%",
        "Architecture scalable jusqu'à 10k images/minute"
      ],
      media: {
        type: "image",
        src: "/src/assets/iris/irislogo.png"
      }
    },
    {
      id: 2,
      name: "LXP Gaming Platform",
      category: "Projet d'étude",
      shortDescription: "Plateforme d'apprentissage expérientiel combinant jeux vidéo et développement web",
      fullDescription: "Création d'une plateforme innovante combinant l'apprentissage par le jeu et le développement web. Le projet inclut la création de mini-jeux éducatifs intégrés dans une plateforme web moderne.\n\nL'approche gamifiée permet aux utilisateurs d'apprendre tout en s'amusant, avec un système de progression, de récompenses et de défis personnalisés selon le niveau de chaque apprenant.",
      image: "/src/assets/lxp/lxplogo.png",
      date: "2023",
      technologies: ["React", "Node.js", "Unity", "WebGL", "MongoDB", "Socket.io"],
      keyFeatures: [
        "Jeux éducatifs intégrés en WebGL",
        "Système de progression gamifié",
        "Tableaux de bord analytics",
        "Communication temps réel"
      ],
      achievements: [
        "Plus de 50 mini-jeux développés",
        "Taux d'engagement de 85%",
        "Interface web responsive et moderne"
      ],
      websiteUrl: "https://lxp-demo.example.com",
      media: {
        type: "image",
        src: "/src/assets/lxp/lxplogo.png"
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
      image: "/src/assets/orapi/orapilogo.png",
      date: "2023 - 2024",
      technologies: ["Python", "NLP", "PostgreSQL", "Docker", "FastAPI", "React"],
      keyFeatures: [
        "ChatBot avec IA conversationnelle",
        "Système de gestion de données clients",
        "Dashboard analytique temps réel",
        "Intégration avec les systèmes existants"
      ],
      achievements: [
        "Réduction de 40% du temps de réponse support",
        "Automatisation de 70% des requêtes clients",
        "Amélioration de la satisfaction client de 25%"
      ],
      media: {
        type: "image",
        src: "/src/assets/orapi/orapilogo.png"
      }
    },
    {
      id: 4,
      name: "ASC - Growth Marketing",
      category: "Expérience",
      shortDescription: "Stage en Growth Marketing - Growth hacking, développement web et design",
      fullDescription: "Stage au sein de l'ASC (Association Sportive et Culturelle) en tant que spécialiste Growth Marketing. Mission complète incluant la stratégie de croissance, le développement web, et la création d'identité visuelle.\n\nDéveloppement d'une stratégie growth hacking complète avec création du site web, optimisation SEO, campagnes marketing digitales, et mise en place d'outils d'analytics pour mesurer la performance.",
      image: "/src/assets/asc/asclogo.png",
      date: "2023",
      technologies: ["React", "WordPress", "Google Analytics", "Facebook Ads", "Figma", "Photoshop"],
      keyFeatures: [
        "Site web responsive moderne",
        "Stratégie SEO complète",
        "Campagnes publicitaires ciblées",
        "Dashboard de suivi des KPIs"
      ],
      achievements: [
        "Augmentation du trafic web de 200%",
        "Croissance des membres de 150%",
        "ROI publicitaire de 300%"
      ],
      websiteUrl: "https://asc-association.fr",
      media: {
        type: "image",
        src: "/src/assets/asc/asclogo.png"
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
      fullDescription: "Projet complet pour l'Institut Corail, spécialisé dans les soins de beauté et l'esthétique. Création d'une présence digitale complète incluant le site web, la stratégie SEO, et la mise en place d'une boutique en ligne.\n\nLe projet a nécessité une approche sur-mesure pour refléter l'élégance et le professionnalisme de l'institut, avec une attention particulière portée à l'expérience utilisateur et à la conversion client.",
      image: "/src/assets/institut-corail/logoinstitutcorail.png",
      date: "2024",
      technologies: ["React", "Shopify", "Stripe", "Google SEO", "Figma", "Photoshop"],
      keyFeatures: [
        "Site web vitrine élégant",
        "Boutique e-commerce intégrée",
        "Système de réservation en ligne",
        "Optimisation SEO complète"
      ],
      achievements: [
        "Augmentation des réservations de 180%",
        "Positionnement #1 sur Google local",
        "Taux de conversion e-commerce de 4.2%"
      ],
      websiteUrl: "https://institut-corail.fr",
      media: {
        type: "image",
        src: "/src/assets/institut-corail/Mockup.png"
      }
    },
    {
      id: 6,
      name: "Maison L.I.C",
      category: "Client freelance",
      shortDescription: "Création d'art floral - Développement web, design, SEO et e-commerce",
      fullDescription: "Développement complet de la présence digitale pour Maison L.I.C, spécialisée dans la création d'art floral haut de gamme. Le projet englobe la création d'un univers visuel unique, le développement d'un site e-commerce, et une stratégie SEO ciblée.\n\nL'accent a été mis sur la mise en valeur des créations florales à travers une galerie interactive et un système de commande personnalisé pour les événements sur-mesure.",
      image: "/src/assets/maisonlic/logo.png",
      date: "2024",
      technologies: ["WordPress", "WooCommerce", "Stripe", "SEO", "Photoshop", "Lightroom"],
      keyFeatures: [
        "Galerie interactive des créations",
        "Système de devis personnalisé",
        "Boutique e-commerce florale",
        "Blog et conseils floraux"
      ],
      achievements: [
        "Commandes en ligne +250%",
        "Visibilité locale multipliée par 5",
        "Panier moyen augmenté de 65%"
      ],
      websiteUrl: "https://maison-lic.fr",
      media: {
        type: "image",
        src: "/src/assets/maisonlic/logo.png"
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

      <div className="max-w-6xl mx-auto px-4 space-y-20">
        {/* Projets d'étude */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
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
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
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
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
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

      <div className="max-w-6xl mx-auto px-4 space-y-32">
        {/* Section IA avec réseau de neurones 3D */}
        <section className="flex justify-center">
          <div className="w-full max-w-6xl">
            <NeuralNetwork3D />
          </div>
        </section>

        {/* Section Développement Web */}
        <section className="flex justify-center">
          <div className="w-full max-w-6xl">
            <WebDevSection />
          </div>
        </section>

        {/* Section Growth Marketing */}
        <section className="flex justify-center">
          <div className="w-full max-w-6xl">
            <GrowthRocketSection />
          </div>
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
      icon: Github,
      name: "GitHub",
      url: "https://github.com/jeremyindelicato",
      color: "#333"
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/j%C3%A9r%C3%A9my-indelicato-1a3450290/",
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
    <div className="w-full min-h-screen py-16 pb-24">
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

      <div className="max-w-6xl mx-auto px-4">
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
