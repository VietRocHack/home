"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { getAllProjects, getHackathonByProjectId } from "@/utils/dataUtils";
import styles from "./projects.module.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Get all projects from all hackathons with their associated hackathon info
const allProjects = getAllProjects().map(project => {
  const hackathon = getHackathonByProjectId(project.id);
  return {
    ...project,
    hackathonName: hackathon?.name || "",
    hackathonYear: hackathon?.year || 0,
    hackathonId: hackathon?.id || "",
    hackathonAchievement: hackathon?.achievement || "",
  };
});

export default function ProjectsPage() {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const introSectionRef = useRef<HTMLDivElement>(null);
  const projectBrowserRef = useRef<HTMLDivElement>(null);
  
  // Initialize refs array based on number of projects
  useEffect(() => {
    // Add 2 to account for intro section and project browser section
    sectionRefs.current = Array(allProjects.length + 2)
      .fill(null)
      .map((_, i) => sectionRefs.current[i] || null);
  }, []);

  // Handle smooth scrolling between sections
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollTop;
      const windowHeight = window.innerHeight;
      
      sectionRefs.current.forEach((section, index) => {
        if (!section) return;
        
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (
          scrollPosition >= sectionTop - windowHeight / 3 &&
          scrollPosition < sectionBottom - windowHeight / 3
        ) {
          setActiveSection(index);
        }
      });
    };
    
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to the selected section
  const scrollToSection = (index: number) => {
    if (sectionRefs.current[index]) {
      sectionRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const scrollToProjectBrowser = () => {
    if (projectBrowserRef.current) {
      projectBrowserRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const setRef = (el: HTMLElement | null, index: number) => {
    sectionRefs.current[index] = el;
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)]">
      <Navbar />
      
      <main ref={containerRef} className={styles.projectContainer}>
        {/* Navigation dots */}
        <div className={styles.navDots}>
          {/* Intro dot */}
          <button
            onClick={() => scrollToSection(0)}
            className={`${styles.navDot} ${activeSection === 0 ? styles.navDotActive : ""}`}
            aria-label="Go to introduction"
          />
          
          {/* Project dots */}
          {allProjects.map((_, index) => (
            <button
              key={`nav-dot-${index + 1}`}
              onClick={() => scrollToSection(index + 1)}
              className={`${styles.navDot} ${activeSection === index + 1 ? styles.navDotActive : ""}`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
          
          {/* Project browser dot */}
          <button
            onClick={() => scrollToSection(allProjects.length + 1)}
            className={`${styles.navDot} ${activeSection === allProjects.length + 1 ? styles.navDotActive : ""}`}
            aria-label="Go to project browser"
          />
        </div>
        
        {/* Introduction Section */}
        <section 
          ref={(el) => {
            setRef(el, 0);
            // @ts-expect-error - TypeScript doesn't know the ref type correctly
            introSectionRef.current = el;
          }}
          className={styles.projectSection}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
            <div className="text-center mb-8">
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-6 text-white"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Our <span className="text-[var(--accent-red)]">Projects</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-300 max-w-3xl mx-auto mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                From innovative hackathon submissions to passion projects, explore the creative solutions
                we&apos;ve built across various technologies and domains.
              </motion.p>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <button 
                  onClick={() => scrollToSection(1)} 
                  className="px-6 py-3 bg-[var(--accent-red)] text-white font-medium rounded-lg hover:bg-opacity-80 transition-all flex items-center justify-center gap-2"
                >
                  Start Exploring
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <button 
                  onClick={scrollToProjectBrowser} 
                  className="px-6 py-3 bg-[var(--background-secondary)] text-white font-medium rounded-lg hover:bg-opacity-80 transition-all flex items-center justify-center gap-2"
                >
                  View All Projects
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </motion.div>
            </div>
            
            <motion.div 
              className="mt-12 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent-red)]/10 to-[var(--background)] rounded-lg"></div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {allProjects.slice(0, 5).map((project, index) => (
                  <div 
                    key={`preview-${project.id}`}
                    className="aspect-video relative overflow-hidden rounded-lg cursor-pointer hover:scale-105 transition-all duration-300"
                    onClick={() => scrollToSection(index + 1)}
                  >
                    <Image
                      src={`/${project.thumbnail}`}
                      alt={project.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 hover:bg-black/30 transition-all flex items-center justify-center">
                      <p className="text-white text-sm font-medium">{project.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Project sections */}
        {allProjects.map((project, index) => (
          <section
            key={project.id}
            ref={(el) => setRef(el, index + 1)}
            className={styles.projectSection}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Project Image */}
                <div className="order-2 md:order-1">
                  <motion.div 
                    className="relative w-full aspect-video rounded-lg overflow-hidden shadow-xl"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <Image
                      src={`/${project.thumbnail}`}
                      alt={project.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </motion.div>
                  
                  <motion.div 
                    className="flex flex-wrap mt-6 gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-[var(--background-secondary)] text-gray-200 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </motion.div>
                </div>

                {/* Project Info */}
                <div className="order-1 md:order-2">
                  <div className="space-y-6">
                    <motion.div
                      className={styles.fadeInContent}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <p className="text-[var(--accent-yellow)] text-lg mb-2">
                        {project.hackathonName} ({project.hackathonYear})
                      </p>
                      <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4">
                        {project.name}
                      </h1>
                      <p className="text-xl text-gray-300 mb-6 italic">
                        &ldquo;{project.tagline}&rdquo;
                      </p>
                      
                      {project.achievements && project.achievements.length > 0 && (
                        <div className="mb-6">
                          <h3 className="text-lg text-gray-300 mb-2">Achievements:</h3>
                          <div className="flex flex-wrap gap-2">
                            {project.achievements.map((achievement) => (
                              <span
                                key={achievement}
                                className="px-3 py-1 bg-[var(--accent-yellow)] text-black rounded-full text-sm font-medium"
                              >
                                {achievement}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <p className="text-[var(--foreground-secondary)] mb-8">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-4">
                        {project.devpostLink && (
                          <Link href={project.devpostLink} target="_blank" rel="noopener noreferrer">
                            <button className="px-6 py-2 bg-[var(--accent-yellow)] text-black font-medium rounded-lg hover:bg-opacity-80 transition-all">
                              DevPost
                            </button>
                          </Link>
                        )}
                        
                        {project.demoLink && (
                          <Link href={project.demoLink} target="_blank" rel="noopener noreferrer">
                            <button className="px-6 py-2 bg-[var(--accent-red)] text-white font-medium rounded-lg hover:bg-opacity-80 transition-all">
                              Live Demo
                            </button>
                          </Link>
                        )}
                        
                        {project.githubLink && (
                          <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
                            <button className="px-6 py-2 bg-[var(--background-secondary)] text-white font-medium rounded-lg hover:bg-opacity-80 transition-all">
                              GitHub
                            </button>
                          </Link>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
        
        {/* Project Browser Section */}
        <section 
          ref={(el) => {
            setRef(el, allProjects.length + 1);
            // @ts-expect-error - TypeScript doesn't know the ref type correctly
            projectBrowserRef.current = el;
          }}
          className={`${styles.projectSection} bg-[var(--background-secondary)]`}
        >
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
                />
                <div className="absolute right-3 top-2.5 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              <select className="px-4 py-2 bg-[var(--background)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent-red)]">
                <option value="">All Technologies</option>
                <option value="React">React</option>
                <option value="Next.js">Next.js</option>
                <option value="Flask">Flask</option>
                <option value="Python">Python</option>
              </select>
              
              <select className="px-4 py-2 bg-[var(--background)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent-red)]">
                <option value="">All Hackathons</option>
                <option value="DandyHacks &apos;23">DandyHacks &apos;23</option>
                <option value="BrickHack X">BrickHack X</option>
                <option value="YHACK 2024">YHACK 2024</option>
                <option value="HopHacks 2024">HopHacks 2024</option>
                <option value="CalHacks 11.0">CalHacks 11.0</option>
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
              {allProjects.map((project) => (
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
              ))}
            </motion.div>
          </div>
        <Footer />
        </section>
      </main>
    </div>
  );
} 