import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, FileText, Calendar, Tag } from 'lucide-react';

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          
          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/20"
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
                0 25px 60px rgba(0, 0, 0, 0.5),
                inset 0 1px 0 rgba(255, 255, 255, 0.2)
              `
            }}
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white z-10 transition-all duration-200"
              style={{
                background: `
                  linear-gradient(135deg, 
                    rgba(255, 255, 255, 0.15) 0%, 
                    rgba(255, 255, 255, 0.05) 100%
                  )
                `,
                backdropFilter: 'blur(10px)'
              }}
              whileHover={{ 
                scale: 1.1,
                backgroundColor: 'rgba(239, 68, 68, 0.3)'
              }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={20} />
            </motion.button>

            <div className="p-8">
              {/* Header */}
              <motion.div
                className="mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span 
                    className="px-4 py-2 rounded-full text-sm font-medium border"
                    style={{
                      backgroundColor: 'rgba(63, 131, 145, 0.2)',
                      color: '#3F8391',
                      borderColor: 'rgba(63, 131, 145, 0.3)'
                    }}
                  >
                    {project.category}
                  </span>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Calendar size={16} />
                    <span>{project.date}</span>
                  </div>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {project.name}
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  {project.shortDescription}
                </p>
              </motion.div>

              {/* Media Section */}
              {project.media && (
                <motion.div
                  className="mb-8 rounded-2xl overflow-hidden border border-white/10"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  {project.media.type === 'image' ? (
                    <img
                      src={project.media.src}
                      alt={project.name}
                      className="w-full h-64 md:h-80 object-cover"
                    />
                  ) : project.media.type === 'video' ? (
                    <video
                      src={project.media.src}
                      controls
                      className="w-full h-64 md:h-80 object-cover"
                      poster={project.media.poster}
                    />
                  ) : null}
                </motion.div>
              )}

              {/* Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Description */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <FileText size={20} color="#3F8391" />
                    Description du projet
                  </h3>
                  <div className="text-gray-300 leading-relaxed space-y-4">
                    {project.fullDescription.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </motion.div>

                {/* Details */}
                <motion.div
                  className="space-y-6"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  {/* Technologies */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <Tag size={18} color="#3F8391" />
                        Technologies utilisées
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 rounded-full text-sm border transition-colors hover:bg-white/5"
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
                  )}

                  {/* Key Features */}
                  {project.keyFeatures && project.keyFeatures.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">
                        Fonctionnalités clés
                      </h4>
                      <ul className="space-y-2">
                        {project.keyFeatures.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-gray-300">
                            <div 
                              className="w-2 h-2 rounded-full flex-shrink-0" 
                              style={{ backgroundColor: '#3F8391' }} 
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Achievements */}
                  {project.achievements && project.achievements.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">
                        Réalisations
                      </h4>
                      <ul className="space-y-2">
                        {project.achievements.map((achievement, index) => (
                          <li key={index} className="flex items-center gap-2 text-gray-300">
                            <div 
                              className="w-2 h-2 rounded-full flex-shrink-0" 
                              style={{ backgroundColor: '#10B981' }} 
                            />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Action Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-white/10"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                {project.websiteUrl && (
                  <motion.a
                    href={project.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, #3F8391 0%, #5ba3b0 100%)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: '0 4px 16px rgba(63, 131, 145, 0.3)'
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 6px 20px rgba(63, 131, 145, 0.4)'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={18} />
                    Voir le site web
                  </motion.a>
                )}
                
                {project.summaryUrl && (
                  <motion.a
                    href={project.summaryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold border transition-all duration-300"
                    style={{
                      border: '2px solid #3F8391',
                      color: '#3F8391',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)'
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: 'rgba(63, 131, 145, 0.1)'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FileText size={18} />
                    Résumé du projet
                  </motion.a>
                )}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;