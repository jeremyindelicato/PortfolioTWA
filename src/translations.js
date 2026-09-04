export const translations = {
  // Navigation
  nav: {
    about: { fr: 'À propos de moi', en: 'About Me' },
    projects: { fr: 'Projets & Expérience', en: 'Projects & Experience' },
    contact: { fr: 'Contact', en: 'Contact' }
  },

  // Hero Section
  hero: {
    name: { fr: 'Jérémy Indelicato', en: 'Jérémy Indelicato' },
    title: { fr: 'Data, IA & BI pour la santé', en: 'Data, AI & BI for Healthcare' },
    subtitle: {
      fr: '+3 ans d\'expériences',
      en: '+3 years of experience'
    },
    ctaContact: { fr: 'Me Contacter', en: 'Contact Me' },
    ctaProjects: { fr: 'Voir mes projets →', en: 'View my projects →' },
    scrollDown: { fr: 'Défiler vers le bas', en: 'Scroll down' }
  },

  // About Section
  about: {
    description: {
      fr: 'AI & Data Scientist chez Stryker, Mes services couvrent toute la chaîne data et la création de sites web intégrant analytics et responsive design. Je transforme vos idées en leviers concrets de croissance, portés par une forte expérience dans le secteur médical, notamment en analyses médico-économiques.',
      en: 'AI & Data Scientist at Stryker, My services cover the entire data chain and the creation of websites integrating analytics and responsive design. I transform your ideas into concrete growth drivers, supported by strong experience in the medical sector, particularly in medico-economic analysis.'
    },
    school: { fr: 'École', en: 'School' },
    internship: { fr: 'Alternance', en: 'Internship' }
  },

  // Skills Section
  skills: {
    keywords: {
      fr: 'Dashboard Médico-économie Automatisation Scraping ETL RAG MCP',
      en: 'Dashboard Medico-economics Automation Scraping ETL RAG MCP'
    }
  },

  // Data/AI Toggle Section
  dataAi: {
    data: { fr: 'DATA', en: 'DATA' },
    ai: { fr: 'AI', en: 'AI' },
    dataDescription: {
      fr: 'Mes services de data couvrent toute la chaîne : collecte (APIs, données publiques), transformation, puis analyse et mise en valeur actionable. Une forte expérience dans le secteur médical, notamment en analyses médico‑économiques, permet d\'adresser des enjeux métiers exigeants.',
      en: 'My data services cover the entire chain: collection (APIs, public data), transformation, then analysis and actionable insights. Strong experience in the medical sector, particularly in medico-economic analysis, enables addressing demanding business challenges.'
    },
    aiDescription: {
      fr: 'Mes solutions d\'IA combinent implémentation de LLM, automatisation intelligente et architectures avancées (MCP, RAG avec recherche vectorielle) pour exploiter pleinement vos données. Des techniques de modélisation comme la régression logistique permettent des prédictions fiables.',
      en: 'My AI solutions combine LLM implementation, intelligent automation and advanced architectures (MCP, RAG with vector search) to fully leverage your data. Modeling techniques like logistic regression enable reliable predictions.'
    }
  },

  // Technologies Section
  technologies: {
    title: {
      fr: 'TECHNOLOGIES MAÎTRISÉES',
      en: 'MASTERED TECHNOLOGIES'
    }
  },

  // Web Section
  web: {
    title: { fr: 'WEB', en: 'WEB' },
    description: {
      fr: 'Mes solutions de développement web proposent des sites sur mesure (vitrine, e‑commerce, applications) avec un responsive design optimisé pour mobile, bâtis sur des technologies dynamiques et actuelles, et intégrant la gestion des données d\'analytics.',
      en: 'My web development solutions offer custom websites (showcase, e-commerce, applications) with mobile-optimized responsive design, built on dynamic and current technologies, and integrating analytics data management.'
    },
    description2: {
      fr: 'Une expérience fluide, moderne et performante, conçue pour convertir, fidéliser et piloter la croissance grâce à la data.',
      en: 'A fluid, modern and high-performance experience, designed to convert, retain and drive growth through data.'
    }
  },

  // Footer
  footer: {
    downloadCV: { fr: 'Télécharger mon CV', en: 'Download my CV' },
    rights: {
      fr: '© 2025 Jérémy Indelicato. Tous droits réservés.',
      en: '© 2025 Jérémy Indelicato. All rights reserved.'
    }
  },

  // Inspiration Marquee
  inspiration: {
    text: { fr: 'ce sont mes inspirations', en: 'these are my inspirations' }
  },

  // Projects Page
  projects: {
    studyProjects: { fr: 'Projets d\'étude', en: 'Study Projects' },
    professionalExperience: {
      fr: 'Expériences professionnelles',
      en: 'Professional Experience'
    },
    videoGames: { fr: 'Jeux vidéos', en: 'Video Games' },
    viewDetails: { fr: 'Voir les détails', en: 'View details' },
    technologies: { fr: 'Technologies', en: 'Technologies' },
    responsibilities: { fr: 'Responsabilités', en: 'Responsibilities' },
    achievements: { fr: 'Réalisations', en: 'Achievements' },
    visitWebsite: { fr: 'Visiter le site', en: 'Visit website' },
    technicalDoc: { fr: 'Documentation technique', en: 'Technical documentation' },
    close: { fr: 'Fermer', en: 'Close' }
  },

  // Contact Page
  contact: {
    title: { fr: 'Restons connectés', en: 'Let\'s stay connected' },
    followMe: { fr: 'Suivez-moi', en: 'Follow me' },
    getQuote: { fr: 'Demander un devis', en: 'Request a quote' },
    email: { fr: 'Email', en: 'Email' },
    phone: { fr: 'Téléphone', en: 'Phone' },
    location: { fr: 'Localisation', en: 'Location' }
  },

  // Project Data - Study Projects
  studyProjectsData: {
    hackaton: {
      name: { fr: 'Hackaton Élysée', en: 'Élysée Hackathon' },
      category: { fr: 'Projet d\'étude', en: 'Study Project' },
      shortDescription: {
        fr: 'Solution prédictive et interactive pour anticiper les épidémies de grippe en France',
        en: 'Predictive and interactive solution to anticipate flu epidemics in France'
      },
      fullDescription: {
        fr: 'Développement d\'une solution prédictive et interactive permettant de centraliser les données pour anticiper et comprendre les dynamiques épidémiques et hospitalières de la grippe en France. Le projet vise à dépasser les limites des outils de surveillance actuels (souvent statiques, non croisés ou complexes).\n\nLe système s\'articule autour du traitement de données publiques (Météo France, Insee, Santé Publique France, data.gouv.fr) qui sont nettoyées, agrégées et croisées (densité de population, couverture vaccinale, syndromes grippaux et météo).\n\nL\'équipe a mis en œuvre trois modèles complémentaires de Machine Learning : XGBoost pour la prédiction des foyers épidémiques, un modèle de régression pour les taux de passages aux urgences, et SARIMAX pour la prédiction des hospitalisations basée sur les séries temporelles.',
        en: 'Development of a predictive and interactive solution to centralize data and anticipate and understand the epidemic and hospital dynamics of influenza in France. The project aims to overcome the limitations of current surveillance tools (often static, non-cross-referenced, or complex).\n\nThe system is built around processing public data (Météo France, Insee, Santé Publique France, data.gouv.fr) which is cleaned, aggregated, and cross-referenced (population density, vaccination coverage, flu-like syndromes, and weather).\n\nThe team implemented three complementary Machine Learning models: XGBoost for predicting epidemic hotspots, a regression model for emergency room visit rates, and SARIMAX for hospitalization prediction based on time series.'
      },
      keyFeatures: [
        { fr: 'Dashboard interactif Streamlit avec visualisations dynamiques (Plotly, Matplotlib, Seaborn)', en: 'Interactive Streamlit dashboard with dynamic visualizations (Plotly, Matplotlib, Seaborn)' },
        { fr: 'Modèle XGBoost pour détection des foyers épidémiques (35 features : météo, densité, âge)', en: 'XGBoost model for epidemic hotspot detection (35 features: weather, density, age)' },
        { fr: 'Modèle de régression pour prédiction des passages aux urgences', en: 'Regression model for emergency room visit prediction' },
        { fr: 'Modèle SARIMAX pour prédiction saisonnière des hospitalisations', en: 'SARIMAX model for seasonal hospitalization prediction' }
      ],
      achievements: [
        { fr: 'Centralisation et croisement de multiples sources de données publiques', en: 'Centralization and cross-referencing of multiple public data sources' },
        { fr: 'Système de prédiction multi-niveaux (foyers, urgences, hospitalisations)', en: 'Multi-level prediction system (hotspots, emergencies, hospitalizations)' },
        { fr: 'Identification des zones d\'alerte épidémique grâce aux patterns complexes', en: 'Identification of epidemic alert zones through complex patterns' },
        { fr: 'Perspectives d\'amélioration : suivi temps réel pharmacies, déplacements SNCF, eaux usées', en: 'Improvement prospects: real-time pharmacy tracking, SNCF travel, wastewater' }
      ]
    },
    startTrade: {
      name: { fr: 'Start & Trade', en: 'Start & Trade' },
      category: { fr: 'Projet d\'étude', en: 'Study Project' },
      shortDescription: {
        fr: 'Assistant IA pédagogique pour jeunes investisseurs avec données financières en temps réel',
        en: 'Educational AI assistant for young investors with real-time financial data'
      },
      fullDescription: {
        fr: 'Développement d\'un assistant IA pédagogique et gratuit, accessible 24h/24 et 7j/7, pour guider les jeunes investisseurs (18-30 ans) face à la complexité des informations financières. L\'application permet d\'accéder à des données financières en temps réel (Actions, ETF, Indices, Cryptos) et de s\'éduquer de manière progressive.\n\nL\'objectif est de proposer un système entièrement local et open-source, intégrant des règles strictes (guardrails) pour éviter de donner des conseils d\'investissement personnalisés ou des prédictions de prix, tout en garantissant la protection de la vie privée des utilisateurs.\n\nL\'architecture repose sur FastAPI comme orchestrateur, Ollama avec le modèle Qwen2.5:7b pour l\'IA conversationnelle, et un système de scraping via yfinance pour extraire plus de 25 métriques financières en temps réel depuis Yahoo Finance.',
        en: 'Development of a free educational AI assistant, accessible 24/7, to guide young investors (18-30 years) through the complexity of financial information. The application provides access to real-time financial data (Stocks, ETFs, Indices, Cryptos) and progressive education.\n\nThe goal is to offer a fully local and open-source system, integrating strict rules (guardrails) to avoid providing personalized investment advice or price predictions, while ensuring user privacy protection.\n\nThe architecture is based on FastAPI as orchestrator, Ollama with Qwen2.5:7b model for conversational AI, and a scraping system via yfinance to extract over 25 real-time financial metrics from Yahoo Finance.'
      },
      keyFeatures: [
        { fr: 'Assistant IA 100% local avec modèle Qwen2.5:7b (7B paramètres, 32k contexte)', en: '100% local AI assistant with Qwen2.5:7b model (7B parameters, 32k context)' },
        { fr: 'Données financières en temps réel (Actions, ETF, Indices, Cryptos)', en: 'Real-time financial data (Stocks, ETFs, Indices, Cryptos)' },
        { fr: 'Système de guardrails pour éviter conseils personnalisés et prédictions', en: 'Guardrails system to avoid personalized advice and predictions' },
        { fr: 'Knowledge Base locale avec concepts financiers théoriques fiables', en: 'Local Knowledge Base with reliable theoretical financial concepts' }
      ],
      achievements: [
        { fr: 'Zéro hallucination sur les données financières grâce à la contextualisation forcée', en: 'Zero hallucination on financial data through forced contextualization' },
        { fr: 'Protection des débutants via alertes automatiques sur les cryptomonnaies', en: 'Beginner protection via automatic cryptocurrency alerts' },
        { fr: 'Architecture 100% locale garantissant la vie privée (aucune donnée cloud)', en: '100% local architecture ensuring privacy (no cloud data)' },
        { fr: 'Scraping optimisé : +25 métriques financières en ~500ms par ticker', en: 'Optimized scraping: +25 financial metrics in ~500ms per ticker' }
      ]
    },
    iris: {
      name: { fr: 'Iris Pipeline', en: 'Iris Pipeline' },
      category: { fr: 'Projet d\'étude', en: 'Study Project' },
      shortDescription: {
        fr: 'Pipeline de machine learning pour la prédiction de la largeur de sépale',
        en: 'Machine learning pipeline for sepal width prediction'
      },
      fullDescription: {
        fr: 'Développement d\'un pipeline de machine learning complet pour l\'analyse et la prédiction d\'une largeur de sépale. Le projet inclut la création d\'une API REST pour les prédictions, l\'utilisation de MLflow pour le suivi des modèles, et une base de données PostgreSQL pour stocker les données structurées.\n\nL\'objectif est de fournir une solution robuste et scalable pour le traitement d\'images, avec un focus sur la performance et la maintenabilité du code.\n\nLe projet a été réalisé dans le cadre de ma formation à Epitech.',
        en: 'Development of a complete machine learning pipeline for sepal width analysis and prediction. The project includes creating a REST API for predictions, using MLflow for model tracking, and a PostgreSQL database to store structured data.\n\nThe goal is to provide a robust and scalable solution for image processing, with a focus on performance and code maintainability.\n\nThe project was completed as part of my training at Epitech.'
      },
      keyFeatures: [
        { fr: 'Pipeline automatisé de traitement d\'images', en: 'Automated image processing pipeline' },
        { fr: 'API REST pour faire des prédictions via /predict', en: 'REST API for predictions via /predict' },
        { fr: 'Base de données PostgreSQL pour les données structurées', en: 'PostgreSQL database for structured data' },
        { fr: 'Tracking des modèles et métriques via MLflow', en: 'Model and metrics tracking via MLflow' }
      ],
      achievements: [
        { fr: 'MSE < 0.1 avec RandomForestRegressor', en: 'MSE < 0.1 with RandomForestRegressor' },
        { fr: 'Containerisation et orchestration réussies avec Docker Compose', en: 'Successful containerization and orchestration with Docker Compose' },
        { fr: 'Pipeline traçable et maintenable', en: 'Traceable and maintainable pipeline' }
      ]
    }
  },

  // Project Data - Professional Experiences
  experiencesData: {
    stryker: {
      name: { fr: 'Stryker - Data / AI Scientist', en: 'Stryker - Data / AI Scientist' },
      category: { fr: 'Expérience', en: 'Experience' },
      shortDescription: {
        fr: 'Alternance en tant que Data/AI Scientist - Projets confidentiels en Data Science et IA',
        en: 'Internship as Data/AI Scientist - Confidential projects in Data Science and AI'
      },
      fullDescription: {
        fr: 'Actuellement en alternance chez Stryker, leader mondial des technologies médicales, en tant que Data/AI Scientist. L\'intégralité de mes projets sont confidentiels.\n\nJe travaille sur des projets innovants mêlant Data Science, Intelligence Artificielle et automatisation, en utilisant les dernières technologies du domaine pour créer des solutions d\'analyse et de traitement de données de santé publiques.\n\nMon rôle implique le développement de pipelines de données, l\'implémentation de systèmes RAG avec des LLMs locaux, et la création d\'outils d\'analyse avancés pour supporter les décisions stratégiques de l\'entreprise.',
        en: 'Currently in an internship at Stryker, a global leader in medical technologies, as a Data/AI Scientist. All my projects are confidential.\n\nI work on innovative projects combining Data Science, Artificial Intelligence, and automation, using the latest technologies in the field to create solutions for analyzing and processing public health data.\n\nMy role involves developing data pipelines, implementing RAG systems with local LLMs, and creating advanced analytical tools to support the company\'s strategic decisions.'
      },
      keyFeatures: [
        { fr: 'Développement de systèmes RAG (Retrieval-Augmented Generation) avec LLM', en: 'Development of RAG (Retrieval-Augmented Generation) systems with LLM' },
        { fr: 'Création de pipelines de données automatisés', en: 'Creation of automated data pipelines' },
        { fr: 'Implémentation de solutions MCP (Model Context Protocol)', en: 'Implementation of MCP (Model Context Protocol) solutions' },
        { fr: 'Outils d\'analyse et visualisation avec Power BI', en: 'Analysis and visualization tools with Power BI' }
      ],
      achievements: [
        { fr: 'Scraping et traitement de données de santé publiques', en: 'Scraping and processing of public health data' },
        { fr: 'Automatisation de processus métier via GitHub Actions', en: 'Business process automation via GitHub Actions' },
        { fr: 'Développement de modèles de Machine Learning pour l\'analyse prédictive', en: 'Development of Machine Learning models for predictive analysis' },
        { fr: 'Architecture de solutions IA scalables et sécurisées', en: 'Architecture of scalable and secure AI solutions' }
      ]
    },
    orapi: {
      name: { fr: 'Paredes Orapi - Data Engineering', en: 'Paredes Orapi - Data Engineering' },
      category: { fr: 'Expérience', en: 'Experience' },
      shortDescription: {
        fr: 'Alternance en tant que Data Engineer - Développement de ChatBot et gestion de données',
        en: 'Internship as Data Engineer - ChatBot development and data management'
      },
      fullDescription: {
        fr: 'Mission en alternance chez Orapi, spécialisée dans les solutions de nettoyage industriel. Développement d\'un système de ChatBot intelligent pour le support client et mise en place d\'une architecture de gestion des données robuste.\n\nLe projet a inclus l\'analyse des besoins clients, la conception d\'une base de données optimisée, et l\'implémentation d\'algorithmes de traitement du langage naturel pour améliorer l\'expérience utilisateur.',
        en: 'Internship mission at Orapi, specialized in industrial cleaning solutions. Development of an intelligent ChatBot system for customer support and implementation of a robust data management architecture.\n\nThe project included client needs analysis, optimized database design, and implementation of natural language processing algorithms to improve user experience.'
      },
      keyFeatures: [
        { fr: 'IA fine-tuné conversationnelle', en: 'Fine-tuned conversational AI' },
        { fr: 'Système de gestion de données produits', en: 'Product data management system' },
        { fr: 'Nettoyage et structuration des données', en: 'Data cleaning and structuring' },
        { fr: 'Intégration avec les systèmes existants', en: 'Integration with existing systems' }
      ],
      achievements: [
        { fr: 'Restructuration de la base de données (+ de 1000 produits)', en: 'Database restructuring (1000+ products)' },
        { fr: 'Gestion de la gamme de produit MDD', en: 'Private label product line management' },
        { fr: 'Amélioration de la satisfaction client', en: 'Improvement of customer satisfaction' }
      ]
    },
    hartmann: {
      name: { fr: 'Hartmann Group - Growth Hacking', en: 'Hartmann Group - Growth Hacking' },
      category: { fr: 'Expérience', en: 'Experience' },
      shortDescription: {
        fr: 'Stage en Growth Hacking - Développement web et design & croissance',
        en: 'Growth Hacking Internship - Web development, design & growth'
      },
      fullDescription: {
        fr: 'Stage de 7 mois chez Advanced Silicone Coating (Groupe Hartmann), une entreprise spécialisée dans les solutions de pansements. Le projet a consisté à développer une stratégie de growth marketing incluant la création d\'un site web moderne, l\'automatisation des campagnes de prospection, et l\'analyse des données de marché.\n\nL\'objectif était d\'augmenter la visibilité en ligne de l\'entreprise et de générer des leads qualifiés pour les équipes commerciales.',
        en: '7-month internship at Advanced Silicone Coating (Hartmann Group), a company specialized in bandage solutions. The project consisted of developing a growth marketing strategy including creating a modern website, automating prospecting campaigns, and analyzing market data.\n\nThe goal was to increase the company\'s online visibility and generate qualified leads for sales teams.'
      },
      keyFeatures: [
        { fr: 'Site web moderne', en: 'Modern website' },
        { fr: 'Création de contenus pour les réseaux sociaux', en: 'Social media content creation' },
        { fr: 'Analyse de données et de marché', en: 'Data and market analysis' },
        { fr: 'Automatisation de la prospection', en: 'Prospecting automation' }
      ],
      achievements: [
        { fr: 'Augmentation du trafic web de 28%', en: 'Web traffic increase of 28%' },
        { fr: 'Génération de plus de 30 leads qualifiés via les campagnes automatisées', en: 'Generation of over 30 qualified leads via automated campaigns' },
        { fr: 'Amélioration de la stratégie de contenu B2B', en: 'Improvement of B2B content strategy' }
      ]
    }
  },

  // Project Data - Freelance Projects
  freelanceProjectsData: {
    institutCorail: {
      name: { fr: 'Institut Corail', en: 'Institut Corail' },
      category: { fr: 'Client freelance', en: 'Freelance Client' },
      shortDescription: {
        fr: 'Institut de beauté et soins - Développement web, design, SEO et e-commerce',
        en: 'Beauty and care institute - Web development, design, SEO and e-commerce'
      },
      fullDescription: {
        fr: 'Projet complet pour l\'Institut Corail, spécialisé dans les soins de beauté et l\'esthétique. Création d\'une présence digitale complète incluant le site web, la stratégie SEO, et la mise en place d\'une boutique en ligne.\n\nLe projet a nécessité une approche sur-mesure pour refléter l\'élégance et le professionnalisme de l\'institut, avec une attention particulière portée à l\'expérience utilisateur et à la conversion client.\n\n L\'institut se situe à Loyettes, à 298 Rue du Bugey, 01360 Loyettes.',
        en: 'Complete project for Institut Corail, specialized in beauty care and aesthetics. Creation of a complete digital presence including the website, SEO strategy, and implementation of an online store.\n\nThe project required a custom approach to reflect the elegance and professionalism of the institute, with special attention to user experience and client conversion.\n\nThe institute is located in Loyettes, at 298 Rue du Bugey, 01360 Loyettes.'
      },
      keyFeatures: [
        { fr: 'Site web vitrine élégant', en: 'Elegant showcase website' },
        { fr: 'Boutique e-commerce intégrée', en: 'Integrated e-commerce store' },
        { fr: 'Système de réservation en ligne', en: 'Online booking system' },
        { fr: 'Optimisation SEO complète', en: 'Complete SEO optimization' }
      ],
      achievements: [
        { fr: 'Augmentation de la visibilité', en: 'Visibility increase' },
        { fr: 'Positionnement #1 sur Google local', en: '#1 ranking on local Google' },
        { fr: 'Taux de conversion e-commerce de 4.2%', en: 'E-commerce conversion rate of 4.2%' }
      ]
    },
    maisonLic: {
      name: { fr: 'Maison L.I.C', en: 'Maison L.I.C' },
      category: { fr: 'Client freelance', en: 'Freelance Client' },
      shortDescription: {
        fr: 'Création d\'art floral - Développement web, design, SEO et e-commerce',
        en: 'Floral art creation - Web development, design, SEO and e-commerce'
      },
      fullDescription: {
        fr: 'Développement complet de la présence digitale pour Maison L.I.C, spécialisée dans la création d\'art floral haut de gamme. Le projet englobe la création d\'un univers visuel unique, le développement d\'un site e-commerce, et une stratégie SEO ciblée.\n\nL\'accent a été mis sur la mise en valeur des créations florales à travers une galerie interactive et un système de commande personnalisé pour les événements sur-mesure.',
        en: 'Complete development of the digital presence for Maison L.I.C, specialized in high-end floral art creation. The project encompasses creating a unique visual universe, developing an e-commerce site, and a targeted SEO strategy.\n\nEmphasis was placed on showcasing floral creations through an interactive gallery and a custom order system for tailor-made events.'
      },
      keyFeatures: [
        { fr: 'Boutique e-commerce florale', en: 'Floral e-commerce store' },
        { fr: 'Mise en avant des créations', en: 'Showcasing creations' },
        { fr: 'Design optimisé pour les mobiles', en: 'Mobile-optimized design' },
        { fr: 'Système de paiement sécurisé', en: 'Secure payment system' }
      ],
      achievements: [
        { fr: 'SEO optimisé pour les recherches locales', en: 'SEO optimized for local searches' },
        { fr: 'Création d\'une communauté engagée', en: 'Creation of an engaged community' },
        { fr: 'Commande en ligne sur mesure', en: 'Custom online ordering' }
      ]
    }
  },

  // Project Data - Video Games
  videoGamesData: {
    iamCrypto: {
      name: { fr: 'IAM CRYPTO', en: 'IAM CRYPTO' },
      category: { fr: 'Jeu vidéo', en: 'Video Game' },
      shortDescription: {
        fr: 'Jeu rétro dédié à l\'univers de Playboi Carti - Collectez un maximum de cryptomonnaies',
        en: 'Retro game dedicated to Playboi Carti\'s universe - Collect maximum cryptocurrencies'
      },
      fullDescription: {
        fr: 'Un jeu vidéo rétro dédié à l\'univers de Playboi Carti, sans réellement de sens mais avec beaucoup de fun ! L\'objectif est simple : acquérir un maximum de cryptomonnaies dans cet univers pixel art inspiré de la culture hip-hop et crypto.\n\nDéveloppé en pur HTML, CSS et JavaScript vanilla, ce projet combine l\'esthétique rétro des jeux arcade avec la culture moderne de la crypto et du rap. Plongez dans une expérience de jeu nostalgique et addictive.\n\nUn projet fun et décalé qui mixe passion pour le développement web et culture pop contemporaine.',
        en: 'A retro video game dedicated to Playboi Carti\'s universe, without real meaning but with lots of fun! The objective is simple: acquire maximum cryptocurrencies in this pixel art universe inspired by hip-hop and crypto culture.\n\nDeveloped in pure HTML, CSS and vanilla JavaScript, this project combines retro arcade game aesthetics with modern crypto and rap culture. Dive into a nostalgic and addictive gaming experience.\n\nA fun and quirky project that mixes passion for web development and contemporary pop culture.'
      },
      keyFeatures: [
        { fr: 'Gameplay rétro inspiré des jeux arcade classiques', en: 'Retro gameplay inspired by classic arcade games' },
        { fr: 'Univers graphique pixel art dédié à Playboi Carti', en: 'Pixel art graphics universe dedicated to Playboi Carti' },
        { fr: 'Système de collecte de cryptomonnaies (Bitcoin, Ethereum, Pi Network)', en: 'Cryptocurrency collection system (Bitcoin, Ethereum, Pi Network)' },
        { fr: 'Développement vanilla sans framework pour performance optimale', en: 'Vanilla development without framework for optimal performance' }
      ],
      achievements: [
        { fr: 'Expérience de jeu fluide et addictive', en: 'Smooth and addictive gaming experience' },
        { fr: 'Design rétro authentique avec palette de couleurs vintage', en: 'Authentic retro design with vintage color palette' },
        { fr: 'Code optimisé pour des performances maximales', en: 'Optimized code for maximum performance' },
        { fr: 'Accessible directement depuis le navigateur', en: 'Accessible directly from browser' }
      ]
    },
    linguaXplore: {
      name: { fr: 'LinguaXplore', en: 'LinguaXplore' },
      category: { fr: 'Jeu vidéo', en: 'Video Game' },
      shortDescription: {
        fr: 'Jeu vidéo éducatif pour l\'apprentissage des langues',
        en: 'Educational video game for language learning'
      },
      fullDescription: {
        fr: 'Création d\'une plateforme immersive d\'apprentissage des langues à travers des jeux vidéo et des expériences interactives. Le projet inclut le développement d\'un site web moderne, l\'intégration de l\'intelligence artificielle pour les interactions avec les personnages non-joueurs (PNJ), et un système de progression gamifié.\n\nL\'objectif est de rendre l\'apprentissage des langues plus engageant et efficace en combinant technologie et pédagogie.\n\nNous avons développé un site web minimaliste et responsive, intégrant des éléments de design moderne et une interface utilisateur intuitive.',
        en: 'Creation of an immersive language learning platform through video games and interactive experiences. The project includes developing a modern website, integrating artificial intelligence for interactions with non-player characters (NPCs), and a gamified progression system.\n\nThe goal is to make language learning more engaging and effective by combining technology and pedagogy.\n\nWe developed a minimalist and responsive website, integrating modern design elements and an intuitive user interface.'
      },
      keyFeatures: [
        { fr: 'Quêtes linguistiques scénarisées en VR', en: 'Scripted linguistic quests in VR' },
        { fr: 'Site Web : Design minimaliste et responsive', en: 'Website: Minimalist and responsive design' },
        { fr: 'Intelligence artificielle pour les PNJ', en: 'Artificial intelligence for NPCs' },
        { fr: 'Système de progression et de niveaux', en: 'Progression and level system' }
      ],
      achievements: [
        { fr: 'Personnalisation du skin personnage', en: 'Character skin customization' },
        { fr: 'Chat de proximité', en: 'Proximity chat' },
        { fr: 'Interface web responsive et moderne', en: 'Responsive and modern web interface' }
      ]
    }
  }
};
