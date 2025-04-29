import React, { useEffect } from 'react';
import { FaExternalLinkAlt, FaGithub, FaTimes } from 'react-icons/fa';
import styles from './ProjectComponents.module.css';

const ProjectDetail = ({ project, onClose }) => {
  const {
    title,
    description,
    image,
    technologies = [],
    githubUrl,
    demoUrl,
    date,
    hackathon,
    awards = []
  } = project;

  // Format date as "Month Year"
  const formattedDate = date ? new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  }) : null;

  // Close modal when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    // Prevent scrolling on body while modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div 
        className={styles.modalContent} 
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={onClose}>
          <FaTimes />
        </button>

        {/* Project image */}
        <div className={styles.projectImageContainer}>
          {image ? (
            <img 
              src={image} 
              alt={title} 
              className={styles.projectImage}
            />
          ) : (
            <div className={styles.placeholderDetailImage}>
              <span>{title.charAt(0)}</span>
            </div>
          )}
        </div>

        {/* Project info */}
        <div className={styles.projectInfo}>
          <div className={styles.projectHeader}>
            <h2 className={styles.projectTitle}>{title}</h2>
            
            {/* Date and hackathon info */}
            <div className={styles.projectMeta}>
              {formattedDate && (
                <span className={styles.projectDate}>{formattedDate}</span>
              )}
              {hackathon && (
                <span className={styles.hackathonBadge}>{hackathon}</span>
              )}
            </div>

            {/* Awards section */}
            {awards.length > 0 && (
              <div className={styles.awardsSection}>
                <h4 className={styles.sectionTitle}>Awards</h4>
                <div className={styles.awardsList}>
                  {awards.map((award, index) => (
                    <div key={index} className={styles.awardBadge}>🏆 {award}</div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Project description */}
          <div className={styles.projectDescription}>
            <p>{description || "No description available"}</p>
          </div>

          {/* Technologies */}
          {technologies.length > 0 && (
            <div className={styles.detailSection}>
              <h4 className={styles.sectionTitle}>Technologies</h4>
              <div className={styles.techGrid}>
                {technologies.map((tech, index) => (
                  <span key={index} className={styles.detailTechBadge}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className={styles.actionButtons}>
            {githubUrl && (
              <a 
                href={githubUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.actionButton}
              >
                <FaGithub /> GitHub
              </a>
            )}
            {demoUrl && (
              <a 
                href={demoUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`${styles.actionButton} ${styles.primaryButton}`}
              >
                <FaExternalLinkAlt /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail; 