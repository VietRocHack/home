import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './ProjectComponents.module.css';

const ProjectBrowser = ({ projects, technologies, hackathons, onProjectSelect }) => {
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState([]);
  const [selectedHackathon, setSelectedHackathon] = useState('');
  const [activeSort, setActiveSort] = useState('newest');
  
  // Filter and sort the projects whenever filter criteria change
  useEffect(() => {
    let results = [...projects];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        project => 
          project.title.toLowerCase().includes(query) || 
          project.shortDescription.toLowerCase().includes(query)
      );
    }
    
    // Apply technology filter
    if (selectedTech.length > 0) {
      results = results.filter(project => 
        selectedTech.every(tech => project.technologies.includes(tech))
      );
    }
    
    // Apply hackathon filter
    if (selectedHackathon) {
      results = results.filter(project => project.hackathonName === selectedHackathon);
    }
    
    // Apply sorting
    if (activeSort === 'newest') {
      results.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (activeSort === 'oldest') {
      results.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (activeSort === 'alphabetical') {
      results.sort((a, b) => a.title.localeCompare(b.title));
    }
    
    setFilteredProjects(results);
  }, [searchQuery, selectedTech, selectedHackathon, activeSort, projects]);
  
  // Toggle selection of a technology filter
  const toggleTechFilter = (tech) => {
    if (selectedTech.includes(tech)) {
      setSelectedTech(selectedTech.filter(t => t !== tech));
    } else {
      setSelectedTech([...selectedTech, tech]);
    }
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedTech([]);
    setSelectedHackathon('');
    setActiveSort('newest');
  };

  return (
    <section id="project-browser" className="py-16 bg-gray-900/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <h2 className="text-3xl font-bold mb-4 md:mb-0">Project Browser</h2>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects..."
                className="bg-gray-800 rounded-lg px-4 py-2 w-full sm:w-64 text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF3C38] pl-10"
              />
              <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <button 
              onClick={resetFilters}
              className={`${styles.actionButton} ${styles.secondaryButton}`}
            >
              Reset Filters
            </button>
          </div>
        </div>
        
        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div>
              <h3 className="text-sm uppercase text-gray-400 mb-2">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {technologies.map(tech => (
                  <button
                    key={tech}
                    onClick={() => toggleTechFilter(tech)}
                    className={`${styles.filterChip} ${selectedTech.includes(tech) ? styles.activeChip : ''}`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm uppercase text-gray-400 mb-2">Hackathons</h3>
              <select
                value={selectedHackathon}
                onChange={(e) => setSelectedHackathon(e.target.value)}
                className="bg-gray-800 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF3C38]"
              >
                <option value="">All Hackathons</option>
                {hackathons.map(hackathon => (
                  <option key={hackathon} value={hackathon}>{hackathon}</option>
                ))}
              </select>
            </div>
            
            <div>
              <h3 className="text-sm uppercase text-gray-400 mb-2">Sort By</h3>
              <div className="flex gap-2">
                {['newest', 'oldest', 'alphabetical'].map(sort => (
                  <button
                    key={sort}
                    onClick={() => setActiveSort(sort)}
                    className={`${styles.sortButton} ${activeSort === sort ? styles.activeSortButton : ''}`}
                  >
                    {sort.charAt(0).toUpperCase() + sort.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-400">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        </div>
        
        {/* Project Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
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
        ) : (
          <div className="text-center py-16">
            <svg className="mx-auto h-12 w-12 text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-medium text-gray-300 mb-1">No projects found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            <button 
              onClick={resetFilters}
              className={`${styles.actionButton} ${styles.tertiaryButton} mt-4`}
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectBrowser; 