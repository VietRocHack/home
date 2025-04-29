import React from 'react';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import styles from './ProjectComponents.module.css';

const ProjectCard = ({ project, onClick }) => {
  const {
    title,
    description,
    image,
    technologies = [],
    featured,
    date,
  } = project;

  // Format date as "Month Year"
  const formattedDate = date ? new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric'
  }) : null;

  // Truncate description if too long
  const truncatedDescription = description && description.length > 100
    ? `${description.substring(0, 100)}...`
    : description;

  // Show only first 3 technologies with "+X more" indicator if needed
  const visibleTechs = technologies.slice(0, 3);
  const additionalTechsCount = technologies.length - 3;

  return (
    <div className={styles.projectCard} onClick={onClick}>
      {/* Featured badge */}
      {featured && <div className={styles.featuredBadge}>Featured</div>}

      {/* Project image */}
      <div className={styles.cardImageContainer}>
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className={styles.cardImage}
          />
        ) : (
          <div className={styles.placeholderImage}>
            <span>{title.charAt(0)}</span>
          </div>
        )}
      </div>

      {/* Project content */}
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {formattedDate && <span className="text-xs text-gray-400">{formattedDate}</span>}
        </div>
        
        <p className={styles.cardDescription}>
          {truncatedDescription || "No description available"}
        </p>

        {/* Technology badges */}
        {technologies.length > 0 && (
          <div className={styles.techList}>
            {visibleTechs.map((tech, index) => (
              <span key={index} className={styles.techBadge}>{tech}</span>
            ))}
            {additionalTechsCount > 0 && (
              <span className={styles.moreTechBadge}>+{additionalTechsCount} more</span>
            )}
          </div>
        )}

        {/* View details link */}
        <div className={styles.cardViewDetails}>
          <span>View details</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard; 