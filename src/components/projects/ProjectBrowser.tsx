"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/utils/dataUtils";

interface ProjectBrowserProps {
  projects: Array<Project & {
    hackathonName: string;
    hackathonYear: number;
    hackathonId: string;
    hackathonAchievement: string;
  }>;
}

export default function ProjectBrowser({ projects }: ProjectBrowserProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [techFilter, setTechFilter] = useState("");
  const [hackathonFilter, setHackathonFilter] = useState("");

  // Get unique tech stack items
  const techOptions = useMemo(() => {
    const techs = new Set<string>();
    projects.forEach(project => {
      project.techStack.forEach(tech => techs.add(tech));
    });
    return Array.from(techs).sort();
  }, [projects]);

  // Get unique hackathons
  const hackathonOptions = useMemo(() => {
    const hackathons = new Set<string>();
    projects.forEach(project => {
      hackathons.add(project.hackathonName);
    });
    return Array.from(hackathons).sort();
  }, [projects]);

  // Filter projects based on search and filters
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = searchQuery === "" || 
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesTech = techFilter === "" || 
        project.techStack.includes(techFilter);
      
      const matchesHackathon = hackathonFilter === "" || 
        project.hackathonName === hackathonFilter;

      return matchesSearch && matchesTech && matchesHackathon;
    });
  }, [projects, searchQuery, techFilter, hackathonFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-16">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-white mb-4">Project Browser</h2>
        <p className="text-[var(--foreground-secondary)] max-w-2xl mx-auto">
          Explore all our projects in one place. Filter by technology, year, or hackathon to find what interests you most.
        </p>
      </motion.div>
      
      {/* Filter Controls */}
      <motion.div 
        className="mb-8 flex flex-wrap gap-4 justify-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="px-4 py-2 bg-[var(--background)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent-red)] w-full md:w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute right-3 top-2.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <select 
          className="px-4 py-2 bg-[var(--background)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent-red)]"
          value={techFilter}
          onChange={(e) => setTechFilter(e.target.value)}
        >
          <option value="">All Technologies</option>
          {techOptions.map(tech => (
            <option key={tech} value={tech}>{tech}</option>
          ))}
        </select>
        
        <select 
          className="px-4 py-2 bg-[var(--background)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent-red)]"
          value={hackathonFilter}
          onChange={(e) => setHackathonFilter(e.target.value)}
        >
          <option value="">All Hackathons</option>
          {hackathonOptions.map(hackathon => (
            <option key={hackathon} value={hackathon}>{hackathon}</option>
          ))}
        </select>
      </motion.div>
      
      {/* Project Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
      >
        {filteredProjects.length === 0 ? (
          <div className="col-span-full py-12 text-center">
            <p className="text-[var(--foreground-secondary)] text-xl">No projects found matching your criteria.</p>
            <button 
              className="mt-4 px-4 py-2 bg-[var(--accent-red)] text-white rounded-lg hover:bg-opacity-80 transition-all"
              onClick={() => {
                setSearchQuery("");
                setTechFilter("");
                setHackathonFilter("");
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <div 
              key={`card-${project.id}`}
              className="bg-[var(--background)] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-gray-800 hover:border-gray-700"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={`/${project.thumbnail}`}
                  alt={project.name}
                  fill
                  className="object-cover transform transition-transform duration-700 hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] to-transparent opacity-80"></div>
                
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                  <span className="text-sm text-[var(--accent-yellow)] bg-black bg-opacity-50 px-2 py-1 rounded">
                    {project.hackathonName}
                  </span>
                  <span className="text-sm text-[var(--foreground-secondary)]">{project.hackathonYear}</span>
                </div>
                
                {project.achievements.length > 0 && (
                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-2 py-1 bg-[var(--accent-yellow)] bg-opacity-90 text-black rounded text-xs font-medium">
                      {project.achievements[0]}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2 text-[var(--foreground)] hover:text-[var(--accent-red)] transition-colors">
                  {project.name}
                </h3>
                
                <p className="text-[var(--foreground-secondary)] text-sm line-clamp-3 mb-4">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.slice(0, 3).map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-[var(--background-secondary)] rounded-full text-xs text-[var(--foreground-secondary)] border border-gray-800">
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="px-2 py-1 bg-[var(--background-secondary)] rounded-full text-xs text-[var(--foreground-secondary)]">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="flex gap-2">
                  {project.devpostLink && (
                    <Link 
                      href={project.devpostLink}
                      className="px-3 py-2 bg-[var(--background-secondary)] hover:bg-opacity-90 rounded-lg text-sm flex-1 text-center border border-gray-800 transition-colors text-[var(--foreground)]"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Devpost
                    </Link>
                  )}
                  
                  {project.demoLink && (
                    <Link 
                      href={project.demoLink}
                      className="px-3 py-2 bg-[var(--accent-yellow)] text-black rounded-lg text-sm flex-1 text-center font-medium transition-all hover:bg-opacity-80"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Demo
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </motion.div>
    </div>
  );
} 