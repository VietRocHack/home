import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectDetail from './ProjectDetail';
import styles from './ProjectComponents.module.css';

const ProjectGrid = ({ projects, filters = [] }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 9;
  
  // Calculate total pages
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  
  // Get current projects for pagination
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProjects.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            onClick={() => handleProjectClick(project)}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={`${styles.pagination} mt-12`}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => changePage(page)}
              className={`${styles.pageButton} ${
                page === currentPage ? styles.activePageButton : ''
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default ProjectGrid; 