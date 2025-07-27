import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, ArrowUp } from 'lucide-react';
import TextScrambleBlock from './TextScrambleBlock';

gsap.registerPlugin(ScrollTrigger);

const BottomSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const backgroundRef = useRef(null);

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "jeremy@example.com",
      link: "mailto:jeremy@example.com"
    },
    {
      icon: Phone,
      title: "Téléphone",
      value: "+33 7 80 04 17 08",
      link: "tel:+33780041708"
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
      url: "https://linkedin.com/in/jeremy",
      color: "#0A66C2"
    },
    {
      icon: Twitter,
      name: "Twitter",
      url: "https://twitter.com/jeremy",
      color: "#1DA1F2"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation d'entrée de la section
      gsap.fromTo(sectionRef.current, {
        y: 100,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        }
      });

      // Animation des cartes avec stagger
      gsap.fromTo(cardsRef.current, {
        y: 80,
        opacity: 0,
        scale: 0.8
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Animation de parallax pour le background
      gsap.to(backgroundRef.current, {
        y: -50,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      // Animation flottante continue
      gsap.to(".floating-element", {
        y: -20,
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: {
          amount: 1,
          from: "random"
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="relative w-full py-20 overflow-hidden">
      {/* Background avec effets parallax */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(63, 131, 145, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(63, 131, 145, 0.05) 0%, transparent 50%)
          `
        }}
      />

      <div className="max-w-6xl mx-auto px-4">
        {/* Text Scramble Block */}
        <motion.div 
          className="flex justify-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <TextScrambleBlock />
        </motion.div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactInfo.map((contact, index) => (
            <motion.div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="group relative floating-element"
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              <div 
                className="relative h-full p-8 rounded-3xl border border-white/10 backdrop-blur-xl overflow-hidden cursor-pointer"
                style={{
                  background: `
                    linear-gradient(135deg, 
                      rgba(255, 255, 255, 0.1) 0%, 
                      rgba(255, 255, 255, 0.05) 50%, 
                      rgba(0, 0, 0, 0.1) 100%
                    ),
                    radial-gradient(circle at 30% 30%, rgba(63, 131, 145, 0.1) 0%, transparent 50%)
                  `,
                  boxShadow: `
                    0 8px 32px rgba(0, 0, 0, 0.3),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.1)
                  `
                }}
                onClick={() => contact.link && window.open(contact.link, '_blank')}
              >
                {/* Glow effect au hover */}
                <div 
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, rgba(63, 131, 145, 0.4) 0%, transparent 70%)`
                  }}
                />
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                
                {/* Floating reflections */}
                <div className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-xl opacity-60" />
                <div className="absolute bottom-4 right-4 w-8 h-8 bg-gradient-to-tl from-white/10 to-transparent rounded-full blur-lg opacity-40" />

                <div className="relative z-10 text-center">
                  <div 
                    className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `
                        linear-gradient(135deg, 
                          rgba(255, 255, 255, 0.15) 0%, 
                          rgba(255, 255, 255, 0.05) 100%
                        )
                      `,
                      boxShadow: `
                        0 4px 16px rgba(0, 0, 0, 0.2),
                        inset 0 1px 0 rgba(255, 255, 255, 0.3)
                      `
                    }}
                  >
                    <contact.icon size={28} color="#3F8391" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {contact.title}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {contact.value}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Links */}
        <motion.div 
          className="flex items-center justify-center gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative floating-element"
              whileHover={{ 
                scale: 1.1, 
                y: -5,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center border border-white/20 backdrop-blur-xl transition-all duration-300"
                style={{
                  background: `
                    linear-gradient(135deg, 
                      rgba(255, 255, 255, 0.1) 0%, 
                      rgba(255, 255, 255, 0.05) 100%
                    )
                  `,
                  boxShadow: `
                    0 4px 16px rgba(0, 0, 0, 0.2),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2)
                  `
                }}
              >
                <social.icon size={24} color="#FFFFFF" />
                
                {/* Glow effect */}
                <div 
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle, ${social.color}40 0%, transparent 70%)`,
                    filter: 'blur(8px)'
                  }}
                />
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* CTA Final */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.button
            onClick={scrollToTop}
            className="group relative px-12 py-4 rounded-full font-semibold text-white overflow-hidden"
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
              boxShadow: "0 12px 40px rgba(63, 131, 145, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            <div className="relative flex items-center gap-3">
              <ArrowUp size={20} />
              <span>Retour en haut</span>
            </div>
          </motion.button>
          
          <p className="text-gray-400 text-sm mt-6">
            © 2024 Jeremy Indelicato. Tous droits réservés.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default BottomSection;