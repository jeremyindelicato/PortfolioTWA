import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      className="w-full py-16 mt-20"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto px-4 text-center">
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
  );
};

export default Footer;