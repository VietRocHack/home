import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './ProjectComponents.module.css';

const ProjectIntro = ({ featuredProjects, onProjectSelect }) => {
  return (
    <section className="min-h-screen flex flex-col justify-center py-16 relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-8">
          Our <span className="text-[#FF3C38]">Projects</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mb-16">
          Explore our hackathon projects ranging from innovative web applications to machine learning solutions.
          Each project represents our team's collaborative effort, creativity, and technical skills.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              className={`${styles.projectCard} bg-gray-900 rounded-xl overflow-hidden cursor-pointer`}
              onClick={() => onProjectSelect(project.id)}
            >
              <div className={styles.projectImage}>
                <Image
                  src={project.coverImage || '/images/placeholder-project.jpg'}
                  alt={project.title}
                  width={400}
                  height={225}
                  className="w-full object-cover h-48"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4 line-clamp-2">{project.shortDescription}</p>
                <div className="flex flex-wrap mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className={styles.techBadge}>{tech}</span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className={styles.techBadge}>+{project.technologies.length - 3} more</span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">{project.hackathonName}</span>
                  {project.achievement && (
                    <span className={styles.achievementBadge}>{project.achievement}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button 
            onClick={() => {
              const browserSection = document.getElementById('project-browser');
              if (browserSection) {
                browserSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className={`${styles.actionButton} ${styles.primaryButton} mx-auto`}
          >
            Browse All Projects
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectIntro; 